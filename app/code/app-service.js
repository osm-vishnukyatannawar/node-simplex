'use strict';

// Third party modules
const util = require('util');
const path = require('path');

// Osm includes
let Service = require(path.join(__CONFIG__.app_lib_path, 'service'));

function AppService (app) {
  Service.call(this);
}

util.inherits(AppService, Service);

module.exports = AppService;
