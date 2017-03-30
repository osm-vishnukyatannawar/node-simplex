/* global __CONFIG__ */
'use strict';

// Third party modules
const fs = require('fs');
const async = require('async');
const util = require('util');

// Osm includes
let GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
let AppController = require(__CONFIG__.app_code_path + 'app-controller.js');
let UserService = require(__CONFIG__.app_code_path + 'user/user-service.js');

function UserController (app) {
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
};

module.exports = UserController;
