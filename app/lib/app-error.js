var logger = require(__CONFIG__.app_base_path + 'logger');

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
  if (typeof (err) === "object" && err instanceof Error) {
    this.stack = err.stack;
    this.message = err.message;
    this.appMessage = respMessage;
    this.isInternalErr = true;
  } else {
    this.appMessage = respMessage;
    this.status = err;
    this.isInternalErr = false;
    this.validation = vObj;
  }
}

AppError.prototype.writeToLog = function() {
  var strError = 'AppMessage : ' + this.appMessage + ' \n';
  if (this.isInternalErr) {
    strError += 'StackTrace : ' + this.stack + ' \n';
    strError += 'Message : ' + this.message + ' \n';
  }
  strError += '-----------\n\n';
  logger.writeLogErr(strError);
};

module.exports = AppError;