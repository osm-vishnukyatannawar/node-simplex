/* global __CONFIG__ */
'use strict';
var i18n = require('i18n');

var GetStatus = require(__CONFIG__.app_lib_path + 'status');
var Controller = require(__CONFIG__.app_lib_path + 'controller');
var AppError = require(__CONFIG__.app_lib_path + 'app-error');

var API = function(app) {
    
};

API.validate = function(request, response, next) {
  // Check if user is logged in.
};

API.checkIfAdmin = function(request, response, next) {
  // Check if current user has admin privelege
};

API.notFound = function(request, response) {
  // Write code to handle the api not found condition.
};

module.exports = API;
