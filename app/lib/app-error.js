var logger = require(__CONFIG__.app_base_path + 'logger');
var __ = require('underscore');
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
function AppError(err, respMessage, vObj) {
  'use strict';
  var objType = typeof (err) ;  
  if (objType === 'object' && err instanceof Error) {
    this.stack = err.stack;
    this.message = err.message;
    this.appMessage = respMessage;
    this.isInternalErr = true;
  } else  if(objType === 'object' && err instanceof AppError) {
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
  logger.writeLogErr(strError);
};

AppError.prototype.setAppMessage = function(message) {
  'use strict';
  this.appMessage = message;
};

AppError.prototype.copyError = function(err, respMessage, vObj) {
  'use strict';
  this.isInternalErr = err.isInternalErr;
  this.stack = err.stack;
  this.appMessage = err.appMessage;
  if(__.isEmpty(this.appMessage)) {
    this.appMessage = respMessage;
  }  
  this.message = err.message;
  this.validation = __.extend(err.vObj, vObj);
};

module.exports = AppError;