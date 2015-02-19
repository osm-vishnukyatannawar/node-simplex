var dbConfig = {
  'mariadb': {
    name: 'mariadb',
    maxConn: 150,
    minConn: 35,
    idleTimeout: 30000,
    host: '10.0.0.66',
    user: 'osmosys',
    password: 'Change123',
    db: 'dev_emanate_db',
    connTimeout: 15,
    multiSelect: true
  },
  'cassandradb': {
    name: 'cassandradb',
    host: '10.0.0.66',
    keyspace: 'emanate',
    connTimeout: 10,
  }
};

module.exports = dbConfig;