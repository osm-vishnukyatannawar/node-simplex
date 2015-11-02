var uuid = require('node-uuid');
var __ = require('underscore');
var async = require('async');
var bcrypt = require('bcrypt');
var util = require('util');

var mariaDb = require(__CONFIG__.app_base_path + 'lib/db-connector/mariadb');
var cassandraDb = require(__CONFIG__.app_base_path +
  'lib/db-connector/cassandradb');

var dbConfig = require(__CONFIG__.app_base_path + 'db-config');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
var logger = require(__CONFIG__.app_base_path + 'logger');
var getStatus = require(__CONFIG__.app_base_path + 'lib/status');

// Helpers
var dateUtil = require(__CONFIG__.app_base_path + 'lib/helpers/date-utility');
var mailer = require(__CONFIG__.app_base_path + 'lib/helpers/mailer');
var validator = require(__CONFIG__.app_base_path + 'lib/helpers/validator');
var csv = require(__CONFIG__.app_base_path + 'lib/helpers/csvHelper');
var zipper = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');

function Model(mProperties, objToBind, queryModifiers) {
  this.config = dbConfig['mariadb'];
  this.cassandraConfig = dbConfig['cassandradb'];
  this.db = new mariaDb(this.config);
  this.csDb = new cassandraDb(this.cassandraConfig);
  this.getStatusCode = getStatus;
  this.queryModifiers = queryModifiers;
  this.buildObject(mProperties, objToBind);

  // Helpers.
  this.dateUtil = dateUtil;
  this.mailer = mailer;
  this.csvHelper = new csv();
  this.validator = new validator(mProperties);
  this.zipper = new zipper();
}

Model.prototype.query = function(objQuery) {
  var self = this;  
  var beforeEvents = objQuery.before;
  if (__.isArray(beforeEvents) && beforeEvents.length !== 0) {
    this.currentData = objQuery.data;
    async.waterfall(beforeEvents, function(err) {
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
    processError(err, objQuery);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    this.csDb.getResults(objQuery, cbProcess);
  } else {
    this.db.getResults(objQuery, cbProcess);
  }
};

Model.prototype.getResult = function(objQuery) {
  var cbProcess = function(err, data) {
    processError(err, objQuery);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    this.csDb.getResult(objQuery, cbProcess);
  } else {
    this.db.getResult(objQuery, cbProcess);
  }
};

Model.prototype.buildObject = function(properties, objToBind) {
  if (!objToBind) {
    return;
  }
  var propValue = null;
  for (var propertyName in properties) {
    propValue = objToBind[propertyName];
    if (propValue) {
      this[propertyName] = propValue;
    }
  }
};

Model.prototype.validateProp = function(obj, propsToValidate) {
  if (!this.validator.isValid(obj, propsToValidate)) {
    return this.validator
      .getErrors();
  }
  return false;
};

Model.prototype.validate = function(obj) {
  if (!this.validator.isValid(obj, this.properties)) {
    return this.validator
      .getErrors();
  }
  return false;
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
    if (cb) {
      return cb(err, data);
    }
  });
};

Model.prototype.handleTransactionEnd = function(err, transactionID, cb) {
  if (err) {
    this.rollbackTransaction(transactionID, function(rollBackErr) {
      if (rollBackErr) {
        return cb(rollBackErr);
      }
      return cb(err);
    });
    return;
  } else {
    this.commitTransaction(transactionID, function(err) {
      return cb(err);
    });
  }
};

/**
 *
 * @param objQueryDetails Information about the query to be generated
 * @param objQueryDetails.initialQuery string Initial part of the query
 * @param objQueryDetails.staticData object or array static data, data that will stay the same for all the
 * queries.
 * @param objQueryDetails.staticCols array Static columns. They should be in the same order as
 * present in the query.
 * @param objQueryDetails.hasPrimary boolean True if there is a primary key column.
 * @param objQueryDetails.data
 * @param objQueryDetails.propNames
 * @param objQueryDetails.defaultVals
 * @returns
 */
Model.prototype.getMultipleInsertQuery = function(objQueryDetails) {
  var initialQuery = objQueryDetails.initialQuery;
  var finalData = objQueryDetails.staticData;
  var propNames = objQueryDetails.propNames;
  var staticCols = objQueryDetails.staticCols;
  var dataToBind = objQueryDetails.data;
  var hasPrimaryKey = objQueryDetails.hasPrimary;
  var defaultVals = objQueryDetails.defaultVals;

  var valuesQueryArr = [];
  var valuesQuery = '';
  var idCol = '';
  var i = 0, len = 0, dynamicCols = [], j = 0, len2 = 0;
  var currColName;
  if (__.isArray(dataToBind)) {
    // It's an array.
    for (i = 0, len = dataToBind.length; i < len; ++i) {
      dynamicCols = [];
      if (hasPrimaryKey) {
        // Adding the id column.
        idCol = 'id_' + i.toString();
        dynamicCols.push(':' + idCol);
        finalData[idCol] = uuid.v4();
      }

      // Now adding the data itself.
      var currData = dataToBind[i];
      for (j = 0, len2 = propNames.length; j < len2; ++j) {
        currColName = propNames[j] + '_' + i.toString();
        dynamicCols.push(':' + currColName);
        finalData[currColName] = currData[propNames[j]];
      }
      valuesQueryArr.push('(' + dynamicCols.join() + ', ' + staticCols.join() +
        ')');
    }
    valuesQuery = valuesQueryArr.join();
  } else {
    // It's an object.
    for (i = 0, len = dataToBind[propNames[0]].length; i < len; ++i) {
      dynamicCols = [];
      if (hasPrimaryKey) {
        idCol = 'id_' + i.toString();
        dynamicCols.push(':' + idCol);
        finalData[idCol] = uuid.v4();
      }
      for (j = 0, len2 = propNames.length; j < len2; ++j) {
        currColName = propNames[j] + '_' + i.toString();
        dynamicCols.push(':' + currColName);
        if (dataToBind[propNames[j]] && dataToBind[propNames[j]][i]) {
          finalData[currColName] = dataToBind[propNames[j]][i];
        } else if (defaultVals[propNames[j]]) {
          finalData[currColName] = defaultVals[propNames[j]];
        } else {
          finalData[currColName] = '';
        }
      }
      valuesQueryArr.push('(' + dynamicCols.join() + ', ' + staticCols.join() +
        ')');
    }
    valuesQuery = valuesQueryArr.join();
  }

  return {
    query: initialQuery + valuesQuery + ';',
    data: finalData
  };
};

Model.prototype.getBcryptHash = function(stringToHash, noOfRounds, cb) {
  bcrypt.hash(stringToHash, noOfRounds, function(err, hash) {
    return cb(err, hash);
  });
};

Model.prototype.compareHash = function(stringToCheck, hashString, cb) {
  bcrypt.compare(stringToCheck, hashString, function(err, res) {
    return cb(err, res);
  });
};

Model.prototype.readCsvFile = function(path, cb) {
  this.csvHelper.readCsvHelper(path, function(err, data) {
    if (err) {
      cb(err);
    }
    cb(null, data);
  });
};

Model.prototype.queries = function(objQuery) {
  runQuery(objQuery, this);
};

function processError(err, objQuery) {
  'use strict';
  if (err && err.isInternalErr) {
    err.writeToLog();
    if (objQuery) {
      var strError = 'Query Failed : ' + objQuery.query + ' \n';
      if (objQuery.hasOwnProperty('data')) {
        strError += 'Data : ' + util.inspect(objQuery.data, {
          depth: 4
        }) + '\n';
      }
      strError += '-----------\n\n';
      logger.writeLogErr(strError);
    }
  }
}

function runQuery(objQuery, self) {
  var cbProcess = function(err, data) {
    processError(err, objQuery);
    objQuery.cb(err, data);
  };
  if (objQuery.isCassandra) {
    self.csDb.query(objQuery, cbProcess);
  } else {
    if (objQuery.isMultiple) {
      self.db.queries(objQuery, cbProcess);
    } else {
      self.db.query(objQuery, cbProcess);
    }
  }
}

module.exports = Model;
