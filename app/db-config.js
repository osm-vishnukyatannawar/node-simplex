var dbConfig = {
  'mariadb': {
    name: 'mariadb',
    maxConn: 40,
    minConn: 20,
    idleTimeout: 30000,
    host: '10.0.0.66',
    user: 'osmosys',
    password: 'Change123',
    db: 'dev_emanate_db',
    connTimeout: 15,
    multiStatements: true
  },
  'cassandradb': {
    name: 'cassandradb',
    host: '10.0.0.66',
    keyspace: 'emanate',
    connTimeout: 10,
  }
};

module.exports = dbConfig;
