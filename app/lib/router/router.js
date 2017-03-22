'use strict';
// Third party modules
const formidable = require('formidable');
const bodyParser = require('body-parser');
const util = require('util');
const __ = require('underscore');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const moment = require('moment');

// Osm includes
let LoadCustomApi = require(__CONFIG__.app_code_path + 'api.js');
let GetStatus = require(__CONFIG__.app_lib_path + 'status');
let Slogger = require(__CONFIG__.app_helper_path + 'slogerr');
let AppError = require(__CONFIG__.app_lib_path + 'app-error');
let RouteHelper = require(__CONFIG__.app_lib_path + 'router/route-helper.js');

// Folders that will not be considered as controllers while autoloading controllers.
let internalExclusionApi = [];
internalExclusionApi.concat(__CONFIG__.excluded_controllers);

let cntrlOutput = '';

var serverHelper = function () {
  var app = null;
  var validMethodTypes = ['get', 'post', 'delete', 'put'];
  var jsonParser = bodyParser.json();

  // The initialization method.
  // Binds a wrapper around the express app variable.
  function _init (baseApp) {
    app = baseApp;
    app.httpPost = function (routeObj) {
      routeObj.method = 'post';
      bindRequest(routeObj);
    };

    app.httpGet = function (routeObj) {
      routeObj.method = 'get';
      bindRequest(routeObj);
    };

    app.httpDelete = function (routeObj) {
      routeObj.method = 'delete';
      bindRequest(routeObj);
    };

    app.httpPut = function (routeObj) {
      routeObj.method = 'put';
      bindRequest(routeObj);
    };
  };

  // Checks the request type, and if it's a multipart/form-data
  // request, it parses that, else it assumes that it's JSON
  function _parseBodyTypeValues (request, response, next) {
    var contentType = request.get('content-type');
    var type = typeof (contentType);
    var isMultipart = -1;
    if (type !== 'undefined') {
      isMultipart = contentType.search('multipart/form-data');
    }

    if (isMultipart > -1) {
      var form = new formidable.IncomingForm({
        uploadDir: __CONFIG__.getUploadsFolderPath(),
        keepExtensions: true,
        multiples: true
      });
      form.parse(request, function (err, fields, files) {
        request.fields = fields;
        request.files = files;
        next();
      });
    } else {
      // Treat the data as JSON, and use the parser.
      jsonParser(request, response, next);
    }
  };

  function _loadRoutes (app) {
    // Get all the folder names
    var files = fs.readdirSync(__CONFIG__.app_code_path);
    if (!files) {
      console.log('There was an error while reading the folders inside the \'code\' directory.');
      process.exit(1);
    }

    // We don't really care about speed, so doing a sync execution
    var statObj = null;
    var controllerName = '';
    var allControllers = [];
    for (var i = 0; i < files.length; ++i) {
      statObj = fs.statSync(__CONFIG__.app_code_path + files[i]);
      // Check if its a valid folder.
      if (statObj && statObj.isDirectory() && RouteHelper.isValidControllerFolder(files[i], internalExclusionApi)) {
        controllerName = RouteHelper.getControllerNameByFolder(files[i]);
        var controllerFileName = __CONFIG__.app_code_path + files[i] + '/' + controllerName;
        if (fs.existsSync(controllerFileName)) {
          allControllers.push(controllerFileName);
        }
      }
    }
    var loadedControllersObj;
    loadedControllersObj = [];
    // Now require the controllers.
    for (i = 0; i < allControllers.length; ++i) {
      cntrlOutput += '\n\n';
      var cntrlObj = require(allControllers[i]);
      if (cntrlObj) {
        loadedControllersObj.push(cntrlObj);
        cntrlOutput += 'Controller Name |' + path.basename(allControllers[i] + '\n');
        new loadedControllersObj[loadedControllersObj.length - 1](app);
        cntrlOutput += '\n';
        continue;
      }
      cntrlOutput += 'Error while loading controller - ' + path.basename(allControllers[i]);
      cntrlOutput += '\n';
    }
    cntrlOutput += '\nDone.\n';
    cntrlOutput += '\n';
    loadedControllersObj.length = 0;
  };

  function _loadCronJobs () {
    var cronDir = __CONFIG__.app_base_path + 'cron/';
    var files = fs.readdirSync(cronDir);
    for (var i = 0; i !== files.length; ++i) {
      if (path.extname(files[i]) !== 'js') {
        continue;
      }
      require(cronDir + files[i]);
    }
  };

  // Not found handler.
  function _notFound (request, response) {
    if (typeof LoadCustomApi.notFound === 'function') {
      LoadCustomApi.notFound(request, response);
    } else {
      response.status(GetStatus('notFound')).json({
        'status': 'fail',
        'data': 'The requested url "' + request.originalUrl + '" is not supported by this service.'
      });
    }
  };

  function _logRequestResponse (request, response) {
    if (!__CONFIG__.log_to_slogger) {
      // Logging is turned off.
      return;
    }
    var logMessage = '';
    var stackTrace = '\n\n----- REQUEST ----\n\n';
    stackTrace += 'HTTP Method : ' + request.method + '\n';
    stackTrace += 'Request Headers : ' + util.inspect(request.headers, {
      depth: 3
    }) + '\n';
    _getRequestData(request, function (err, data) {
      if (err) {
        return;
      }
      if (data) {
        if (typeof data === 'string') {
          stackTrace += 'Data Sent : ' + data;
        } else {
          stackTrace += 'Data Sent : ' + util.inspect(data, {
            depth: 3
          });
        }
      }
      var responseBody = '';
      var responseMessage = '';
      if (response.dataSentToClient) {
        responseBody = util.inspect(response.dataSentToClient, {
          depth: 3
        });
      } else {
        responseBody = 'Was this a file download request?? If not, ' +
          'there was an error while reading the response body!';
      }
      if (response.msgSentToClient) {
        responseMessage = util.inspect(response.msgSentToClient, {
          depth: 3
        });
      }

      stackTrace += '\n\n----- RESPONSE ----\n\n';
      stackTrace += 'Status : ' + response.statusCode + '\n';
      stackTrace += 'Message : ' + responseMessage + '\n';
      stackTrace += 'Response Data: \n\n' + responseBody;
      logMessage = '[' + new Date().toUTCString() + '] Logging REQUEST/RESPONSE to ' + request.ip + ' for ' + request.originalUrl;
      Slogger.log(logMessage, stackTrace, 1);
    });
  };

  function _getRequestData (request, cb) {
    if (request.method === 'POST') {
      var body = '';
      var hasError = false;
      request.on('data', function (data) {
        body += data;
        request.body = body;
        // Too much POST data, kill the connection!
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      request.on('error', function (e) {
        request.end();
        hasError = true;
        return cb(e);
      });

      request.on('end', function () {
        if (!hasError) {
          cb(null, body);
        }
      });
    } else if (request.method === 'GET') {
      return cb(null, {
        params: request.params,
        query: request.query
      });
    } else {
      cb(null, null);
    }
  };

  function _writeServerStartupLogs () {
    // TODO : will be called many times, not a good model, need to find alternative.
    var now = new Date();
    var serverLogFile = 'server-startup-log.csv';
    var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(),
      now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

    if (fs.existsSync(__CONFIG__.log_folder_path + serverLogFile)) {
      fs.unlinkSync(__CONFIG__.log_folder_path + serverLogFile);
    }
    fs.writeFileSync(__CONFIG__.log_folder_path + serverLogFile, 'Server started at |' + nowUTC.toLocaleString() + '\n-------\n' +
      'Type|URL|Access Type|Admin only?' + '\n-------\n' + cntrlOutput);
  };

  function logServerPerformance (request, response, isClosed) {
    if (response.hasOwnProperty('performanceInfo') &&
      response.performanceInfo.logPerformance === true &&
      !response.performanceInfo.isLogged) {
      writePerformanceLog(request, response, isClosed);
      response.performanceInfo.isLogged = true;
    }
  };

  function writePerformanceLog (request, response, isClosed) {
    try {
      var endTimestamp = new Date().getTime();
      var processTime = (endTimestamp - response.performanceInfo.startTimestamp) / 1000;
      var requestSize = 0;
      if (request.body) {
        requestSize = RouteHelper.getByteCount(util.inspect(request.body, {
          depth: 5
        }));
      }
      var responseSize = RouteHelper.getByteCount(util.inspect(response.dataSentToClient, {
        depth: 5
      }));
      var path = __CONFIG__.getLogsFolderPath() + __CONFIG__.maintInfoFileName;
      var startTime = moment(new Date(response.performanceInfo.startTimestamp)).format('MMM DD YYYY HH:mm:ss:SSS');
      endTimestamp = moment(new Date(endTimestamp)).format('MMM DD YYYY HH:mm:ss:SSS');
      endTimestamp += (isClosed) ? ' [CLOSED]' : '';
      var performanceLog = '';
      if (!response.performanceInfo.performanceLog) {
        response.performanceInfo.performanceLog = '';
      }
      if (!response.performanceInfo.performanceHeaders) {
        response.performanceInfo.performanceHeaders = '';
      }
      fs.stat(path, function (err, stats) {
        if (err && err.code === 'ENOENT') {
          performanceLog += response.performanceInfo.performanceHeaders + ', Request start time, Request end time, Request '
            + 'processing time (sec), Request size (bytes), Response size (bytes)';
          performanceLog += '\r\n';
          performanceLog += response.performanceInfo.performanceLog + ',' + startTime + ',' + endTimestamp + ',' + processTime +
            ',' + requestSize + ',' + responseSize;
          performanceLog += '\r\n';
        } else {
          performanceLog += response.performanceInfo.performanceLog + ',' + startTime + ',' + endTimestamp + ',' + processTime +
            ',' + requestSize + ',' + responseSize;
          performanceLog += '\r\n';
        }
        fs.appendFile(path, performanceLog, function (err) {
          if (err) {
            new AppError(err, 'There was an error while logging the maintenance calls info.', {});
          }
        });
      });
    } catch (e) {
      new AppError(e, 'Something went wrong while writing the maintenance logs.', {});
    }
  };

  function getDefaultRouteObj () {
    var routeObj = {
      isAdmin: false,
      isPublic: false,
      enableCompression: true
    };
    return routeObj;
  }

  /**
   * Common method to bind different type of requests to the express app
   * Checks
   */
  var bindHttpRequest = function (routeObj) {
    var urlMethod = routeObj.method.toUpperCase() + '|' + routeObj.url;
    if (routeObj.isPublic) {
      urlMethod += '|Public';
    } else {
      urlMethod += '|Not Public';
      if (routeObj.isAdmin) {
        urlMethod += '|Admin';
      }
    }
    cntrlOutput += urlMethod + '\n';

    if (__CONFIG__.log_performance_info) {
      // Performance logging is turned on.
      app[routeObj.method](routeObj.url, logPerformanceRoute);
    }

    if (__CONFIG__.enable_compression && routeObj.enableCompression) {
      // Enable compression
      app[routeObj.method](routeObj.url, compression());
    }
    if (typeof LoadCustomApi.beforeRouteLoad === 'function') {
      // Before route load method has been added.
      LoadCustomApi.beforeRouteLoad(routeObj.url, app);
    }
    if (routeObj.isPublic) {
      // Public route, no validation required, call the route method.
      app[routeObj.method](routeObj.url, routeObj.route);
    } else {
      if (typeof LoadCustomApi.validate === 'function') {
        // Not a public route, and the custom API has a validate function.
        app[routeObj.method](routeObj.url, LoadCustomApi.validate);
      }
      if (routeObj.isAdmin && typeof LoadCustomApi.checkIfAdmin === 'function') {
        // Admin route, and the custom API has a checkIfAdmin function.
        app[routeObj.method](routeObj.url, LoadCustomApi.checkIfAdmin);
      }
      // Finally add the route.
      app[routeObj.method](routeObj.url, routeObj.route);
    }
  };

  var bindRequest = function (routeObj) {
    routeObj.url = RouteHelper.normalizeUrl(routeObj.url);
    routeObj.method = routeObj.method.toLowerCase();
    if (routeObj.isAdmin) {
      routeObj.isPublic = false;
    }
    routeObj = __.extend(getDefaultRouteObj(), routeObj);

    if (routeObj.enableCompression === false) {
      routeObj.enableCompression = false;
    } else {
      routeObj.enableCompression = true;
    }

    if (validMethodTypes.indexOf(routeObj.method) !== -1) {
      routeObj.url = RouteHelper.getFinalUrl(routeObj.url, routeObj.isPublic);
      bindHttpRequest(routeObj);
      routeObj = null;
    } else {
      console.log('Invalid method type for - ' + routeObj.url);
    }
  };

  function logPerformanceRoute (request, response, next) {
    response.on('close', function () {
        // True indicates that the log is written on connection close.
      logServerPerformance(request, response, true);
    });

    response.on('finish', function () {
        // False indicates that the log is written after response has been sent.
      logServerPerformance(request, response, false);
    });

    if (next) {
      next();
    }
  }

  return {
    parseBodyType: _parseBodyTypeValues,
    init: _init,
    notFound: _notFound,
    logRequestResponse: _logRequestResponse,
    getRequestData: _getRequestData,
    loadRoutes: _loadRoutes,
    loadCronJobs: _loadCronJobs,
    writeServerStartupLogs: _writeServerStartupLogs
  };
};

module.exports = serverHelper();
