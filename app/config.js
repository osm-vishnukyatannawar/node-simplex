/* global __CONFIG__ */
var dbConfig = require(__dirname + '/db-config.js');
var networkUtils = require('./lib/network-utils');

var config = module.exports;

// get the environment variables
var isProduction = (process.env.NODE_ENV === 'production') ? true : false;
var logDir = process.env.EMANATE_LOG_DIR || (__dirname + '/../logs/');
var networkInterfaceName = process.env.EMANATE_NETWORK_INTERFACE || 'eth0';
var port = process.env.EMANATE_HTTP_PORT || 80;
var httpsPort = process.env.EMANATE_HTTPS_PORT || 443;
var emailsToSend = process.env.EMANATE_SUPPORT_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var debugSupportMails = process.env.EMANATE_DEBUG_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var slogerrUrl = process.env.EMANATE_LOGGER_URL || 'http://log.osmosys.asia/api/log/WriteLog1';
var slogerrAppID = process.env.EMANATE_LOGGER_API_ID || '551a6f48-e2c4-45aa-80e5-1de45a0bc003';
var isClusterDisabled = (process.env.EMANATE_CLUSTER_DISABLED === "true") ? true : false;
var isHttps = (process.env.EMANATE_HTTPS_DISABLED === "true") ? false : true;
var emailServer = process.env.EMANATE_EMAIL_SERVER || 'mail.osmosys.asia';
var emailPort = process.env.EMANATE_EMAIL_PORT || 587;
var emailUsername = process.env.EMANATE_EMAIL_USERNAME || 'emanate@osmosys.asia';
var emailPassword = process.env.EMANATE_EMAIL_PASSWORD || 'Emanat3!1';
var emailFromName = process.env.EMANATE_EMAIL_FROM_NAME || 'The Emanate Wireless Team';
var emailMaxCon = process.env.EMANATE_EMAIL_MAX_CON || 5;
var emailMaxMsgPerCon = process.env.EMANATE_EMAIL_MAX_MSG_PER_CON || 20;
var emailsToSend = process.env.EMANATE_SUPPORT_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var debugSupportMails = process.env.EMANATE_DEBUG_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
var isEmailSecure = (process.env.EMANATE_SECURE_EMAIL === "true") ? true : false;

// get the ip-address associated with the configured network interface name
var ipAddress = networkUtils.getIpAddressForNetworkInterface(networkInterfaceName) || '127.0.0.1';

// set the api base url's for the http and https interfaces
var app_http_base_url = process.env.EMANATE_API_HTTP_BASE_URL || 'http://' + ipAddress + ':' + port;
var app_https_base_url = process.env.EMANATE_API_HTTPS_BASE_URL || 'https://' + ipAddress + ':' + httpsPort;

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
  'app_base_url': '/api/v1/',
  'app_base_url_token': '/api/v1/:token/',
  'app_http_base_url': (isHttps) ? app_https_base_url : app_http_base_url,
  'app_transaction_prop': 'transactionID',
  'enable_compression': true,
  'httpProtocol': 'http://',
  'log_folder_path': logDir,  
  'isHttps': isHttps,
  'isClusterDisabled': isClusterDisabled,
  'email': {
    'server': emailServer,
    'username': emailUsername,
    'password': emailPassword,
    'port': emailPort,
    'fromName': emailFromName,
    'maxCon': emailMaxCon,
    'maxMsgPerCon': emailMaxMsgPerCon,
    'emailsToSend': emailsToSend,
    'debugMails' : debugSupportMails,
    'secure': isEmailSecure
  },
  'user': {
    'default_password': 'cb8da6a0-776f-4f2e-acba-9055b7bcb3a5',
    'default_organization': 'an organization',
    'default_pass_encrypt_rounds': 10,
    'default_forgot_pass_time': 6, // hours
    'default_created_by': 'NodeJS'
  },      
  'currentSampleTime': 5, // in minutes
  'dateFormat': 'MMMM Do YYYY, h:mm:ss a',  
  'logTxtFormat': true,
  'tokenLength': 16,
  'fwTokenLength': 16,  
  'filesFolderName': 'files',  
  'maxDecimalLength': 2,       
  'logToSlogerr': false,
  'slogerrAppID': slogerrAppID,
  'slogerrUrl': slogerrUrl,
  'excludedControllers': [],  
  'default_timezone': 'America/New_York',    
  'logPerformanceInfo': true,  
  'sslConfig': {
    'sslCert': 'ssl_https.pfx',
    'passphrase': 'password'
  }
};

__CONFIG__.isProduction = isProduction;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;

/**
 * Returns the path the files folder
 */
__CONFIG__.getFilesFolderPath = function() {
  return __CONFIG__.app_base_path + '../' + __CONFIG__.filesFolderName + '/';
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
  isProduction: isProduction,
  httpsPort: httpsPort
};
