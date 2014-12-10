// NodeJS includes
var cluster = require("cluster");

// Third Party Includes
var bodyParser = require('body-parser');
var __ = require('underscore');

// Osm Includes
var config = require('./config');
var logger = require('./logger');
var middleware = require('./middleware/index');
var loadViews = require('./code/views.js');
var loadApi = require('./code/api.js');
var getStatus = require('./lib/status');
var express = require('express');
var app = express();

var helper = require('./lib/server-helper');
helper.init(app);

// The master process - will only be used when on PROD
if (config.express.isProduction && cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  // A worker process
  app.use(function(req, res, next) {
    res.setHeader('X-Powered-By', 'Emanate Wireless');
    next();
  });
  
  app.use(bodyParser.json());
  
  app.use(function(err, req, res, next) {    
    if(err) {
      res.status(getStatus('badRequest')).json({
        status : 'fail',
        message : 'JSON sent is invalid.'
      });
    } else {
      next();
    }
  });
  
  app.use(helper.parseQueryString);

  // Bind the api routes.
  loadApi(app);

  // Bind the views.
  loadViews(app);

  // 404 error
  app.use('/api', middleware.notFound);

  app.use('/*', express.static(__dirname + '/code/public_html/404.html'));

  app.listen(config.express.port, config.express.ip, function(error) {
    if (error) {
      logger.logAppErrors(error);
      process.exit(10);
    }
    logger.logAppInfo('Express is listening on http://' + config.express.ip
            + ":" + config.express.port);
  });
};
