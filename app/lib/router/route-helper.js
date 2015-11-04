/* global __CONFIG__ */

'use strict';

var RouteHelper = (function() {
  function getByteCount(maintString) {
    return encodeURI(maintString).split(/%..|./).length - 1;
  }
  
  function isValidControllerFolder(folderName, internalExclusionApi) {
    if (!folderName || internalExclusionApi.indexOf(folderName) !== -1) {
      return false;
    }
    return true;
  };

  function getControllerNameByFolder(folderName) {
    return folderName + '-controller.js';
  }
  
  // Normalizes the URL passed, removes trailing slashes.
  function normalizeUrl(url) {
    if (url.indexOf('/') === 0 || url.lastIndexOf('/') === url.length - 1) {
      return url.replace(/^\/|\/$/g, '');
    }
    return url;
  };

  // Returns the final URL based on the config value
  function getFinalUrl(url, isPublic) {
    var finalUrl = __CONFIG__.app_base_url_token + url;
    if (isPublic) {
      finalUrl = __CONFIG__.app_base_url + url;
    }
    return finalUrl;
  };
  
  return {
    getFinalUrl : getFinalUrl,
    normalizeUrl : normalizeUrl,
    getControllerNameByFolder : getControllerNameByFolder,
    isValidControllerFolder : isValidControllerFolder,
    getByteCount : getByteCount,
  }
}());

module.exports = RouteHelper;