var util = require('util');

var Model = require(__CONFIG__.app_lib_path + 'model');

function AppModel(app) {
	Model.call(this);
}

util.inherits(AppModel, Model);

module.exports = AppModel;