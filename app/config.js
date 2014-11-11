var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path' : __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token' : '/api/v1/:token/'
};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "localhost",
  isProduction : PRODUCTION
};