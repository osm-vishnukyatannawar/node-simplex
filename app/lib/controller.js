'use strict';

var GetStatus = require(__CONFIG__.app_lib_path + 'status');

function Controller() {
  'use strict';
  this.getStatusCode = GetStatus;
}

Controller.prototype.sendResponse = function(err, data, response) {
  'use strict';
  this.responseObj = response;
  if (err) {
    this.determineError(err);
    response.dataSentToClient = this.err.objToSend;
    response.msgSentToClient = this.err.message;
    response.format({
      'application/json': this.jsonError.bind(this),
      'default': this.jsonError.bind(this)
    });
  } else {
    this.determineSuccess(data);
    response.dataSentToClient = this.success.dataToSend;
    response.msgSentToClient = '';
    response.format({
      'application/json': this.jsonSuccess.bind(this),
      'default': this.jsonSuccess.bind(this)
    });
  }
};

Controller.prototype.jsonSuccess = function() {
  'use strict';
  var objToSend = {
    'status': this.success.status,
    'data': this.success.dataToSend
  };
  this.responseObj.status(this.success.statusCode).json(objToSend);
};

Controller.prototype.jsonError = function() {
  'use strict';
  var objToSend = {
    'status': this.err.status,
    'message': this.err.message
  };
  if (this.err.objToSend) {
    objToSend.data = this.err.objToSend;
  }
  this.responseObj.status(this.err.statusCode).json(objToSend);
};

Controller.prototype.determineError = function(errObj) {
  'use strict';
  this.err = {};
  this.err.status = 'fail';
  this.err.objToSend = null;
  this.err.message = errObj.appMessage;
  if (errObj.isInternalErr) {
    this.err.status = 'error';
    this.err.statusCode = this.getStatusCode('internalError');
  } else {
    this.err.objToSend = errObj.validation;
    this.err.statusCode = errObj.status;
  }
};

Controller.prototype.determineSuccess = function(data) {
  'use strict';
  this.success = {};
  this.success.status = 'success';
  this.success.dataToSend = data;
  this.success.statusCode = this.getStatusCode('success');
};

Controller.prototype.download = function(response, fileNameToShow, folderPath, fileToDownload) {
  var that = this;
  response.attachment(fileNameToShow);
  response.setHeader('Set-Cookie', 'fileDownload=true; path=/');
  response.dataSentToClient = 'File to download : ' + fileToDownload;
  response.msgSentToClient = 'Downloading file...';
  var options = {
    root: folderPath,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  response.sendFile(fileToDownload,
    options,
    function(err) {
      if (err) {
        if (!response.headersSent) {
          that.sendResponse(err, null, response);
        }
      }
    });
};

module.exports = Controller;
