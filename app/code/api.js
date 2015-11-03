/* global __CONFIG__ */
var getStatus = require(__CONFIG__.app_base_path + 'lib/status');
var Authorization = require(__CONFIG__.app_code_path + 'authorization/Authorization');
var Controller = require(__CONFIG__.app_base_path + 'lib/controller');
var i18n = require('i18n');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');

var API = function(app) {
  i18n.configure({
    locales: ['en'],
    defaultLocale: 'en',
    prefix: 'emanate-',
    directory: __CONFIG__.app_base_path + '../locales'
  });

  app.use(i18n.init);
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
