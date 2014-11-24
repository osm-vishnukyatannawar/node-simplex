var mariaDb = require(__CONFIG__.app_base_path + 'lib/db-connector/mariadb');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
var logger = require(__CONFIG__.app_base_path + 'logger');
var validator = require(__CONFIG__.app_base_path + 'lib/validator');
var __ = require('underscore');
var async = require('async');
var getStatus = require(__CONFIG__.app_base_path + 'lib/status');
var dbConfig = require(__CONFIG__.app_base_path + 'db-config');
var utility = require(__CONFIG__.app_base_path + 'lib/helpers/utility');

function Model(mProperties, objToBind, queryModifiers) {
  this.config = dbConfig['mariadb'];
  this.db = new mariaDb(this.config);
  this.validator = new validator(mProperties);
  this.getStatusCode = getStatus;
  this.queryModifiers = queryModifiers;
  this.buildObject(mProperties, objToBind);
  this.dbUtils = utility;
}

Model.prototype.query = function(objQuery) {
  var self = this;
  if (objQuery.validate === true || objQuery.validate === undefined) {
    if (!this.validator.isValid(objQuery.data)) {
      objQuery.cb(new AppError(this.getStatusCode("badRequest"),
              "Validation error.", this.validator.getErrors()));
      return;
    }
  }
  var beforeEvents = objQuery.before;
  if (__.isArray(beforeEvents) && beforeEvents.length !== 0) {
    this.currentData = objQuery.data;
    async.waterfall(beforeEvents, function(err, result) {
      if (err) {
        objQuery.cb(err);
        return;
      }
      runQuery(objQuery, self);
    });
  } else {
    runQuery(objQuery, self);
  }
};

Model.prototype.getActiveID = function() {
  return 1;
};

Model.prototype.getResults = function(objQuery) {
  this.db.getResults(objQuery, function(err, data) {
    processError(err);
    objQuery.cb(err, data);
  });
};

Model.prototype.getResult = function(objQuery) {
  this.db.getResult(objQuery, function(err, data) {
    processError(err);
    objQuery.cb(err, data);
  });
};

Model.prototype.buildObject = function(properties, objToBind) {
  if (!objToBind) { return; }
  var propValue = null;
  for ( var propertyName in properties) {
    propValue = objToBind[propertyName];
    if (propValue) {
      this[propertyName] = propValue;
    }
  }
};

Model.prototype.validateProp = function(obj, propsToValidate) {
  if (!this.validator.isValid(obj, propsToValidate)) { return this.validator
          .getErrors(); }
  return false;
};

Model.prototype.processGridQuery = function(selectQuery) {
  var finalQueryParams = this.defaultSelectProps;
  if (!__.isEmpty(this.queryModifiers)) {

    // Columns
    if (this.queryModifiers.sortCol) {
      finalQueryParams.sortCol = __
              .isEmpty(this.properties[this.queryModifiers.sortCol].dbName)
              ? finalQueryParams.sortCol
              : this.properties[this.queryModifiers.sortCol].dbName;
      finalQueryParams.sortBy = __.isEmpty(this.queryModifiers.sortBy)
              ? finalQueryParams.sortBy : this.queryModifiers.sortBy;
      finalQueryParams.sortBy = finalQueryParams.sortBy.toUpperCase();
    }

    // Records - Limit
    var intLimit = parseInt(this.queryModifiers.limit, 10);

    finalQueryParams.limit = isNaN(intLimit) ? finalQueryParams.limit
            : intLimit;
    var intStart = parseInt(this.queryModifiers.startRecord, 10);
    finalQueryParams.startRecord = isNaN(intStart)
            ? finalQueryParams.startRecord : this.queryModifiers.startRecord;
  }
  if (finalQueryParams.sortBy !== 'ASC' && finalQueryParams.sortBy !== 'DESC') {
    finalQueryParams.sortBy = 'ASC';
  }

  if (selectQuery) {
    selectQuery += ' ORDER BY ' + finalQueryParams.sortCol + ' '
            + finalQueryParams.sortBy + ' LIMIT '
            + finalQueryParams.startRecord + ', ' + finalQueryParams.limit;
  }
  this.defaultSelectProps = finalQueryParams;
  return selectQuery;
};

Model.prototype.beginTransaction = function(cb) {
  this.db.beginTransaction(function(err, data) {
    processError(err);
    return cb(err, data);    
  });
};

Model.prototype.commitTransaction = function(transactionID, cb) { 
  this.db.commitTransaction(transactionID, function(err, data) {
    processError(err);
    return cb(err, data);
  });
};

Model.prototype.rollbackTransaction = function(transactionID, cb) {
  this.db.rollbackTransaction(transactionID, function(err, data) {
    processError(err);
    return cb(err, data);
  });
};

function processError(err) {
  if (err && err.isInternalErr) {
    err.writeToLog();
  }
}

function runQuery(objQuery, self) {
  self.db.query(objQuery, function(err, info) {
    processError(err);
    objQuery.cb(err, info);
  });
}
module.exports = Model;
