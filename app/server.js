/* global __CONFIG__ */
// NodeJS includes
var cluster = require('cluster');
var i18n = require('i18n');
var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');

// Osm Includes
var config = require(__dirname + '/config');
var logger = require(__CONFIG__.app_base_path + '/logger');
var getStatus = require('./lib/status');
var helper = require('./lib/server-helper');

var app = express();
helper.init(app);

// Count the machine's CPUs
var cpuCount = require('os').cpus().length;

// The master process - will only be used when on PROD
if (config.express.isProduction && cluster.isMaster && !__CONFIG__.isClusterDisabled) {

  // Load the cron jobs on the master thread if it's production.
  helper.loadCronJobs(app);

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', function() {
    cluster.fork();
  });

} else {
  // A worker process
  app.use(function(req, res, next) {
    res.setHeader('X-Powered-By', 'Emanate Wireless');
    res.performanceInfo = {};
    res.performanceInfo.startTimestamp = new Date().getTime();
    if (__CONFIG__.isHttps) {
      if (!req.secure) {
        res.redirect(__CONFIG__.app_http_base_url.replace(/\/+$/, '') + req.url);
      } else {
        next();
      }
    } else {
      next();
    }
  });

  app.use(helper.parseBodyType);

  app.use(function(err, req, res, next) {
    if (err) {
      res.set('Connection', 'close');
      res.status(getStatus('badRequest')).json({
        status: 'fail',
        message: 'JSON sent is invalid.'
      });
    } else {
      next();
    }
  });

  i18n.configure({
    locales: ['en'],
    defaultLocale: 'en',
    directory: __CONFIG__.app_base_path + '../locales',
    objectNotation: true
  });

  app.use(i18n.init);

  // Bind the api routes.
  helper.loadRoutes(app);

  //
  // Bind the views.
  helper.loadViews(app);

  // Load the cron jobs on the child thread if it's NOT production or clustering is disabled
  if (!config.express.isProduction || __CONFIG__.isClusterDisabled) {
    helper.loadCronJobs(app);
  }
  
  helper.writeServerStartupLogs();

  // 404 error
  app.use('/api', helper.notFound);
  
  var sslConfig = {
    'pfx': fs.readFileSync(__CONFIG__.app_base_path + __CONFIG__.sslConfig.sslCert),
    'passphrase': __CONFIG__.sslConfig.passphrase
  };

  http.createServer(app).listen(config.express.port, config.express.ip, function(error) {
    if (error) {
      logger.logAppErrors(error);
      process.exit(10);
    }
    logger.logAppInfo('Express is listening on http://' + config.express.ip + ':' + config.express.port);
  });
  
  if(__CONFIG__.isHttps) {
    https.createServer(sslConfig, app).listen(config.express.httpsPort, config.express.ip, function(error) {
      if (error) {
        logger.logAppErrors(error);
        process.exit(10);
      }
      logger.logAppInfo('Express is listening on https://' + config.express.ip + ':' + config.express.httpsPort);
    }); 
  }  
}

process.on('uncaughtException', function(err) {
  try {
    console.log(err);
    logger.logUncaughtError(err);
  } catch (e) {
    console.log(e);
  }
  // Eventually write code to send a mail.
  process.exit(1);
});