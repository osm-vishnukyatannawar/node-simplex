/* global __CONFIG__ */
'use strict';

// Third party modules
const util = require('util');

// Osm includes
let AppService = require(__CONFIG__.app_code_path + 'app-service.js');
let GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
let UserModel = require(__CONFIG__.app_code_path + 'user/user-model.js');

function UserService (app) {
  AppService.call(this);
}

util.inherits(UserService, AppService);

// Your code starts here.

UserService.prototype.login = function (options, cb) {
  // Code related to user login will goes here
};

module.exports = UserService;
