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

helper.init(app);

// The master process - will only be used when on PROD
if (config.express.isProduction && cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

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
    next();
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

  
  // Bind the api routes.
  helper.loadRoutes(app);
  
  // Bind the views.
  helper.loadViews(app);
    
  // 404 error
  app.use('/api', helper.notFound);

  app.use('/*', express.static(__dirname + '/code/public_html/404.html'));

  app.listen(config.express.port, config.express.ip, function(error) {
    
    if (error) {
      logger.logAppErrors(error);
      process.exit(10);
    }
    logger.logAppInfo('Express is listening on http://' + config.express.ip + ':' + config.express.port);
  });
  
}

process.on('uncaughtException', function (err) {
  try {    
    logger.logUncaughtError(err);
  } catch(e) {
    // nothing to do...
  }
  // Eventually write code to send a mail.
  process.exit(1);
});
