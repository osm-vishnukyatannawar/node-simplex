var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path' : __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token' : '/api/v1/:token/',
  'app_transaction_prop' : 'transactionID',
  'email' : {
    'server' : 'mail.osmosys.asia',
    'username' : 'emanate@osmosys.asia',    
    'password' : 'Emanat3!1',
    'port' : 587,
    'fromName' : 'Emanate Wireless',
    'maxCon' : 5,
    'maxMsgPerCon' : 20
  }
};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "localhost",
  isProduction : PRODUCTION
};
