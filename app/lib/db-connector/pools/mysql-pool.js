'use strict';

// Third party modules
const mSQLClient = require('mysql');

let pools = {};

// http://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling
// Checks if we have a pool with the current database, if so, fetches that connection.
let getConnection = function (config, callback) {
  if (!config || !config.database || !config.host) {
    return;
  }
  let currPoolName = getPoolName(config);
  if (!pools.hasOwnProperty(currPoolName)) {
    pools[currPoolName] = mSQLClient.createPool(config);
  }
  pools[currPoolName].getConnection(function (err, connection) {
    callback(err, connection);
  });
};

let getPoolName = function (config) {
  return config.database + '_' + config.host;
};

module.exports = getConnection;
