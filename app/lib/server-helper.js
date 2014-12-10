var __ = require('underscore');
var loadApi = require(__CONFIG__.app_code_path +'api.js');

var serverHelper = function() {
  var app = null;

  var init = function(baseApp) {
    app = baseApp;
    app.httpPost = function(url, route, isPublic) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'post');
    };

    app.httpGet = function(url, route, isPublic) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'get');
    };

    app.httpDelete = function(url, route, isPublic) {
      bindHttpRequest(getFinalUrl(url, isPublic), route, isPublic, 'delete');
    };
  };

  var bindHttpRequest = function(url, route, isPublic, method) {
    console.log(url);
    if (isPublic) {
      app[method](url, route);
    } else {
      app[method](url, loadApi.validate);
      app[method](url, route);
    }
  };

  var normalizeUrl = function(url) {
    if (url.indexOf('/') === 0) { return url; }
    return url;
  };

  var getFinalUrl = function(url, isPublic) {
    url = normalizeUrl(url);
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
    init: init,
  };
};

module.exports = serverHelper();