/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
var AppController = require(__CONFIG__.app_code_path + 'app-controller.js');
var UserService = require(__CONFIG__.app_code_path + 'user/user-service.js');

function UserController(app) {
  AppController.call(this);

  app.httpGet({
    url: '/user/:id',
    route: this.getUser.bind(this),
    isPublic: true,
    isAdmin: false
  });
}

util.inherits(UserController, AppController);

// Your code starts here.

UserController.prototype.getUser = function (request, response) {
  this.sendResponse(null, {
    'username': 'Abijeet Patro',
    'password': 'ABC'
  }, response);
}

module.exports = UserController;