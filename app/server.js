// NodeJS includes
var cluster = require("cluster");

// Third Party Includes
var bodyParser = require('body-parser');
var __ = require('underscore');

// Osm Includes
var config = require("./config");
var logger = require("./logger");
var middleware = require("./middleware/index");
var loadViews = require("./code/views.js");
var loadApi = require("./code/api.js");

var express = require("express");
var app = express();

app.httpPost = function(url, route, isPublic) {  
  bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'post');
};

app.httpGet = function(url, route, isPublic) {  
  bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'get');
};

app.httpDelete = function(url, route, isPublic) {
  bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'delete');
};

function bindHttpRequest(url, route, isPublic, method) {
  if (isPublic) {
    app[method](url, route);
  } else {
    app[method](url, loadApi.validate);
    app[method](url, route);
  }
}

function normalizeUrl(url) {
  if (url.indexOf('/') === 0) { return url; }
  return url;
}

function getFinalUrl(url, isPublic) {
  url = normalizeUrl(url);
  var finalUrl = __CONFIG__.app_base_url_token + url;
  if (isPublic) {
    finalUrl = __CONFIG__.app_base_url + url;
  }
  return finalUrl;
}

function parseQueryStringValues(request, response, next) {
  if (__.isEmpty(request.query)) {
    request.queryParams = {};
    next();
    return;
  }
  request.queryParams = {};
  request.queryParams.limit = parseInt(request.query.limit, 10);
  request.queryParams.startRecord = parseInt(request.query.startRecord, 10);

  request.queryParams.limit = isNaN(request.queryParams.limit) ? 20
          : request.queryParams.limit;

  request.queryParams.startRecord = isNaN(request.queryParams.startRecord) ? 0
          : request.queryParams.startRecord;

  // Checking if it's a string and check that it's not empty
  request.queryParams.search = (__.isString(request.query.q)
          && !__.isEmpty(request.query.q) ? request.query.q : false);

  request.queryParams.seachCol = (__.isString(request.query.qcol)
          && !__.isEmpty(request.query.qcol) ? request.query.qcol : '*');

  request.queryParams.sortBy = (__.isString(request.query.sortby)
          && !__.isEmpty(request.query.sortby) ? request.query.sortby : false);

  request.queryParams.sortCol = (__.isString(request.query.sortcol)
          && !__.isEmpty(request.query.sortcol) ? request.query.sortcol : false);
  next();
}

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
  app.use(bodyParser.json());
  app.use(parseQueryStringValues);

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
    logger.logAppInfo("express is listening on http://" + config.express.ip
            + ":" + config.express.port);
  });
};
