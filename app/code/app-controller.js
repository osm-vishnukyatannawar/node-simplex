'use strict';

// Third party modules
const util = require('util');
const path = require('path');

// Osm includes
let Controller = require(path.join(__CONFIG__.app_lib_path, 'controller'));

function AppController (app) {
  Controller.call(this);
}

util.inherits(AppController, Controller);

module.exports = AppController;
