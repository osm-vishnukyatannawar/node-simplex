/* global __CONFIG__ */
// NodeJS includes
var cluster = require('cluster');
var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');

// Osm Includes
var Config = require(__dirname + '/config');
var Logger = require(__CONFIG__.app_base_path + '/logger');
var GetStatus = require('./lib/status');
var Helper = require('./lib/server-helper');

var app = express();
Helper.init(app);

// Count the machine's CPUs
var cpuCount = require('os').cpus().length;

// The master process - will only be used when on PROD
if (Config.express.is_production && cluster.isMaster && !__CONFIG__.is_cluster_disabled) {

  // Load the cron jobs on the master thread if it's production.
  Helper.loadCronJobs(app);

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
    if (__CONFIG__.is_https) {
      if (!req.secure) {
        res.redirect(__CONFIG__.app_http_base_url.replace(/\/+$/, '') + req.url);
      } else {
        next();
      }
    } else {
      next();
    }
  });

  app.use(Helper.parseBodyType);

  app.use(function(err, req, res, next) {
    if (err) {
      res.set('Connection', 'close');
      res.status(GetStatus('badRequest')).json({
        status: 'fail',
        message: 'JSON sent is invalid.'
      });
    } else {
      next();
    }
  });  

  // Bind the api routes.
  Helper.loadRoutes(app);

  // Load the cron jobs on the child thread if it's NOT production or clustering is disabled
  if (!Config.express.is_production || __CONFIG__.is_cluster_disabled) {
    Helper.loadCronJobs(app);
  }
  
  Helper.writeServerStartupLogs();

  // 404 error
  app.use('/api', Helper.notFound);
  
  var sslConfig = {
    'pfx': fs.readFileSync(__CONFIG__.app_base_path + __CONFIG__.ssl_config.ssl_cert),
    'passphrase': __CONFIG__.ssl_config.passphrase
  };

  http.createServer(app).listen(Config.express.port, Config.express.ip, function(error) {
    if (error) {
      Logger.logAppErrors(error);
      process.exit(10);
    }
    Logger.logAppInfo('Express is listening on http://' + Config.express.ip + ':' + Config.express.port);
  });
  
  if(__CONFIG__.is_https) {
    https.createServer(sslConfig, app).listen(Config.express.httpsPort, Config.express.ip, function(error) {
      if (error) {
        Logger.logAppErrors(error);
        process.exit(10);
      }
      Logger.logAppInfo('Express is listening on https://' + Config.express.ip + ':' + Config.express.httpsPort);
    }); 
  }  
}

process.on('uncaughtException', function(err) {
  try {
    console.log(err);
    Logger.logUncaughtError(err);
  } catch (e) {
    console.log(e);
  }
  // Eventually write code to send a mail.
  process.exit(1);
});