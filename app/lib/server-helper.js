var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadCustomApi = require(__CONFIG__.app_code_path + 'api.js');
var appStatus = require(__CONFIG__.app_base_path + 'lib/status');
var slogger = require(__CONFIG__.app_base_path + 'lib/slogerr');
var util = require('util');
var fs = require('fs');
var path = require('path');
var loadCustomViews = require(__CONFIG__.app_code_path + 'views.js');

var internalExclusionApi = ['public_html'];
internalExclusionApi.concat(__CONFIG__.excludedControllers);
var cntrlOutput = '';

var serverHelper = function() {
  var app = null;
  var validMethodTypes = ['get', 'post', 'delete', 'put'];

  // The initialization method.
  // Binds a wrapper around the express app variable.
  var init = function(baseApp) {
    app = baseApp;
    app.httpPost = function(url, route, isPublic, isAdmin) {
      bindRequest(url, route, isAdmin, isPublic, 'post');
    };

    app.httpGet = function(url, route, isPublic, isAdmin) {
      bindRequest(url, route, isAdmin, isPublic, 'get');
    };

    app.httpDelete = function(url, route, isPublic, isAdmin) {
      bindRequest(url, route, isAdmin, isPublic, 'delete');
    };

    app.httpPut = function(url, route, isPublic, isAdmin) {
      bindRequest(url, route, isAdmin, isPublic, 'put');
    };
  };

  var bindRequest = function(url, route, isAdmin, isPublic, methodType) {
    url = normalizeUrl(url);
    methodType = methodType.toLowerCase();
    if (isAdmin) {
      isPublic = false;
    }

    var modifiedRoute = function(request, response, next) {
      if (__CONFIG__.logToSlogerr) {
        response.on('finish', function() {
          logRequestResponse(request, response);
        });
      }
      if (route) {
        route(request, response, next);
      }
    };

    if (validMethodTypes.indexOf(methodType) !== -1) {
      bindHttpRequest(getFinalUrl(url, isPublic), modifiedRoute, isPublic, isAdmin, methodType);
    } else {
      console.log('Invalid method type for - ' + url);
    }
  };

  var jsonParser = bodyParser.json();

  // Checks the request type, and if it's a multipart/form-data
  // request, it parses that, else it assumes that it's JSON
  var parseBodyTypeValues = function(request, response, next) {
    var contentType = request.get('content-type');
    var type = typeof(contentType);
    var isMultipart = -1;
    if (type !== 'undefined') {
      isMultipart = contentType.search('multipart/form-data');
    }

    if (isMultipart > -1) {
      var form = new formidable.IncomingForm({
        uploadDir: __CONFIG__.getUploadsFolderPath(),
        keepExtensions: true
      });
      form.parse(request, function(err, fields, files) {
        request.fields = fields;
        request.files = files;
        next();
      });
    } else {
      jsonParser(request, response, next);
    }
  };

  var loadRoutes = function(app) {
    // get all the folder names
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

      if (statObj && statObj.isDirectory() && isValidControllerFolder(files[i])) {
        controllerName = getControllerNameByFolder(files[i]);
        var controllerFileName = __CONFIG__.app_code_path + files[i] + '/' + controllerName;
        if (fs.existsSync(controllerFileName)) {
          allControllers.push(controllerFileName);
        }
      }
    }
    var loadedControllersObj;
    loadedControllersObj = [];
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

  var loadViews = function(app) {
    if (typeof loadCustomViews === 'function') {
      loadCustomViews(app);
    }
  };

  /**
   * Common method to bind different type of requests to the express app
   * Checks
   */
  var bindHttpRequest = function(url, route, isPublic, isAdmin, method) {
    var urlMethod = method.toUpperCase() + '|' + url;
    if (isPublic) {
      urlMethod += '|Public';
    } else {
      urlMethod += '|Not Public';
      if (isAdmin) {
        urlMethod += '|Admin';
      }
    }
    cntrlOutput += urlMethod + '\n';

    if (isPublic) {
      app[method](url, route);
    } else {
      if (typeof loadCustomApi.validate === 'function') {
        app[method](url, loadCustomApi.validate);
      }
      if (isAdmin && typeof loadCustomApi.checkIfAdmin === 'function') {
        app[method](url, loadCustomApi.checkIfAdmin);
      }
      app[method](url, route);
    }
  };

  // Normalizes the URL passed, removes trailing slashes.   
  var normalizeUrl = function(url) {
    if (url.indexOf('/') === 0 || url.lastIndexOf('/') === url.length - 1) {
      return url.replace(/^\/|\/$/g, '');
    }
    return url;
  };

  // Returns the final URL based on the config value
  var getFinalUrl = function(url, isPublic) {
    var finalUrl = __CONFIG__.app_base_url_token + url;
    if (isPublic) {
      finalUrl = __CONFIG__.app_base_url + url;
    }
    return finalUrl;
  };

  // Not found handler.
  var notFound = function(request, response) {
    if (typeof loadCustomApi.notFound === 'function') {
      loadCustomApi.notFound(request, response);
    } else {
      response.status(appStatus('notFound')).json({
        'status': 'fail',
        'data': 'The requested url "' + request.originalUrl + '" is not supported by this service.'
      });
    }
  };

  var isValidControllerFolder = function(folderName) {
    if (!folderName || internalExclusionApi.indexOf(folderName) !== -1) {
      return false;
    }
    return true;
  };

  var getControllerNameByFolder = function(folderName) {
    var modifiedFolderName = [folderName[0].toUpperCase()];
    var nextCharIsAfterUnderscore = false;
    for (var i = 1; i < folderName.length; ++i) {
      if (folderName[i] === '_') {
        nextCharIsAfterUnderscore = true;
        continue;
      }
      if (nextCharIsAfterUnderscore) {
        modifiedFolderName.push(folderName[i].toUpperCase());
        nextCharIsAfterUnderscore = false;
      } else {
        modifiedFolderName.push(folderName[i]);
      }
    }
    return modifiedFolderName.join('') + 'Controller.js';
  };

  var logRequestResponse = function(request, response) {
    if (!__CONFIG__.logToSlogerr) {
      // Logging is turned off.
      return;
    }
    var logMessage = '';
    var stackTrace = '\n\n----- REQUEST ----\n\n';
    stackTrace += 'HTTP Method : ' + request.method + '\n';
    stackTrace += 'Request Headers : ' + util.inspect(request.headers, {
      depth: 3
    }) + '\n';
    getRequestData(request, function(err, data) {
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
      slogger.log(logMessage, stackTrace, 1);
    });
  };

  var getRequestData = function(request, cb) {
    if (request.method === 'POST') {
      var body = '';
      var hasError = false;
      request.on('data', function(data) {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      request.on('error', function(e) {
        request.end();
        hasError = true;
        return cb(e);
      });

      request.on('end', function() {
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

  var writeServerStartupLogs = function() {
    // TODO : will be called many times, not a good model, need to find alternative.
    var now = new Date();
    var serverLogFile = 'server-startup-log.csv';
    var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(),
      now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

    if (fs.existsSync(__CONFIG__.log_folder_path + serverLogFile)) {
      fs.unlinkSync(__CONFIG__.log_folder_path + serverLogFile);
    }
    fs.writeFileSync(__CONFIG__.log_folder_path + serverLogFile, 'Server started at |' + nowUTC.toLocaleString() + '\n-------\n' + 'Type|URL|Access Type|Admin only?' + '\n-------\n' + cntrlOutput);
  };

  return {
    parseBodyType: parseBodyTypeValues,
    init: init,
    notFound: notFound,
    logRequestResponse: logRequestResponse,
    getRequestData: getRequestData,
    loadRoutes: loadRoutes,
    loadViews: loadViews,
    writeServerStartupLogs: writeServerStartupLogs
  };
};

module.exports = serverHelper();
