var dbConfig = require(__dirname + '/db-config.js');

var config = module.exports;

var PRODUCTION = process.env.NODE_ENV;
var isStaging = process.env.NODE_ENV_STAGING;

var emailsToSend = 'surendra.b@osmosys.asia';
var app_http_base_url = 'http://10.0.0.247:3000/';
var ipAddress = '10.0.0.247';
var port = 3000;

if (PRODUCTION === 'production') {
  if (isStaging === 'true') {
    app_http_base_url = 'http://staging.emanate.osmosys.in:8888/';
    ipAddress = '10.0.0.6';
    port = 80;
  } else {
    emailsToSend = 'support.emanate@osmosys.asia';
    app_http_base_url = 'http://cloud.emanatewireless.com/';
    ipAddress = '167.114.117.212';
    port = 80;
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
    'factoryOrgId': '0000000000'
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
  'limitString': ' LIMIT 0,5'
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

config.express = {
  port: process.env.EXPRESS_PORT || port,
  ip: ipAddress,
  isProduction: PRODUCTION
};
