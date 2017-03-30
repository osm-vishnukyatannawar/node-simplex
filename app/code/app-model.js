'use strict';

// Third party modules
const util = require('util');
const path = require('path');

// Osm includes
let Model = require(path.join(__CONFIG__.app_lib_path, 'model'));

function AppModel (app) {
  Model.call(this);
}

util.inherits(AppModel, Model);

module.exports = AppModel;
