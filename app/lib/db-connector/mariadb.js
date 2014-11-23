/**
 * A db class to be used by other models. Uses the following -
 * https://github.com/mscdex/node-mariasql DEPENDENCIES - node-mariasql -
 * app-error.js
 */

'use strict';

var mSQLClient = require('mariasql');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
var uuid = require('node-uuid');
var transactionPool = {};
var getPool = require(__CONFIG__.app_base_path
        + 'lib/db-connector/pools/mariadb-pool');
var defaultMsg = {
  errorDbConn: "There was an error while communicating with the database.",
  queryExecution: "There was an error while executing the query."
};

/**
 * The base MariaDb constructor.
 * 
 * @param dbConfig
 *          Database configurations
 * @param customMsgs
 *          Use this parameter to override the custom messages used.
 */
function MariaDB(dbConfig, customMsgs) {
  this.config = modifyConfigObj(dbConfig);
  this.pool = getPool(this.config);
  this.msgStrings = defaultMsg;
  if (customMsgs !== undefined && customMsgs.errorDbConn
          && customMsgs.queryExecution) {
    this.msgStrings = customMsgs;
  }
}

/**
 * Use this for INSERT, UPDATE, DELETE queries
 * 
 * @param objQuery
 *          Contains the following the properties - query - The SQL Query. data -
 *          Data to be sent for the query. cb - Callback method. closeConn -
 *          Close the connection automatically. useArray - Respond with an array
 *          rather than an object.
 */
MariaDB.prototype.query = function(objQuery, cb) {
  objQuery = getDefaultValues(objQuery);
  runQuery(this, false, objQuery.query, objQuery.data, cb, objQuery.closeConn,
          objQuery.useArray, objQuery.transaction);
};

MariaDB.prototype.getResult = function(objQuery, cb) {
  objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, function(err, data) {
    if (err) {
      cb(err, null);
      return;
    }
    var response = {};
    if (data.length !== 0) {
      response = data[0];
    }
    cb(null, response);
  }, objQuery.closeConn, objQuery.useArray, objQuery.transaction);
};

MariaDB.prototype.getResults = function(objQuery, cb) {
  objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, cb, objQuery.closeConn,
          objQuery.useArray, objQuery.transaction);
};

/**
 * Returns the first value from the result set or null
 * 
 * @param objQuery
 *          Object containing query, parameters etc.
 */
MariaDB.prototype.getValue = function(objQuery, cb) {
  objQuery = getDefaultValues(objQuery);
  objQuery.useArray = true;
  runQuery(this, true, objQuery.query, objQuery.data, function(err, data) {
    if (err) {
      cb(err, null);
      return;
    }
    var response = null;
    if (data.length !== 0 && data[0].length !== 0) {
      response = data[0][0];
    }
    cb(null, response);
  }, objQuery.closeConn, objQuery.useArray, objQuery.transaction);
};

MariaDB.prototype.beginTransaction = function(cb) {
  var transactionID = uuid.v4();
  objMaria.pool.acquire(function(err, client) {
    if (err) { return cb(err); }
    transactionPool[transactionID] = client;
    client.query('START TRANSACTION').on('result', function(res) {
    }).on('end', function(info) {
      info.transactionID = transactionID;
      cb(null, info);
    }).on('error', function(err) {
      cb(err);
    });
    cb(null, transactionID);
  });
};

MariaDB.prototype.commitTransaction = function(transactionID, cb) {
  var client = transactionPool[transactionID];
  if (!client) {
    // TODO : Change this...
    return cb(new AppError(500, 'Invalid transaction ID while committing', {
      transactionID: 'Invalid transaction ID - ' + transactionID
    }));
  }
  client.query('COMMIT TRANSACTION').on('result', function(res) {
    res.on('error', function() {
      client.query('ROLLBACK');
      return cb(err);
    });
  }).on('error', function(err) {
    client.query('ROLLBACK');
    return cb(err);
  }).on('end', function(info) {
    cb(null, info);
  });
};

function getDefaultValues(objQuery) {
  if (objQuery.closeConn === undefined) {
    objQuery.closeConn = true;
  }
  if (objQuery.useArray === undefined) {
    objQuery.useArray = false;
  }
  if (objQuery.transaction === undefined) {
    objQuery.transaction = false;
  }
  return objQuery;
}

function runQuery(objMaria, isSelect, query, data, cb, closeConn, useArray) {
  var hadError = false;
  var response = [];
  var clientObj = null;
  objMaria.pool.acquire(function(err, client) {
    if (err) {
      cb(new AppError(err, 'There was an error while acquiring the connection',
              {}));
      return;
    }
    clientObj = client;
    client.query(query, data, useArray).on('result', cbResultQuery).on('end',
            cbEndQuery);
  });

  function cbResultQuery(res) {
    if (isSelect) {
      res.on('row', function(row) {
        response.push(row);
      });
    }
    res.on('end', function(info) {
      if (!isSelect) {
        // Not a select statement;
        cb(null, info);
      }
    });
    res.on('error', function(err) {
      hadError = true;
      cb(new AppError(err, objMaria.msgStrings.queryExecution));
      res.abort();
      if (closeConn) {
        objMaria.pool.release(clientObj);
      }
    });
  }

  function cbEndQuery(info) {
    if (closeConn) {
      objMaria.pool.release(clientObj);
    }
    if (!hadError && isSelect) {
      cb(null, response);
    }
  }
}

function modifyConfigObj(dbConfig) {
  dbConfig.create = function(callback) {
    var client = new mSQLClient();
    client.connect(dbConfig);
    client.on('error', function(err) {
      callback(err, null);
    });
    client.on('connect', function() {
      callback(null, client);
    });
  };

  dbConfig.destroy = function(client) {
    client.end();
  };

  return dbConfig;
}

module.exports = MariaDB;