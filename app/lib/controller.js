var getStatus = require(__CONFIG__.app_base_path + 'lib/status');

'use strict';

function Controller() {
  'use strict';
  this.getStatusCode = getStatus;
}

Controller.prototype.sendResponse = function(err, data, response) {
  'use strict';
  this.responseObj = response;
  if (err) {
    this.determineError(err);
    response.format({
      'application/json': this.jsonError.bind(this),
      'default': this.jsonError.bind(this)
    });
  } else {
    this.determineSuccess(data);
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

module.exports = Controller;