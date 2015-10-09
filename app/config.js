/* global __CONFIG__ */
var dbConfig = require(__dirname + '/db-config.js');
var networkUtils = require('./network-utils');

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
var compareFirmwareVersions = (process.env.EMANATE_COMPARE_FIRMWARE_VERSIONS === "true") ? true : false;

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
  'package_file_path': __dirname + '/../package.json',
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
  'maintenance': {
    'run_maria_on_main': true,
    'max_tries': 5,
    'max_records': 20,
    'default_value_tag_sn': '999',
    'default_value_org': '999',
    'default_value_type': 99,
    'current_sp_time': '0 */1 * * *',
    'sync_time': '*/5 * * * *',
    'necessary_tag_events': {
      'POWERPATH_INFO': '',
      'POWERPATH_REPORT_CURRENT_UTIL_DATA': '',
      'POWERPATH_SEND_DEBUG_LOG': '',
    }
  },
  'user': {
    'default_password': 'cb8da6a0-776f-4f2e-acba-9055b7bcb3a5',
    'default_organization': 'an organization',
    'default_pass_encrypt_rounds': 10,
    'default_forgot_pass_time': 6, // hours
    'default_created_by': 'NodeJS'
  },
  'firmware': {
    'folder': 'firmwares',
    'maxFileSizeMB': 2097152,
    'baseFirmwareFileStrs': {
      'ble_fw_version': 'PowerPath_BLE_FW_',
      'wifi_fw_version': 'PowerPath_WIFI_FW_',
      'host_fw_version': 'PowerPath_HOST_FW_'
    },
    'firmwareFileExtension': {
      'ble_fw_version': '.bin',
      'wifi_fw_version': '.bin',
      'host_fw_version': '.bin'
    },
    'baseVersionFolderName': 'Powerpath_FW_version_',
    'compareFirmwareVersions' : compareFirmwareVersions
  },
  'organizationBleConfig': {
    'bleEnable': 1,
    'bleGapRoleMinConnIntervalms': 8,
    'bleGapRoleMaxConnIntervalms': 8,
    'bleGapRoleSlaveLatency': 0,
    'bleLimitedAdvertOnTimeSec': 120,
    'bleLimitedAdvertIntervalTimems': 1600,
    'bleGeneralAdvertIntervalTimems': 1520,
    'bleLowBattAdvertIntervalTimems': 1520,
    'bleDesiredConnectionTimeoutms': 1000,
    'advertOffTimems': 0,
    'blePasskey': 19655
  },
  'organizationFindParams': {
    'buzzerFreqHz': 40,
    'buzzerOnTime_msec': 100,
    'buzzerOffTime_msec': 100,
    'buzzerCnt': 1000,
    'ledOnTime_msec': 100,
    'ledOffTime_msec': 100,
    'ledCnt': 1000
  },
  'organizationBatteryConfig': {
    'batteryRechargeLevelPercent': 5,
    'batteryChargeLevelPercent': 90,
    'batteryThreshLowAlert': 10,
    'batteryThreshCriticalAlert': 3,
  },
  'calibration': {
    'allRecordsCsvFileName': 'all-rows.csv',
    'failureRecordsFileName': 'failure-records.csv',
    'exportCsvFileDownloadName': 'powerpath-calibration-dev.csv',
    'unExportedLogFileName': 'unexported-dev-log.csv',
  },
  'pim': {
    'pimCsvFileName': 'PowerPathPIM.csv',
  },
  'tags': {
    'tagsCsvFileName': 'PowerPathTags.csv',
    'defaultSerialNumber': 'DEFAULT-',
    'factorySerialNumber': '0000000000',
    'factoryOrgId': '0000000000',
    'macTwoBytes': '00:50',
    'assetIDMaxLength': 16,
    'tagSNDisplayLength': 10,
    'maxMaintLowBatterySec': 86400
  },
  'currentSampleTime': 5, // in minutes
  'dateFormat': 'MMMM Do YYYY, h:mm:ss a',
  'lookup': {
    'powerpath_asset_type': 'powerPathAssetType',
    'powerpath_ccx_maint_reason': 'powerPathCCXMaintReason',
    'powerpath_cmds': 'powerPathCmds',
    'powerpath_config_state': 'powerPathConfigState',
    'powerpath_default_values': 'powerPathDefaultValues',
    'powerpath_hardware_options': 'powerPathHardwareOptions',
    'powerpath_hist_reset': 'powerPathHistReset',
    'powerpath_pim_trig': 'powerPathPimTrig',
    'powerpath_reg_domain': 'powerPathRegDomain',
    'powerpath_system_events': 'powerPathSystemEvents',
    'powerpath_usage_info': 'powerPathUsageInfo',
  },
  'events': {
    'maint_error': 'POWERPATH_MAINT_MAJOR_ERROR',
    'minor_error': 'POWERPATH_MAINT_MINOR_ERROR',
    'tag_info': 'POWERPATH_INFO',
    'tag_update_config': 'POWERPATH_UPDATE_CONFIG_PARAM',
    'tag_not_commissioned': 'POWERPATH_TAG_NOT_COMMISSIONED',
    'tag_maintenance': 'POWERPATH_MAINT_CALL',
    'tag_maint_activate': 'POWERPATH_MAINT_ACTIVATED',
    'tag_no_commands': 'POWERPATH_NO_COMMANDS',
    'tag_maint_reboot': 'POWERPATH_MAINT_REBOOT',
    'tag_firmware_upgrade': 'POWERPATH_MAINT_FIRMWARE_UPGRADE'
  },
  'tagDebugLog': {
    'writenFileName': 'tag-debug-log.txt',
    'downloadFileName': 'powerpath-debug-log.txt',
    'debugFolderName': 'debugLog',
  },
  'tag_status': {
    'not_commissioned': 0,
    'not_configured': 1,
    'configured': 2
  },
  'tagBlobFiles': {
    'tagDebugLog': 'tag-debug-log.csv',
    'tagUSDDebug': 'tag-usd-debug.csv',
    'tagHistogram': 'tag-histogram.csv',
    'tagCurrUtil': 'tag-current-util.csv',
    'tagDebugLogTxt': 'tag-debug-log.txt',
    'tagBatteryStatus': 'tag-battery-status.csv'
  },
  'logTxtFormat': true,
  'tokenLength': 16,
  'fwTokenLength': 16,
  'firmwareFileExtension': '.zip',
  'filesFolderName': 'files',
  'tagBlobFileName': 'tag-blob-data.csv',
  'maxDecimalLength': 2,
  'reportProblemFolder': 'report_problem',
  'logs': [{
    'key': '1',
    'value': 'dev_col_import'
  }, {
    'key': '2',
    'value': 'dev_col_export'
  }],
  'storedProcedures': {
    'currentDataProcess': 'sp_process_current_data',
    'tagAvgProcess': 'sp_averages_tag',
    'utilPercentGraph': 'sp_utilization_percent_graph'
  },
  'iphoneConfigFileName': 'iphone-config.json',
  'clientSideDateFormat': 'YYYY-MM-DD',
  'clientSideDateTimeFormat': 'YYYY-MM-DD HH:mm',
  'clientDisplayDateTimeFormat': 'MMM DD, YYYY HH:mm:ss',
  'limitString': ' LIMIT 0,5',
  'logToSlogerr': false,
  'slogerrAppID': slogerrAppID,
  'slogerrUrl': slogerrUrl,
  'excludedControllers': [],
  'non_super_user_pending_events': ['POWERPATH_MAINT_CALL',
    'POWERPATH_REPORT_CURRENT_UTIL_DATA', 'POWERPATH_UPDATE_CONFIG_PARAM',
    'POWERPATH_UPDATE_BLE_FIRMWARE', 'POWERPATH_UPDATE_WIFI_FIRMWARE',
    'POWERPATH_NO_COMMANDS', 'POWERPATH_TAG_NOT_COMMISSIONED',
    'POWERPATH_UPDATE_MCU_FIRMWARE'
  ],
  'default_timezone': 'America/New_York',
  'tagTimePadding': 1000,
  'cs_keyspace': 'emanate',
  'logPerformanceInfo': true,
  'maintInfoFileName': 'tag_maintenance_info.csv',
  'logDebugDataLogs': true,
  'debugDataLogFileName': 'tag_debug_data_log.txt',
  'tag_type_of_data': {
    1: 'POWERPATH_MAINT_CALL',
    2: 'POWERPATH_REPORT_HIST_DATA',
    4: 'POWERPATH_REPORT_CURRENT_UTIL_DATA',
    5: 'POWERPATH_INFO',
    6: 'POWERPATH_UPDATE_CONFIG_PARAM',
    9: 'POWERPATH_SEND_DEBUG_LOG',
    16: 'POWERPATH_REPORT_USD_DEBUG_DATA'
  },
  'firmware_pending_events': {
    7: 'POWERPATH_UPDATE_BLE_FIRMWARE',
    11: 'POWERPATH_UPDATE_WIFI_FIRMWARE',
    15: 'POWERPATH_UPDATE_MCU_FIRMWARE' 
  },
  'tagMaintReasons': {
    'POWERPATH_MAINT_MAJOR_ERROR' : {
      'displayValue' : 'Major Error',
      'mailSubject' : 'Problem reported by tag'
    },
    'POWERPATH_MAINT_MINOR_ERROR' : {
      'displayValue' : 'Minor Error',
      'mailSubject' : 'Problem reported by tag'
    },
    'POWERPATH_MAINT_REBOOT' : {
      'displayValue' : 'Reboot',
      'mailSubject' : 'Information about tag reboot'
    }
  },
  'perDayCount': {
    'week': 48,
    'month': 360,
    'year': 365
  },
  'sslConfig': {
    'sslCert': 'ssl_https.pfx',
    'passphrase': 'password'
  }
};

__CONFIG__.isProduction = isProduction;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;
__CONFIG__.app_api_maint_url = __CONFIG__.app_api_url + 'tag/maintenance';
__CONFIG__.cassandra_keyspace = dbConfig.cassandradb.keyspace;

// Adding the URLs to the necessary tag events sections.
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_INFO'] = __CONFIG__.app_api_maint_url;
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_REPORT_CURRENT_UTIL_DATA'] = __CONFIG__.app_api_maint_url;
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_SEND_DEBUG_LOG'] = __CONFIG__.app_api_url + 'log/debug';
//__CONFIG__.maintenance.necessary_tag_events['POWERPATH_REPORT_HIST_DATA'] = __CONFIG__.app_api_url + 'log/histogram';
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_REPORT_USD_DEBUG_DATA'] = __CONFIG__.app_api_url + 'log/usd';


// Functions to retrieve filenames/URLS

/**
 * Returns the path the files folder
 */
__CONFIG__.getFilesFolderPath = function() {
  return __CONFIG__.app_base_path + '../' + __CONFIG__.filesFolderName + '/';
};

/**
 * Returns the path to the firmware folder
 */
__CONFIG__.getFirmwareFolderPath = function() {
  return __CONFIG__.getFilesFolderPath() + __CONFIG__.firmware.folder + '/';
};

/**
 * Returns folder name for firmware based on version
 *
 * @param version
 */
__CONFIG__.getFirmwareFolderBasedOnVersion = function(version) {
  return __CONFIG__.getFirmwareFolderPath() + __CONFIG__.firmware.baseVersionFolderName + version + '/';
};

/**
 * Get the URL for based on version
 *
 * @param version
 * @returns
 */
__CONFIG__.getFirmwareURLBasedOnVersion = function(version) {
  return __CONFIG__.app_api_url + 'firmware/' + version;
};

__CONFIG__.getUploadsFolderPath = function() {
  return __dirname + '/../uploads';
};

__CONFIG__.getLogsFolderPath = function() {
  return __CONFIG__.app_base_path + '../logs/';
};

__CONFIG__.getBLEFirmwareURL = function(overallVersion, bleVersion, tagSN) {
  var baseURL = __CONFIG__.getFirmwareURLBasedOnVersion(overallVersion);
  if(!tagSN) {
    return baseURL + '/ble/' + bleVersion; 
  } else {
    return baseURL + '/ble/' + bleVersion + '?tagSN=' + tagSN + '&type=7';
  }
}

__CONFIG__.getHostFirmwareURL = function(overallVersion, mcuVersion, tagSN) {
  var baseURL = __CONFIG__.getFirmwareURLBasedOnVersion(overallVersion);
  if(!tagSN) {
    return baseURL + '/host/' + mcuVersion; 
  } else {
    return baseURL + '/host/' + mcuVersion + '?tagSN=' + tagSN + '&type=15';
  }
}

__CONFIG__.getWIFIFirmwareURL = function(overallVersion, wifiVersion, tagSN) {
  var baseURL = __CONFIG__.getFirmwareURLBasedOnVersion(overallVersion);
  if(!tagSN) {
    return baseURL + '/wifi/' + wifiVersion;
  } else {
    return baseURL + '/wifi/' + wifiVersion + '?tagSN=' + tagSN + '&type=11';
  }
}

config.express = {
  port: process.env.EXPRESS_PORT || port,
  ip: ipAddress,
  isProduction: isProduction,
  httpsPort: httpsPort
};
