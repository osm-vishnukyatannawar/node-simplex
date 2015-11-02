var getStatus = require(__CONFIG__.app_base_path + 'lib/status');
var zip = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');

// Helpers
var dateUtil = require(__CONFIG__.app_base_path + 'lib/helpers/date-utility');
var mailer = require(__CONFIG__.app_base_path + 'lib/helpers/mailer');
var validator = require(__CONFIG__.app_base_path + 'lib/helpers/validator');
var csv = require(__CONFIG__.app_base_path + 'lib/helpers/csvHelper');
var zipper = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');

function Service() {
  this.getStatusCode = getStatus;

  // Helpers.
  this.dateUtil = dateUtil;
  this.mailer = mailer;
  this.csvHelper = new csv();
  this.validator = new validator();
  this.zipper = new zipper();
}


module.exports = Service;
