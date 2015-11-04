/* global __CONFIG__ */
// NodeJS includes
var cluster = require('cluster');
var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');

// Osm Includes
var Config = require(__dirname + '/config');
var Logger = require(__CONFIG__.app_base_path + 'logger');
var GetStatus = require(__CONFIG__.app_lib_path + 'status');
var Router = require(__CONFIG__.app_lib_path + 'router/router.js');

var app = express();
Router.init(app);

// Count the machine's CPUs
var cpuCount = require('os').cpus().length;

// The master process - will only be used when on PROD
if (Config.express.is_production && cluster.isMaster && !__CONFIG__.is_cluster_disabled) {

  // Load the cron jobs on the master thread if it's production.
  Router.loadCronJobs(app);

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

  app.use(Router.parseBodyType);

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
  Router.loadRoutes(app);

  // Load the cron jobs on the child thread if it's NOT production or clustering is disabled
  if (!Config.express.is_production || __CONFIG__.is_cluster_disabled) {
    Router.loadCronJobs(app);
  }
  
  Router.writeServerStartupLogs();

  // 404 error  
  app.use('/', Router.notFound);
  
  http.createServer(app).listen(Config.express.port, Config.express.ip, function(error) {
    if (error) {
      Logger.logAppErrors(error);
      process.exit(10);
    }
    Logger.logAppInfo('Express is listening on http://' + Config.express.ip + ':' + Config.express.port);
  });
  
  if(__CONFIG__.is_https) {
    var sslConfig = {
      'pfx': fs.readFileSync(__CONFIG__.app_base_path + __CONFIG__.ssl_config.ssl_cert),
      'passphrase': __CONFIG__.ssl_config.passphrase
    };

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