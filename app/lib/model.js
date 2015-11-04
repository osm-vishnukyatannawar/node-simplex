var uuid = require('node-uuid');
var __ = require('underscore');
var async = require('async');
var bcrypt = require('bcrypt');
var util = require('util');

var DBConfig = require(__CONFIG__.app_base_path + 'db-config');
var Logger = require(__CONFIG__.app_base_path + 'logger');

var AppError = require(__CONFIG__.app_lib_path + 'app-error');
var GetStatus = require(__CONFIG__.app_lib_path + 'status');
var MariaDb = require(__CONFIG__.app_lib_path + 'db-connector/mariadb');
var CassandraDb = require(__CONFIG__.app_lib_path + 'db-connector/cassandradb');

// Helpers
var DateUtil = require(__CONFIG__.app_helper_path + 'date-utility');
var Mailer = require(__CONFIG__.app_helper_path + 'mailer');
var Validator = require(__CONFIG__.app_helper_path + 'validator');
var Csv = require(__CONFIG__.app_helper_path + 'csv-helper');
var Zipper = require(__CONFIG__.app_helper_path + 'zipper');

function Model(mProperties, objToBind, queryModifiers) {
  this.config = DBConfig['mariadb'];
  this.cassandraConfig = DBConfig['cassandradb'];
  this.db = new MariaDb(this.config);
  this.csDb = new CassandraDb(this.cassandraConfig);
  this.getStatusCode = GetStatus;
  this.queryModifiers = queryModifiers;
  this.buildObject(mProperties, objToBind);

  // Helpers.
  this.dateUtil = DateUtil;
  this.mailer = Mailer;
  this.csvHelper = new Csv();
  this.validator = new Validator(mProperties);
  this.zipper = new Zipper();
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
      Logger.writeLogErr(strError);
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
