var __ = require('underscore');

var Logger = require(__CONFIG__.app_base_path + 'logger');
/**
 * A small wrapper around the error object for use within our app.
 *
 * @param err -
 *          This can be either the error or the status.
 * @param respMessage -
 *          This is the response message.
 * @param status -
 *          This is sent only if the first parameter is an error object,
 *          otherwise this can be sent as null.
 * @param vObj -
 *          This object will be sent if it's a validation error.
 */
function AppError(err, respMessage, vObj, logError) {
  'use strict';
  this.vObj = {};
  var objType = typeof(err);
  if (objType === 'object' && err instanceof Error) {
    this.stack = err.stack;
    this.message = err.message;
    this.appMessage = respMessage;
    this.isInternalErr = true;
    if (logError) {
      this.writeToLog();
    }
  } else if (objType === 'object' && err instanceof AppError) {
    this.copyError(err, respMessage, vObj);
  } else {
    this.appMessage = respMessage;
    this.status = err;
    this.isInternalErr = false;
    this.validation = vObj;
  }
}

AppError.prototype.writeToLog = function() {
  'use strict';
  var strError = 'AppMessage : ' + this.appMessage + ' \n';
  if (this.isInternalErr) {
    strError += 'StackTrace : ' + this.stack + ' \n';
    strError += 'Message : ' + this.message + ' \n';
  }
  strError += '-----------\n\n';
  Logger.writeLogErr(strError);
};

AppError.prototype.setAppMessage = function(message) {
  'use strict';
  this.appMessage = message;
};

AppError.prototype.copyError = function(err, respMessage, vObj) {
  'use strict';
  this.isInternalErr = err.isInternalErr;
  if (this.isInternalErr) {
    this.stack = err.stack;
  } else {
    this.status = err.status;
  }
  this.appMessage = err.appMessage;
  if (__.isEmpty(this.appMessage)) {
    this.appMessage = respMessage;
  }
  this.message = err.message;
  if (!err.vObj) {
    err.vObj = {};
  }
  this.validation = __.extend(err.validation, vObj);
};

module.exports = AppError;
