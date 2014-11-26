var dbConfig = {
  'mariadb': {
    name : 'mariadb',
    maxConn : 60,
    minConn : 2,
    idleTimeout : 30000,
    host: '10.0.0.6',
    user: 'root',
    password: 'Maria123',
    db: 'dev_emanate_db',
    connTimeout: 10,
  },
  'cassandradb': {
	    name : 'cassandradb',
	    host: '10.0.0.6',
	    keyspace: 'emanate',
	    connTimeout: 10,
  } 
  
};

module.exports = dbConfig;
