var dbConfig = require(__dirname + '/db-config.js');

var config = module.exports;

var PRODUCTION = process.env.NODE_ENV;
var isStaging = process.env.NODE_ENV_STAGING;

var emailsToSend = 'abijeet.p@osmosys.asia';
var app_http_base_url = 'http://10.0.0.15:3000/';
var ipAddress = '10.0.0.15';
var port = 3000;
var slogerrAppID = '551a6f48-e2c4-45aa-80e5-1de45a0bc003';

if (PRODUCTION === 'production') {
  if (isStaging === 'true') {
    app_http_base_url = 'http://staging.emanate.osmosys.in:8888/';
    ipAddress = '10.0.0.6';
    port = 80;
    slogerrAppID = '551a6f94-8a50-4c47-bae6-1de45a0bc003';
  } else {
    emailsToSend = 'support.emanate@osmosys.asia';
    app_http_base_url = 'http://cloud.emanatewireless.com/';
    ipAddress = '167.114.117.212';
    port = 80;
    slogerrAppID = '551a6fda-8ed4-4723-8af6-1de45a0bc003';
  }
  PRODUCTION = true;
} else {
  PRODUCTION = false;
}

global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path': __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token': '/api/v1/:token/',
  'app_http_base_url': app_http_base_url,
  'app_transaction_prop': 'transactionID',
  'httpProtocol' : 'http://',
  'email': {
    'server': 'mail.osmosys.asia',
    'username': 'emanate@osmosys.asia',
    'password': 'Emanat3!1',
    'port': 587,
    'fromName': 'The Emanate Wireless Team',
    'maxCon': 5,
    'maxMsgPerCon': 20,
    'emailsToSend': emailsToSend
  },
  'maintenance': {
    'run_maria_on_main': true,
    'max_tries': 2,
    'default_value_tag_sn': '999',
    'default_value_org': '999',
    'default_value_type': 99,
    'necessary_tag_events': {
      'POWERPATH_INFO': '',
      'POWERPATH_REPORT_USD_DEBUG_DATA': '',
      'POWERPATH_REPORT_CURRENT_UTIL_DATA': '',
      'POWERPATH_SEND_DEBUG_LOG': '',
      'POWERPATH_REPORT_HIST_DATA': ''
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
    'maxFileSizeMB': 2,
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
    'baseVersionFolderName': 'Powerpath_FW_version_'

  },
  'organizationBleConfig': {
    'bleEnable': 1,
    'bleGapRoleMinConnIntervalms': 8,
    'bleGapRoleMaxConnIntervalms': 8,
    'bleGapRoleSlaveLatency': 9,
    'bleLimitedAdvertOnTimeSec': 120,
    'bleLimitedAdvertIntervalTimems': 1600,
    'bleGeneralAdvertIntervalTimems': 1600,
    'bleLowBattAdvertIntervalTimems': 1600,
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
    'macTwoBytes' : '00:50'
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
    'tag_maint_activate': 'POWERPATH_MAINT_ACTIVATED'
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
    'tagDebugLogTxt': 'tag-debug-log.txt'
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
  },
  'clientSideDateFormat': 'YYYY-MM-DD',
  'clientSideDateTimeFormat': 'YYYY-MM-DD HH:mm',
  'limitString': ' LIMIT 0,5',
  'logToSlogerr' : true,
  'slogerrAppID' : slogerrAppID,
  'excludedControllers' : [],
  'non_super_user_pending_events' : ['POWERPATH_MAINT_CALL',	'POWERPATH_REPORT_CURRENT_UTIL_DATA', 
    'POWERPATH_UPDATE_CONFIG_PARAM', 'POWERPATH_UPDATE_BLE_FIRMWARE', 'POWERPATH_UPDATE_WIFI_FIRMWARE',
    'POWERPATH_NO_COMMANDS', 'POWERPATH_TAG_NOT_COMMISSIONED', 'POWERPATH_UPDATE_MCU_FIRMWARE']
};

__CONFIG__.isProduction = PRODUCTION;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;
__CONFIG__.app_api_maint_url = __CONFIG__.app_api_url + 'tag/maintenance';
__CONFIG__.cassandra_keyspace = dbConfig.cassandradb.keyspace;

// Adding the URLs to the necessary tag events sections.
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_INFO'] = __CONFIG__.app_api_maint_url;
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_REPORT_CURRENT_UTIL_DATA'] = __CONFIG__.app_api_maint_url;
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_SEND_DEBUG_LOG'] = __CONFIG__.app_api_url + 'log/debug';
__CONFIG__.maintenance.necessary_tag_events['POWERPATH_REPORT_HIST_DATA'] = __CONFIG__.app_api_url + 'log/histogram';
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
 * @param version
 */
__CONFIG__.getFirmwareFolderBasedOnVersion = function(version) {
  return __CONFIG__.getFirmwareFolderPath() + __CONFIG__.firmware.baseVersionFolderName + version + '/';
};

/**
 * Get the URL for based on version
 * @param version
 * @returns
 */
__CONFIG__.getFirmwareURLBasedOnVersion = function(version) {
  return __CONFIG__.email.baseURL + __CONFIG__.filesFolderName + __CONFIG__.firmware.folder
    + __CONFIG__.firmware.baseVersionFolderName + version;
};

__CONFIG__.getUploadsFolderPath = function() {
  return __dirname + '/../uploads';
};

config.express = {
  port: process.env.EXPRESS_PORT || port,
  ip: ipAddress,
  isProduction: PRODUCTION
};
