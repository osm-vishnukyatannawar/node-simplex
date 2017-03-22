'use strict';
// Third party modules
const poolModule = require('generic-pool');
let poolsList = {};

let getPoolObj = function (objDbConfig) {
  let poolName = objDbConfig.name;
  if (!poolName) {
    // pool name is mandatory
    return;
  }
  if (poolsList.hasOwnProperty(poolName)) {
    return poolsList[poolName];
  }
  poolsList[poolName] = poolModule.Pool({
    name: poolName,
    create: function (callback) {
      objDbConfig.create(callback);
    },
    destroy: function (client) {
      objDbConfig.destroy(client);
    },
    max: objDbConfig.maxConn,
    min: objDbConfig.minConn,
    idleTimeoutMillis: objDbConfig.idleTimeout
  });
  return poolsList[poolName];
};

module.exports = getPoolObj;
