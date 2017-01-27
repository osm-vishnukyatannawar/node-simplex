/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var AppService = require(__CONFIG__.app_code_path + 'app-service.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
var UserModel = require(__CONFIG__.app_code_path + 'user/user-model.js');

function UserService(app) {
  AppService.call(this);
}

util.inherits(UserService, AppService);

// Your code starts here.

module.exports = UserService;