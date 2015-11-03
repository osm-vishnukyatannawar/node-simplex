var util = require('util');

var Service = require(__CONFIG__.app_lib_path + 'service');

function AppService(app) {
	Service.call(this);
}

util.inherits(AppService, Service);