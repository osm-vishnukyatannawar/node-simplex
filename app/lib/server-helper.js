var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadApi = require(__CONFIG__.app_code_path + 'api.js');
var appStatus = require(__CONFIG__.app_base_path + 'lib/status');
var fs = require('fs');
var internalExclusionApi = ['public_html'];

var serverHelper = function() {
  var app = null;
  var validMethodTypes = ['get', 'post', 'delete', 'put'];
  
  // The initialization method.
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
    
    loadControllers();
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
  
  // Not found handler.
  var notFound = function(request, response) {
    response.status(appStatus('notFound')).json({
      'status': 'fail',
      'data': 'The requested url "' + request.originalUrl + '" is not supported by this service.'
    });
  };

  var loadControllers = function() {
    // get all the folder names
    fs.readdir(__CONFIG__.app_code_path, function(err, files) {      
      // We don't really care about speed, so doing a sync execution
      var statObj = null;      
      for(var i = 0; i < files.length; ++i) {
        statObj = fs.statSync(__CONFIG__.app_code_path + files[i]);
        if(statObj && statObj.isDirectory() && isValidControllerFolder()) {          
          
        }        
      }
    });    
  };
  
  // Common method to bind all the different type of requests  
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
  
  // Bind the request to the app.
  var bindRequest = function(url, route, isAdmin, isPublic, methodType) {
    url = normalizeUrl(url);
    methodType = methodType.toLowerCase();
    if (isAdmin) {
      isPublic = false;
    }
    if (validMethodTypes.indexOf(methodType) !== -1) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, isAdmin, methodType);
    } else {
      console.log('Invalid method type for - ' + url);
    }
  };
  
  var isValidControllerFolder = function(folderName) {
    
  };
  
  return {
    parseBodyType: parseBodyTypeValues,
    init: init,
    notFound: notFound    
  };
};

module.exports = serverHelper();
