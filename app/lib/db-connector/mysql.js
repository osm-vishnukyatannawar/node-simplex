/**
 * A db class to be used by other models. Uses the following -
 * https://github.com/felixge/node-mysql DEPENDENCIES - node-mariasql -
 * app-error.js TODO : Add transaction support.
 */

'use strict';

// Third party modules
const mSQLClient = require('mysql');

// Osm includes
let SQLPool = require(__CONFIG__.app_lib_path + 'db-connector/pools/mysql-pool');
let AppError = require(__CONFIG__.app_lib_path + 'app-error');

var defaultMsg = {
  errorDbConn: 'There was an error while communicating with the database.',
  queryExecution: 'There was an error while executing the query.'
};

/**
 * The base MariaDb constructor.
 *
 * @param dbConfig
 *          Database configurations
 * @param customMsgs
 *          Use this parameter to override the custom messages used.
 */
function MySQL (dbConfig, customMsgs) {
  this.config = dbConfig;
  this.msgStrings = defaultMsg;
  if (customMsgs !== undefined && customMsgs.errorDbConn && customMsgs.queryExecution) {
    this.msgStrings = customMsgs;
  }
}

MySQL.prototype.setDbConfig = function (dbConfig) {
  this.config = dbConfig;
  this.closeConnection();
};

/**
 * Use this for INSERT, UPDATE, DELETE queries
 *
 * @param objQuery
 *          Contains the following the properties - query - The SQL Query. data -
 *          Data to be sent for the query. cb - Callback method. closeConn -
 *          Close the connection automatically. useArray - Respond with an array
 *          rather than an object.
 */
MySQL.prototype.query = function (objQuery, cb) {
  runQuery(this, false, objQuery.query, objQuery.data, cb, objQuery.closeConn);
};

MySQL.prototype.getResult = function (objQuery, cb) {
  runQuery(this, true, objQuery.query, objQuery.data, function (err, data) {
    if (err) {
      cb(err, null);
      return;
    }
    var response = {};
    if (data.length !== 0) {
      response = data[0];
    }
    cb(null, response);
  }, objQuery.closeConn, objQuery.useArray);
};

MySQL.prototype.getResults = function (objQuery, cb) {
  runQuery(this, true, objQuery.query, objQuery.data, cb, objQuery.closeConn);
};

// isSelect is currently not being used, leaving it as is, to maybe use in the
// future
function runQuery (objMySQL, isSelect, query, data, cb, closeConn) {
  SQLPool(objMySQL.config, function (err, connection) {
    if (err) {
      cb(new AppError(err, objMySQL.msgStrings['errorDbConn']), null);
      return;
    }
    connection.query(query, data, function (err, result) {
      if (err) {
        cb(new AppError(err, objMySQL.msgStrings['queryExecution']), null);
        return;
      }
      cb(null, result);
      if (closeConn) {
        connection.release();
      }
    });
  });
}

module.exports = MySQL;
