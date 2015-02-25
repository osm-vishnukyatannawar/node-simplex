var formidable = require('formidable');
var bodyParser = require('body-parser');
var loadApi = require(__CONFIG__.app_code_path + 'api.js');

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
    if (validMethodTypes.indexOf(methodType) !== -1) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, isAdmin, methodType);
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
        keepExtensions : true
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

  return {
    parseBodyType: parseBodyTypeValues,
    init: init,
  };
};

module.exports = serverHelper();