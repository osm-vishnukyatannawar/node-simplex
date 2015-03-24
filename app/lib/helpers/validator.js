var validatorLib = require('validator');
var __ = require('underscore');

validatorLib.extend('isRequired', function(str) {
  if (!str || str.length === 0) {
    return false;
  }
  return true;
});

validatorLib.extend('isBoolRequired', function(str) {
  if (!str || str.length !== 0) {
    return true;
  }
  return false;
});

function Validator(requiredFields) {
  this.requiredFields = requiredFields;
  this.errorObj = {};
}

Validator.prototype.isValid = function(objToValidate, propsToValidate) {
  this.errorObj = {};
  if (propsToValidate) {
    for (var i = 0, len = propsToValidate.length, propName; i < len; ++i) {
      propName = propsToValidate[i];
      if (this.requiredFields.hasOwnProperty(propName)) {
        this.validateProperty(objToValidate, propsToValidate[i],
          this.requiredFields[propName].validation);
      }
    }
  } else {
    for (var propName in this.requiredFields) {
      this.validateProperty(objToValidate, propName,
        this.requiredFields[propName].validation);
    }
  }
  // If object is empty no errors - so true it's valid else its not valid
  return __.isEmpty(this.errorObj);
};

Validator.prototype.validateProperty = function(objToValidate, propName,
  propsToValidate) {
  if (!propsToValidate) {
    return;
  }
  var value = objToValidate[propName];
  for (var validationRule in propsToValidate) {
    if (validationRule !== 'isRequired' && !value) {
      continue;
    }
    if (!validatorLib[validationRule](value)) {
      this.errorObj[propName] = propsToValidate[validationRule];
      break;
    }
  }
};

Validator.prototype.getErrors = function() {
  return this.errorObj;
};

Validator.prototype.isUUID4 = function(str) {
  return validatorLib.isUUID(str, 4);
};

Validator.prototype.isEmail = function(str) {
  return validatorLib.isEmail(str);
};
Validator.prototype.chkPswrdLength = function(str) {
  if (!str || str.length < 7) {
    return false;
  }
  return true;
}
module.exports = Validator;
