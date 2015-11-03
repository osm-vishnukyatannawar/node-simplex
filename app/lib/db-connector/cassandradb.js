/**
 * A db class to be used by other models to access cassandra database.
 */
'use strict';
var cassandra = require('cassandra-driver');

var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');

var defaultMsg = {
  errorDbConn: "There was an error while communicating with the database.",
  queryExecution: "There was an error while executing the query."
};

/**
 * The base cassandra constructor.
 */
var client = false;

function CassandraDB(dbConfig) {
  if (client === false) {
    var authProvider = new cassandra.auth.PlainTextAuthProvider(dbConfig.username, dbConfig.password);
    client = new cassandra.Client({
      contactPoints: [dbConfig.host],
      authProvider: authProvider
    });
  }
  this.client = client;
  this.msgStrings = defaultMsg;
}

/**
 * Use this for INSERT, UPDATE, DELETE queries
 *
 * @param objQuery
 *            Contains the following the properties - query - The SQL Query.
 *            data - Data to be sent for the query. cb - Callback method.
 */
CassandraDB.prototype.query = function(objQuery, cb) {
  // cassandra has no close connection option and returning array
  runQuery(this, false, objQuery.query, objQuery.data, cb);
  return;
};

CassandraDB.prototype.getResult = function(objQuery, cb) {
  // objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, function(err, data) {
    if (err) {
      cb(new AppError(err, defaultMsg.queryExecution, {
        query: objQuery.query
      }), null);
      return;
    }
    var response = {};
    if (data.length !== 0) {
      response = data[0];
    }
    cb(null, response);
  });
};

CassandraDB.prototype.getResults = function(objQuery, cb) {
  // objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, cb);
  return;
};

/**
 * Returns the first value from the result set or null
 *
 * @param objQuery
 *            Object containing query, parameters etc.
 */
CassandraDB.prototype.getValue = function(objQuery, cb) {
  runQuery(this, true, objQuery.query, objQuery.data, function(err, data) {
    if (err) {
      cb(new AppError(err, defaultMsg.queryExecution, {
        query: objQuery.query
      }), null);
      return;
    }
    var response = null;
    if (data.length !== 0 && data[0].length !== 0) {
      response = data[0][0];
    }
    cb(null, response);
  });
};

function runQuery(objCassandra, isSelect, query, data, cb) {
  objCassandra.client.execute(query, data, {
    prepare: true
  }, function(err, data) {
    if (err) {
      cb(new AppError(err, defaultMsg.queryExecution, {
        query: query
      }), null);
      return;
    }
    cb(null, data);
  });
}

module.exports = CassandraDB;
