'use strict';

// Third party modules
const path = require('path');

// Osm includes
const NetworkUtils = require(path.join(__dirname, 'lib/helpers/network-utils'));

var config = module.exports;

// get the environment variables
const isProduction = (process.env.NODE_ENV === 'production');
let logDir = process.env.OSM_LOG_DIR || path.join(__dirname, '../logs/');
const networkInterfaceName = process.env.OSM_NETWORK_INTERFACE || 'eth0';
const port = process.env.OSM_HTTP_PORT || 3000;
const httpsPort = process.env.OSM_HTTPS_PORT || 443;
const emailsToSend = process.env.OSM_SUPPORT_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
const debugSupportMails = process.env.OSM_DEBUG_EMAIL_ADDRS || 'surendra.b@osmosys.asia';
const slogerrUrl = process.env.OSM_LOGGER_URL || 'http://log.osmosys.asia/api/log/WriteLog1';
const slogerrAppID = process.env.OSM_LOGGER_API_ID || '551a6f48-e2c4-45aa-80e5-1de45a0bc003';
const isClusterDisabled = (process.env.OSM_CLUSTER_DISABLED === 'true');
const emailServer = process.env.OSM_EMAIL_SERVER || 'mail.osmosys.asia';
const emailPort = process.env.OSM_EMAIL_PORT || 587;
const emailUsername = process.env.OSM_EMAIL_USERNAME || 'admin@osmosys.asia';
const emailPassword = process.env.OSM_EMAIL_PASSWORD || 'admin';
const emailFromName = process.env.OSM_EMAIL_FROM_NAME || 'Osmosys';
const emailMaxCon = process.env.OSM_EMAIL_MAX_CON || 5;
const emailMaxMsgPerCon = process.env.OSM_EMAIL_MAX_MSG_PER_CON || 20;
const isEmailSecure = (process.env.OSM_SECURE_EMAIL === 'true');

// get the ip-address associated with the configured network interface name
const ipAddress = NetworkUtils.getIpAddressForNetworkInterface(networkInterfaceName) || 'localhost';

// set the api base url's for the http and https interfaces
let app_http_base_url = process.env.OSM_API_HTTP_BASE_URL || 'http://' + ipAddress + ':' + port;
let app_https_base_url = process.env.OSM_API_HTTPS_BASE_URL || 'https://' + ipAddress + ':' + httpsPort;

// validate and format the environment variable settings if needed
if (logDir.slice(-1) !== '/') {
  logDir = logDir + '/';
}
if (app_http_base_url.slice(-1) !== '/') {
  app_http_base_url = app_http_base_url + '/';
}
if (app_https_base_url.slice(-1) != '/') {
  app_https_base_url = app_https_base_url + '/';
}

global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path': path.join(__dirname, 'code/'),
  'app_lib_path': path.join(__dirname, 'lib/'),
  'app_helper_path': path.join(__dirname, 'lib/helpers/'),
  'app_base_url': '/api/v1/',
  'app_http_base_url': app_http_base_url,
  'app_transaction_prop': 'transactionID',
  'enable_compression': true,
  'log_folder_path': logDir,
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
    'debug_mails': debugSupportMails,
    'secure': isEmailSecure
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
  'cron_time': 60000,
  'excluded_controllers': []
};

__CONFIG__.is_production = isProduction;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;

/**
 * @desc Returns the path of files folder
 */
__CONFIG__.getFilesFolderPath = function () {
  return __CONFIG__.app_base_path + '../' + __CONFIG__.files_folder_name + '/';
};

/**
 * @desc Returns the path of uploads folder
 */
__CONFIG__.getUploadsFolderPath = function () {
  return path.join(__dirname, '../uploads');
};

/**
 * @desc Returns the path of logs folder
 */
__CONFIG__.getLogsFolderPath = function () {
  return path.join(__CONFIG__.app_base_path, '../logs/');
};

config.express = {
  port: process.env.EXPRESS_PORT || port,
  ip: ipAddress,
  is_production: isProduction,
  http_port: httpsPort
};
