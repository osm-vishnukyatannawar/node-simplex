'use strict';

// Third party modules
const fs = require('fs');
const async = require('async');
const util = require('util');

// Internal modules
let AppModel = require(__CONFIG__.app_code_path + 'app-model.js');
let GetStatus = require(__CONFIG__.app_lib_path + 'status.js');

function UserModel (app) {
  AppModel.call(this);
}

util.inherits(UserModel, AppModel);

// Your code starts here.

module.exports = UserModel;
