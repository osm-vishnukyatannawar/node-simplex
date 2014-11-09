var dbConfig = {
  'mariadb': {
    name : 'mariadb',
    maxConn : 60,
    minConn : 2,
    idleTimeout : 30000,
    host: 'localhost',
    user: 'root',
    password: 'B3stPr@c',
    db: 'dev_emanate_db',
    connTimeout: 10,
  }  
};

module.exports = dbConfig;