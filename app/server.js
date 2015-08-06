// NodeJS includes
var cluster = require('cluster');

// Osm Includes
var config = require('./config');
var logger = require('./logger');
var ExclusionController = require(__CONFIG__.app_code_path + 'exclusion-api.js');
var getStatus = require('./lib/status');
var express = require('express');
var app = express();
var helper = require('./lib/server-helper');
var i18n = require('i18n');
var http = require('http');
var https = require('https');
var fs = require('fs');
helper.init(app);

// Count the machine's CPUs
var cpuCount = require('os').cpus().length;

// The master process - will only be used when on PROD
if (config.express.isProduction && cluster.isMaster) {
  
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
    if(__CONFIG__.isHttps) {
      if(!req.secure) {
		    res.redirect(__CONFIG__.app_http_base_url.replace(/\/+$/, ''));
	    } else {
        next(); 
      }
    } else {
      next();
    }
  });

  new ExclusionController(app);

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
  
  if(!config.express.isProduction) {
    // Load the cron jobs on the child thread if it's NOT production.
    helper.loadCronJobs(app);
  }
  
  helper.writeServerStartupLogs();

  // 404 error
  app.use('/api', helper.notFound);

  app.use('/*', express.static(__dirname + '/code/public_html/404.html'));
  
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
  
  https.createServer(sslConfig, app).listen(config.express.httpsPort, config.express.ip, function(error) {
    if (error) {
      logger.logAppErrors(error);
      process.exit(10);
    }
    logger.logAppInfo('Express is listening on https://' + config.express.ip + ':' + config.express.httpsPort);
  });
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