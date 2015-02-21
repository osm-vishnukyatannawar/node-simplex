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
var getPool = require(__CONFIG__.app_base_path + 'lib/db-connector/pools/mariadb-pool');
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
function MariaDB(dbConfig, customMsgs) {
  this.config = modifyConfigObj(dbConfig);
  this.pool = getPool(this.config);
  this.msgStrings = defaultMsg;
  if (customMsgs !== undefined && customMsgs.errorDbConn && customMsgs.queryExecution) {
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
    objQuery.useArray, objQuery.transactionID, objQuery.isMultiple);
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
  }, objQuery.closeConn, objQuery.useArray, objQuery.transactionID, objQuery.isMultiple);
};

MariaDB.prototype.getResults = function(objQuery, cb) {
  objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, cb, objQuery.closeConn,
    objQuery.useArray, objQuery.transactionID, objQuery.isMultiple);
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
  }, objQuery.closeConn, objQuery.useArray, objQuery.transactionID, objQuery.isMultiple);
};

MariaDB.prototype.beginTransaction = function(cb) {
  var transactionID = uuid.v4();
  var that = this;
  this.pool.acquire(function(err, client) {
    if (err) {
      return cb(err);
    }
    transactionPool[transactionID] = client;
    client.query('START TRANSACTION;').on('result', function() {}).on('end', function() {
      cb(null, transactionID);
    }).on('error', function(err) {
      destroyTransactionClient(that, transactionID);
      cb(err);
    });
  });
};

MariaDB.prototype.commitTransaction = function(transactionID, cb) {
  var client = transactionPool[transactionID];
  var that = this;
  if (!client) {
    // TODO : Change this...
    return cb(new AppError(500, 'Invalid transaction ID while committing', {
      transactionID: 'Invalid transaction ID - ' + transactionID
    }));
  }
  client.query('COMMIT;').on('result', function(res) {
    res.on('error', function() {
      this.rollbackTransaction(transactionID, function(err) {
        return cb(err);
      });
    });
  }).on('error', function(err) {
    this.rollbackTransaction(transactionID, function(tErr) {
      if (tErr) {
        return cb({
          transaction: tErr,
          error: err
        });
      }
      return cb(err);
    });
  }).on('end', function() {
    destroyTransactionClient(that, transactionID);
    cb(null);
  });
};

MariaDB.prototype.rollbackTransaction = function(transactionID, cb) {
  var client = transactionPool[transactionID];
  var that = this;
  if (client) {
    client.query('ROLLBACK;').on('result', function(res) {
      res.on('error', function(err) {
        destroyTransactionClient(that, transactionID);
        return cb(err);
      });
    }).on('error', function(err) {
      destroyTransactionClient(that, transactionID);
      return cb(err);
    }).on('end', function() {
      destroyTransactionClient(that, transactionID);
      return cb(null);
    });
  }
  destroyTransactionClient(that, transactionID);
};

MariaDB.prototype.queries = function(objQuery, cb) {  
  objQuery = getDefaultValues(objQuery);
  runQuery(this, true, objQuery.query, objQuery.data, cb, objQuery.closeConn,
    objQuery.useArray, objQuery.transactionID, objQuery.isMultiple);
};


function destroyTransactionClient(objMaria, transactionID) {
  if (!transactionPool[transactionID]) {
    return;
  }
  var clientObj = transactionPool[transactionID];
  objMaria.pool.release(clientObj);
  delete transactionPool[transactionID];
}

function getDefaultValues(objQuery) {
  if (objQuery.closeConn === undefined) {
    objQuery.closeConn = true;
  }
  if (objQuery.useArray === undefined) {
    objQuery.useArray = false;
  }
  if (objQuery.transactionID === undefined) {
    objQuery.transactionID = false;
  }
  if(objQuery.isMultiple === undefined) {
    objQuery.isMultiple = false;
  }
  return objQuery;
}

function runQuery(objMaria, isSelect, query, data, cb, closeConn, useArray, transactionID, isMultiple) {
  var hadError = false;
  var response = [];
  var clientObj = null;
  var qCnt = 0;
  
  if (transactionID) {
    clientObj = transactionPool[transactionID];
    runQueryWithClient();
  } else {
    objMaria.pool.acquire(function(err, client) {
      if (err) {
        return cb(new AppError(err, 'There was an error while acquiring the connection', {}));

      }
      clientObj = client;
      runQueryWithClient();
    });
  }

  function runQueryWithClient() {
    try {
      clientObj.query(query, data, useArray).on('result', function(res) {
        if(isMultiple) {
          cbMultipleResultQuery(res);
        } else {
          cbResultQuery(res);
        }
      }).on('end', cbEndQuery).on('error', function(err) {
        if(!isMultiple) {
          return;
        }      
        response = initMultipleResObj(response, qCnt);
        response[qCnt].err = err;
        return cb(new AppError(err, objMaria.msgStrings.queryExecution));
      });
    } catch (e) {      
      if(transactionID) {        
        destroyTransactionClient(objMaria, transactionID);
      } else {
        objMaria.pool.release(clientObj);
      }
      cb(new AppError(e, objMaria.msgStrings.queryExecution, {}));
    }
  }
  
  // Processes single query.
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
      handleError(err);
    });
  }
  
  // Processes multiple result query.
  function cbMultipleResultQuery(res) {
    response = initMultipleResObj(response, qCnt);
    res.on('row', function(row) {
      response[qCnt].data.push(row);
    });
    
    res.on('error', function(err) {      
      res.abort();
      handleError(err);
    });
    
    res.on('end', function(info) {
      if(!hadError) {
        response[qCnt].info = info;
        ++qCnt;
      }
    });
  }
  
  // Called at the end of the query...
  function cbEndQuery() {
    if (closeConn && !transactionID) {
      objMaria.pool.release(clientObj);
    }
    if(!hadError) {
      if(isMultiple) {
        return cb(null, response);
      } else {
        if (isSelect) {
          cb(null, response);
        }
      }
    }
  }
  
  function handleError(err) {
    hadError = true;
    cb(new AppError(err, objMaria.msgStrings.queryExecution, {}));    
    if (closeConn) {
      objMaria.pool.release(clientObj);
    }
  }
}

function initMultipleResObj(response, qCnt) {
  if(response[qCnt]) {
    return response;
  }
  response[qCnt] = {};
  response[qCnt].data = [];
  response[qCnt].info = {};
  response[qCnt].err = false;
  return response;
}


/***
 * This method is called by the Pooling handler. 
 */
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