var util = require('util');

var Controller = require(__CONFIG__.app_lib_path + 'controller');

function AppController(app) {
	Controller.call(this);
}

util.inherits(AppController, Controller);