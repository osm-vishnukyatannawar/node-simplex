'use strict';

// get the environment variable settings
const mariadbHost = process.env.OSM_MARIADB_HOST || '10.0.0.66';
const mariadbUser = process.env.OSM_MARIADB_USER || 'osmosys';
const mariadbPassword = process.env.OSM_MARIADB_PASSWORD || 'Change123';
const mariadbDatabase = process.env.OSM_MARIADB_DATABASE || 'test_instance';

// define the database configuration
const dbConfig = {
  'mariadb': {
    name: 'mariadb',
    maxConn: 40,
    minConn: 20,
    idleTimeout: 30000,
    host: mariadbHost,
    user: mariadbUser,
    password: mariadbPassword,
    db: mariadbDatabase,
    connTimeout: 15,
    multiStatements: true
  }
};

module.exports = dbConfig;
