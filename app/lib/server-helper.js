var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadApi = require(__CONFIG__.app_code_path + 'api.js');
var appStatus = require(__CONFIG__.app_base_path + 'lib/status');
var slogger = require(__CONFIG__.app_base_path + 'lib/slogerr');
var util = require('util');

var serverHelper = function() {
  var app = null;
  var validMethodTypes = ['get', 'post', 'delete', 'put'];
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
      if(__CONFIG__.logToSlogerr) {
        response.on('finish', function() {
          logRequestResponse(request, response);
        });
      }
      if(route) {
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

  var parseBodyTypeValues = function(request, response, next) {
    var contentType = request.get('content-type');
    var type = typeof(contentType);
    var isMultipart = -1;
    if (type !== 'undefined') {
      isMultipart = contentType.search('multipart/form-data');
    }

    if (isMultipart > -1) {
      var form = new formidable.IncomingForm({
        uploadDir: __dirname + '/../../uploads/',
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

  var bindHttpRequest = function(url, route, isPublic, isAdmin, method) {
    if (isPublic) {
      app[method](url, route);
    } else {
      app[method](url, loadApi.validate);
      if (isAdmin) {
        app[method](url, loadApi.checkIfAdmin);
      }
      app[method](url, route);
    }
  };

  var normalizeUrl = function(url) {
    if (url.indexOf('/') === 0 || url.lastIndexOf('/') === url.length - 1) {
      return url.replace(/^\/|\/$/g, '');
    }
    return url;
  };

  var getFinalUrl = function(url, isPublic) {
    var finalUrl = __CONFIG__.app_base_url_token + url;
    if (isPublic) {
      finalUrl = __CONFIG__.app_base_url + url;
    }
    return finalUrl;
  };

  var notFound = function(request, response) {
    response.status(appStatus('notFound')).json({
      'status': 'fail',
      'data': 'The requested url "' + request.originalUrl + '" is not supported by this service.'
    });
  };
  
  var logRequestResponse = function(request, response) {
    if(!__CONFIG__.logToSlogerr) {
      // Logging is turned off.
      return;
    }
    var logMessage = '';
    var stackTrace = '\n\n----- REQUEST ----\n\n'; 
    stackTrace += 'HTTP Method : ' + request.method + '\n';
    stackTrace += 'Request Headers : ' + util.inspect(request.headers, { depth : 3 }) + '\n';
    getRequestData(request, function(err, data) {
      if(err) {
        return;
      }
      if(data) {
        if(typeof data === 'string') {
          stackTrace += 'Data Sent : ' + data;
        } else {
          stackTrace += 'Data Sent : ' + util.inspect(data, { depth : 3 });
        }
      }
      var responseBody = '';
      var responseMessage = '';      
      if(response.dataSentToClient) {
        responseBody = util.inspect(response.dataSentToClient, { depth : 3 });
      } else {
        responseBody = 'Was this a file download request?? If not, ' +
          'there was an error while reading the response body!';
      }
      if(response.msgSentToClient) {
        responseMessage = util.inspect(response.msgSentToClient, { depth : 3 });
      }
       
      stackTrace += '\n\n----- RESPONSE ----\n\n';
      stackTrace += 'Status : ' + response.statusCode + '\n';
      stackTrace += 'Message : ' + responseMessage + '\n';
      stackTrace += 'Response Data: \n\n' + responseBody;
      logMessage = '[' + new Date().toUTCString() + '] Logging REQUEST/RESPONSE to ' 
        + request.ip + ' for ' + request.originalUrl;
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
    } else if(request.method === 'GET') {
      return cb(null, {
        params : request.params,
        query : request.query
      });
    } else {
      cb(null, null);
    }    
  };
  
  return {
    parseBodyType: parseBodyTypeValues,
    init: init,
    notFound: notFound,    
    logRequestResponse : logRequestResponse,
    getRequestData : getRequestData
  };
};

module.exports = serverHelper();
