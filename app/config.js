/* global __CONFIG__ */
var DBConfig = require(__dirname + '/db-config.js');
var NetworkUtils = require(__dirname + '/lib/helpers/network-utils');

var config = module.exports;

// get the environment variables
var isProduction = (process.env.NODE_ENV === 'production') ? true : false;
var logDir = process.env.OSM_LOG_DIR || (__dirname + '/../logs/');
var networkInterfaceName = process.env.OSM_NETWORK_INTERFACE || 'eth0';
var port = process.env.OSM_HTTP_PORT || 3000;
var httpsPort = process.env.OSM_HTTPS_PORT || 443;
var emailsToSend = process.env.OSM_SUPPORT_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var debugSupportMails = process.env.OSM_DEBUG_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var slogerrUrl = process.env.OSM_LOGGER_URL || 'http://log.osmosys.asia/api/log/WriteLog1';
var slogerrAppID = process.env.OSM_LOGGER_API_ID || '551a6f48-e2c4-45aa-80e5-1de45a0bc003';
var isClusterDisabled = (process.env.OSM_CLUSTER_DISABLED === "true") ? true : false;
var isHttps = (process.env.OSM_HTTPS_ENABLED === "true") ? true : false;
var emailServer = process.env.OSM_EMAIL_SERVER || 'mail.osmosys.asia';
var emailPort = process.env.OSM_EMAIL_PORT || 587;
var emailUsername = process.env.OSM_EMAIL_USERNAME || 'emanate@osmosys.asia';
var emailPassword = process.env.OSM_EMAIL_PASSWORD || 'Emanat3!1';
var emailFromName = process.env.OSM_EMAIL_FROM_NAME || 'The Emanate Wireless Team';
var emailMaxCon = process.env.OSM_EMAIL_MAX_CON || 5;
var emailMaxMsgPerCon = process.env.OSM_EMAIL_MAX_MSG_PER_CON || 20;
var emailsToSend = process.env.OSM_SUPPORT_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var debugSupportMails = process.env.OSM_DEBUG_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var isEmailSecure = (process.env.OSM_SECURE_EMAIL === "true") ? true : false;

// get the ip-address associated with the configured network interface name
var ipAddress = NetworkUtils.getIpAddressForNetworkInterface(networkInterfaceName) || 'localhost';

// set the api base url's for the http and https interfaces
var app_http_base_url = process.env.OSM_API_HTTP_BASE_URL || 'http://' + ipAddress + ':' + port;
var app_https_base_url = process.env.OSM_API_HTTPS_BASE_URL || 'https://' + ipAddress + ':' + httpsPort;

// validate and format the environment variable settings if needed
if (logDir.slice(-1) != "/") {
  logDir = logDir + "/";
}
if (app_http_base_url.slice(-1) != "/") {
  app_http_base_url = app_http_base_url + "/";
}
if (app_https_base_url.slice(-1) != "/") {
  app_https_base_url = app_https_base_url + "/";
}

global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path': __dirname + '/code/',
  'app_lib_path' : __dirname + '/lib/',
  'app_helper_path' : __dirname + '/lib/helpers/',
  'app_base_url': '/api/v1/',  
  'app_http_base_url': (isHttps) ? app_https_base_url : app_http_base_url,
  'app_transaction_prop': 'transactionID',
  'enable_compression': true,  
  'log_folder_path': logDir,  
  'is_https': isHttps,
  'is_cluster_disabled': isClusterDisabled,
  'email': {
    'server': emailServer,
    'username': emailUsername,
    'password': emailPassword,
    'port': emailPort,
    'from_name': emailFromName,
    'max_con': emailMaxCon,
    'max_msg_per_con': emailMaxMsgPerCon,
    'emails_to_send': emailsToSend,
    'debug_mails' : debugSupportMails,
    'secure': isEmailSecure
  },
  'user': {
    'default_password': 'cb8da6a0-776f-4f2e-acba-9055b7bcb3a5',
    'default_organization': 'an organization',
    'default_pass_encrypt_rounds': 10,
    'default_forgot_pass_time': 6, // hours
    'default_created_by': 'NodeJS'
  },        
  'date_format': 'MMMM Do YYYY, h:mm:ss a',  
  'log_txt_format': true,
  'token_length': 16,
  'fw_token_length': 16,  
  'files_folder_name': 'files',  
  'max_decimal_length': 2,       
  'log_to_slogger': false,
  'slogger_app_id': slogerrAppID,
  'slogger_url': slogerrUrl,
  'ex': [],  
  'default_timezone': 'America/New_York',    
  'log_performance_info': true,  
  'ssl_config': {
    'ssl_cert': 'ssl_https.pfx',
    'passphrase': 'password'
  },
  'cron_time' : 60000,
  'excluded_controllers' : []
};

__CONFIG__.is_production = isProduction;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;

/**
 * Returns the path the files folder
 */
__CONFIG__.getFilesFolderPath = function() {
  return __CONFIG__.app_base_path + '../' + __CONFIG__.files_folder_name + '/';
};

__CONFIG__.getUploadsFolderPath = function() {
  return __dirname + '/../uploads';
};

__CONFIG__.getLogsFolderPath = function() {
  return __CONFIG__.app_base_path + '../logs/';
};

config.express = {
  port: process.env.EXPRESS_PORT || port,
  ip: ipAddress,
  is_production: isProduction,
  http_port: httpsPort
};
