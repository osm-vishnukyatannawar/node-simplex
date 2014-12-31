var __ = require('underscore');
var formidable = require('formidable'); 
var bodyParser = require('body-parser');
var loadApi = require(__CONFIG__.app_code_path +'api.js');

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
    if(isAdmin) {     
      isPublic = false;
    }
    if(validMethodTypes.indexOf(methodType) !== -1) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, isAdmin, methodType);
    } else {
      console.log('Invalid method type for - ' + url);
    }
  };
  
  var jsonParser = bodyParser.json();
  
  var parseBodyTypeValues = function(request, response, next){
	  //console.log(request);
	 var contentType =  request.get('content-type');
	 var type = typeof(contentType);
	 //console.log(contentType);
	 if(type != "undefined"){
		 var isMultipart = contentType.search("multipart/form-data");
	 }else{
		 var isMultipart = -1;
	 }
	 
	 if(isMultipart > -1){
		var form = new formidable.IncomingForm({ uploadDir: __dirname + '/../../uploads/' });
	     form.parse(request, function(err, fields, files) {
	          //console.log(JSON.stringify(files));
	          //var filename = files['uploadFile']['name'];
	          request.files = files;
	          next();
	    });
		 
	 }else{
		 //var form = new formidable.IncomingForm();
		 jsonParser(request, response, next);
	 }
	 
  };
  
  var bindHttpRequest = function(url, route, isPublic, isAdmin, method) {
    if (isPublic) {
      app[method](url, route);
    } else {
      app[method](url, loadApi.validate);
      if(isAdmin) {
        app[method](url, loadApi.checkIfAdmin);
      }
      app[method](url, route);
    }
  };

  var normalizeUrl = function(url) {   
    if (url.indexOf('/') === 0 || url.lastIndexOf('/') === url.length - 1) { return url.replace(/^\/|\/$/g, ''); }
    return url;
  };
  
  var getFinalUrl = function(url, isPublic) {    
    var finalUrl = __CONFIG__.app_base_url_token + url;
    if (isPublic) {
      finalUrl = __CONFIG__.app_base_url + url;
    }
    return finalUrl;
  };

  var parseQueryStringValues = function(request, response, next) {
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

    request.queryParams.startRecord = isNaN(request.queryParams.startRecord)
            ? 0 : request.queryParams.startRecord;

    // Checking if it's a string and check that it's not empty
    request.queryParams.search = (__.isString(request.query.q)
            && !__.isEmpty(request.query.q) ? request.query.q : false);

    request.queryParams.seachCol = (__.isString(request.query.qcol)
            && !__.isEmpty(request.query.qcol) ? request.query.qcol : '*');

    request.queryParams.sortBy = (__.isString(request.query.sortby)
            && !__.isEmpty(request.query.sortby) ? request.query.sortby : false);

    request.queryParams.sortCol = (__.isString(request.query.sortcol)
            && !__.isEmpty(request.query.sortcol) ? request.query.sortcol
            : false);
    next();
  };

  return {
    parseQueryString: parseQueryStringValues,
    parseBodyType : parseBodyTypeValues,
    init: init,
  };
};

module.exports = serverHelper();