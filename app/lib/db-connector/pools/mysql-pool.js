'use strict';

var mSQLClient = require('mysql');

var pools = {};

// http://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling
// Checks if we have a pool with the current database, if so, fetches that connection.
var getConnection = function(config, callback) {
  if (!config || !config.database || !config.host) {
    return;
  }
  var currPoolName = getPoolName(config);
  if (!pools.hasOwnProperty(currPoolName)) {
    pools[currPoolName] = mSQLClient.createPool(config);
  }
  pools[currPoolName].getConnection(function(err, connection) {
    callback(err, connection);
  });
};

var getPoolName = function(config) {
  return config.database + '_' + config.host;
};

module.exports = getConnection;
