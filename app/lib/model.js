var mariaDb = require(__CONFIG__.app_base_path + 'lib/db-connector/mariadb');
var cassandraDb = require(__CONFIG__.app_base_path
        + 'lib/db-connector/cassandradb');

var dbConfig = require(__CONFIG__.app_base_path + 'db-config');
var logger = require(__CONFIG__.app_base_path + 'logger');

var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');

var getStatus = require(__CONFIG__.app_base_path + 'lib/status');

var utility = require(__CONFIG__.app_base_path + 'lib/helpers/utility');
var mailer = require(__CONFIG__.app_base_path + 'lib/helpers/mailer');
var validator = require(__CONFIG__.app_base_path + 'lib/helpers/validator');

var __ = require('underscore');
var async = require('async');

function Model(mProperties, objToBind, queryModifiers) {
  this.config = dbConfig['mariadb'];
  this.cassandraConfig = dbConfig['cassandradb'];
  this.db = new mariaDb(this.config);
  this.csDb = new cassandraDb(this.cassandraConfig);
  this.validator = new validator(mProperties);
  this.getStatusCode = getStatus;
  this.queryModifiers = queryModifiers;
  this.buildObject(mProperties, objToBind);
  this.dbUtils = utility;
  this.email = {};
  this.email.mailer = mailer;
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
  var cbProcess = function(err, data) {
    processError(err);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    this.csDb.getResults(objQuery, cbProcess);
  } else {
    this.db.getResults(objQuery, cbProcess);
  }
  ;
};

Model.prototype.getResult = function(objQuery) {
  var cbProcess = function(err, data) {
    processError(err);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    this.csDb.getResult(objQuery, cbProcess);
  } else {
    this.db.getResult(objQuery, cbProcess);
  }
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

Model.prototype.validate = function(obj) {
  if (!this.validator.isValid(obj, this.properties)) { return this.validator
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

Model.prototype.handleTransactionEnd = function(err, transactionID, cb) {
  if (err) {
    this.rollbackTransaction(transactionID, function(rollBackErr) {
      if (rollBackErr) { return cb(rollBackErr); }
      return cb(err);
    });
    return;
  } else {
    this.commitTransaction(transactionID, function(err) {
      return cb(err);
    });
  }
};

Model.prototype.getMultipleInsertQuery = function(objQueryDetails) {
  var initialQuery = objQueryDetails.initialQuery;
  var finalData = objQueryDetails.staticData;
  var propNames = objQueryDetails.propNames;
  var staticCols = objQueryDetails.staticCols;
  var dataToBind = objQueryDetails.data;
  var hasPrimaryKey = objQueryDetails.hasPrimary;

  var valuesQueryArr = [];

  for (var i = 0, len = dataToBind.length; i < len; ++i) {
    var dynamicCols = [];
    if (hasPrimaryKey) {
      // Adding the id column.
      var idCol = ':id_' + i.toString();
      dynamicCols.push(idCol);
      finalData[idCol] = uuid.v4();
    }

    // Now adding the data itself.
    var currData = dataToBind[i];
    for (var j = 0, len2 = propNames.length; j < len2; ++j) {
      var currColName = ':' + propNames[j] + '_' + i.toString();
      dynamicCols.push(currColName);
      finalData[currColName] = currData[propNames[j]];
    }
    valuesQueryArr.push('(' + dynamicCols.join() + staticCols.join() + ')');
  }

  var valuesQuery = valuesQueryArr.join();
  return {
    query: initialQuery + valuesQuery,
    data: finalData
  };
};

Model.prototype.convertTagTimeStamp = function(timeStamp) {
  var convDate = new Date(timeStamp.tm_year, timeStamp.tm_mon, timeStamp.tm_mday,
          timeStamp.tm_hour, timeStamp.tm_min, timeStamp.tm_sec, 0);
  return convDate.toISOString().slice(0, 19).replace('T', ' ');
};

function processError(err) {
  if (err && err.isInternalErr) {
    err.writeToLog();
  }
}

function runQuery(objQuery, self) {
  var cbProcess = function(err, data) {
    processError(err);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    self.csDb.query(objQuery, cbProcess);
  } else {
    self.db.query(objQuery, cbProcess);
  }
}

module.exports = Model;
