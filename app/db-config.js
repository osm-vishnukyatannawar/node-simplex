var dbConfig = {
  'mariadb': {
    name: 'mariadb',
    maxConn: 40,
    minConn: 20,
    idleTimeout: 30000,
    host: 'localhost',
    user: 'root',
    password: 'B3stPr@c',
    db: 'dev_emanate_db',
    connTimeout: 15,
    multiStatements: true
  },
  'cassandradb': {
    name: 'cassandradb',
    host: 'localhost',
    keyspace: 'emanate',
    connTimeout: 10,
  }
};

module.exports = dbConfig;
