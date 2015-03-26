var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadCustomApi = require(__CONFIG__.app_code_path + 'api.js');
var appStatus = require(__CONFIG__.app_base_path + 'lib/status');
var fs = require('fs');
var path = require('path');
var colors = require('colors/safe');
var loadCustomViews = require(__CONFIG__.app_code_path + 'views.js');

var internalExclusionApi = ['public_html'];
internalExclusionApi.concat(__CONFIG__.excludedControllers);

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
    if(typeof loadCustomApi.notFound === 'function') {
      loadCustomApi.notFound(request, response);
    } else {
      response.status(appStatus('notFound')).json({
        'status': 'fail',
        'data': 'The requested url "' + request.originalUrl + '" is not supported by this service.'
      });
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
    var loadedControllersObj = [];
    for (i = 0; i < allControllers.length; ++i) {
      var cntrlObj = require(allControllers[i]);
      if (cntrlObj) {
        loadedControllersObj.push(cntrlObj);
        console.log('Loading Controller - ' + path.basename(allControllers[i] + ' - \n'));
        new loadedControllersObj[loadedControllersObj.length - 1](app);
        console.log(colors.green('\nFinished loading controller.\n'));
        console.log(colors.bold('-----------------------\n'));
        continue;
      }
      console.log(colors.red('Error while loading controller - ' + path.basename(allControllers[i])));
      console.log(colors.bold('\n-----------------------\n'));
    }
    console.log(colors.green('\nFinished loading all controllers.\n'));
    console.log(colors.bold('\n-----------------------\n'));
    loadedControllersObj.length = 0;
  };

  var loadViews = function(app) {
    if(typeof loadCustomViews === 'function') {      
      loadCustomViews(app);
    }
  };
  
  /**
   * Common method to bind different type of requests to the express app
   * Checks 
   */
  var bindHttpRequest = function(url, route, isPublic, isAdmin, method) {
    var urlMethod = method.toUpperCase() + ' : ' + url;
    if (isPublic) {
      urlMethod += ' - PUBLIC';
    } else {
      urlMethod += ' - NOT PUBLIC';
      if (isAdmin) {
        urlMethod += ' - ADMIN';
      }
    }

    console.log(urlMethod);
    if (isPublic) {
      app[method](url, route);
    } else {
      if(typeof loadCustomApi.validate === 'function') {
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
  
  return {
    parseBodyType: parseBodyTypeValues,
    init: init,
    notFound: notFound,
    loadRoutes: loadRoutes,
    loadViews : loadViews
  };
};

module.exports = serverHelper();