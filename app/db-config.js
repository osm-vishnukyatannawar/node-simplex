var dbConfig = {
  'mariadb': {
    name: 'mariadb',
    maxConn: 150,
    minConn: 35,
    idleTimeout: 30000,
    host: 'localhost',
    user: 'root',
    password: 'B3stPr@c',
    db: 'dev_emanate_db',
    connTimeout: 15,
    multiSelect: true
  },
  'cassandradb': {
	    name : 'cassandradb',
	    host: 'localhost',
	    keyspace: 'emanate',
	    connTimeout: 10,
  } 
};

module.exports = dbConfig;