/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var AppModel = require(__CONFIG__.app_code_path + 'app-model.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');

function UserModel(app) {
  AppModel.call(this);     
}

util.inherits(UserModel, AppModel);

// Your code starts here.

module.exports = UserModel;