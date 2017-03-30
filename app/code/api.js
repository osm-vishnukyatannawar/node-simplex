'use strict';
// Third party modules
const i18n = require('i18n');
const path = require('path');

// Osm includes
let GetStatus = require(path.join(__CONFIG__.app_lib_path, 'status'));
let Controller = require(path.join(__CONFIG__.app_lib_path, 'controller'));
let AppError = require(path.join(__CONFIG__.app_lib_path, 'app-error'));

var API = function (app) {

};

API.validate = function (request, response, next) {
  // Check if user is logged in.
};

API.checkIfAdmin = function (request, response, next) {
  // Check if current user has admin privelege
};

module.exports = API;
