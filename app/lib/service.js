var GetStatus = require(__CONFIG__.app_lib_path + 'status');

// Helpers
var DateUtil = require(__CONFIG__.app_helper_path + 'date-utility');
var Mailer = require(__CONFIG__.app_helper_path + 'mailer');
var Validator = require(__CONFIG__.app_helper_path + 'validator');
var CSV = require(__CONFIG__.app_helper_path + 'csv-helper');
var Zipper = require(__CONFIG__.app_helper_path + 'zipper');

function Service() {
  this.getStatus = GetStatus;

  // Helpers.
  this.dateUtil = DateUtil;
  this.mailer = Mailer;
  this.csvHelper = new CSV();
  this.validator = new Validator();
  this.zipper = new Zipper();
}


module.exports = Service;
