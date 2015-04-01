var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadApi = require(__CONFIG__.app_code_path + 'api.js');
var appStatus = require(__CONFIG__.app_base_path + 'lib/status');
var slogger = require(__CONFIG__.app_base_path + 'lib/slogerr');
var util = require('util');
var __ = require('underscore');

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
    
    // Request
    var stackTrace = '\n\n----- REQUEST ----\n\n'; 
    stackTrace += 'HTTP Method : ' + request.method + '\n';
    stackTrace += 'Request Headers : ' + util.inspect(request.headers, { depth : 3 }) + '\n';
    var requestObj = { body : {}, params : {}, query : {} };
    if(request.body) {
      requestObj.body = request.body;
    }
    
    if(request.params) {
      requestObj.params = request.params;
    }
    
    if(request.query) {
      requestObj.query = request.query;
    }
    stackTrace += 'Data Received : ' + util.inspect(requestObj, { depth : 3 });
    
    
    // Response
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
    var requestUrl = request.originalUrl;
    if(requestUrl) {
      requestUrl = requestUrl.replace(/\/+$/, '');
    }
    var severity = 1;
    var isMaintCall = false;
    var tagSN = 'UNKNOWN';
    var callType = request.originalUrl;
    // Detect if it's a maintenance call...
    for(var prop in __CONFIG__.maintenance.necessary_tag_events) {
      if(__CONFIG__.maintenance.necessary_tag_events[prop].indexOf(requestUrl) !== -1) {
        isMaintCall = true;        
        callType = prop;
        if(__.isObject(requestObj.body) && 
            requestObj.body.hasOwnProperty('serialNum') && requestObj.body.serialNum) {          
          tagSN = requestObj.body.serialNum;
        }         
        break;
      }
    }
    if(isMaintCall) {
      if(callType === 'POWERPATH_INFO') {
        callType = 'POWERPATH_INFO, POWERPATH_REPORT_CURRENT_UTIL_DATA or MAINTENANCE_EVENT';
      }
      logMessage = 'Maintenance LOG from TAG - ' 
        + tagSN + ' for ' + callType;
      severity = 2;      
    } else {
      logMessage = '[' + new Date().toUTCString() + '] Logging REQUEST/RESPONSE to ' 
        + request.ip + ' for ' + request.originalUrl;
    }
    
    slogger.log(logMessage, stackTrace, severity);    
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
        if(__.isEmpty(request.body)) {
          request.body = { error : 'Couldn\'t parse BODY.' };
        }
        hasError = true;
        return cb(e);
      });

      request.on('end', function() {
        if (!hasError) {
          if(__.isEmpty(request.body)) {
            request.body = body;
          }
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
