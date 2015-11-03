var GetStatus = require(__CONFIG__.app_base_path + 'lib/status');

// Helpers
var DateUtil = require(__CONFIG__.app_base_path + 'lib/helpers/date-utility');
var Mailer = require(__CONFIG__.app_base_path + 'lib/helpers/mailer');
var Validator = require(__CONFIG__.app_base_path + 'lib/helpers/validator');
var CSV = require(__CONFIG__.app_base_path + 'lib/helpers/csvHelper');
var Zipper = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');

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
