'use strict';

// Third party modules
const cluster = require('cluster');
const http = require('http');
const path = require('path');
const express = require('express');

// Osm includes
let Config = require(path.join(__dirname, 'config'));
let Logger = require(path.join(__CONFIG__.app_base_path, 'logger'));
let GetStatus = require(path.join(__CONFIG__.app_lib_path, 'status'));
let Router = require(path.join(__CONFIG__.app_lib_path, 'router/router.js'));

let app = express();

Router.init(app);

// Count the machine's CPUs
let cpuCount = require('os').cpus().length;

// The master process - will only be used when on PROD
if (Config.express.is_production && cluster.isMaster && !__CONFIG__.is_cluster_disabled) {
  // Load the cron jobs on the master thread if it's production.
  Router.loadCronJobs(app);

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', function () {
    cluster.fork();
  });
} else {
  // A worker process
  app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'Osmosys');
    next();
  });

  app.use(Router.parseBodyType);

  app.use(function (err, req, res, next) {
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

  http.createServer(app).listen(Config.express.port, Config.express.ip, function (error) {
    if (error) {
      Logger.logAppErrors(error);
      process.exit(10);
    }
    Logger.logAppInfo('Express is listening on http://' + Config.express.ip + ':' + Config.express.port);
  });
}

process.on('uncaughtException', function (err) {
  try {
    console.log(err);
    Logger.logUncaughtError(err);
  } catch (e) {
    console.log(e);
  }
  // Eventually write code to send a mail.
  process.exit(1);
});
