var config = module.exports;
var PRODUCTION = false;

global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path' : __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token': '/api/v1/:token/',
  'app_http_base_url': 'http://10.0.0.159:3000/',
  'app_transaction_prop': 'transactionID',
  'email': {
    'server': 'mail.osmosys.asia',
    'username': 'emanate@osmosys.asia',
    'password': 'Emanat3!1',
    'port': 587,
    'fromName': 'Emanate Wireless',
    'maxCon': 5,
    'maxMsgPerCon': 20,
    'emailsToSend': 'vamsi.m@osmosys.asia'
  },
  'maintenance' : {
    'run_maria_on_main' : true,
    'max_tries' : 2,
    'default_value_tag_sn': '999',
    'default_value_org': '999',
    'default_value_type': 99
  },
  'user' : {
    'default_password' : 'cb8da6a0-776f-4f2e-acba-9055b7bcb3a5',
    'default_organization' : 'an organization', 
	'default_pass_encrypt_rounds' : 10,		
	'default_forgot_pass_time' : 6,	// hours
	'default_created_by' : 'NodeJS'
  },
  'firmware': {
    'folder': 'firmwares',
    'baseFirmwareFileStrs': {
      'ble_fw_version': 'PowerPath_BLE_FW_',
      'wifi_fw_version': 'PowerPath_WIFI_FW_',
      'host_fw_version': 'PowerPath_HOST_FW_'
    },
    'firmwareFileExtension': '.bin',
    'baseVersionFolderName': 'Powerpath_FW_version_'
    
  },
  'organizationBleConfig': {
	  'bleEnable': 0,
	  'bleGapRoleMinConnIntervalms': 10,
	  'bleGapRoleMaxConnIntervalms': 10,
	  'bleGapRoleSlaveLatency': 9,
	  'bleLimitedAdvertOnTimeSec': 120,
	  'bleLimitedAdvertIntervalTimems': 1000,
	  'bleGeneralAdvertIntervalTimems': 3000,
	  'bleLowBattAdvertIntervalTimems': 5000,
	  'bleDesiredConnectionTimeoutms': 1000,
	  'advertOffTimems': 300,
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
	  'batteryThreshCriticalAlert': 3
  },
  'calibration': {
    'allRecordsCsvFileName': 'allRows.csv',
    'failureRecordsFileName': 'failureRecords.csv',
    'exportCsvFileDownloadName': 'PowerPathDevices.csv',
    'unExportedLogFileName': 'UnexportedDevicesLog.csv'
  },
  'pim' : {
    'pimCsvFileName' : 'PowerPathPIM.csv'
  },
  'tags': {
    'tagsCsvFileName': 'PowerPathTags.csv',
    'defaultSerialNumber' : 'DEFAULT-',
    'factorySerialNumber' : '0000000000',
    'factoryOrgId': '0000000000'
  },
  'currentSampleTime': 5, // in minutes
  'maintMajorError' : 'POWERPATH_MAINT_MAJOR_ERROR' ,
  'maintMinorError' : 'POWERPATH_MAINT_MINOR_ERROR',
  'dateFormat' : 'MMMM Do YYYY, h:mm:ss a',
  'lookup': {
    'powerPathAssetType': 'powerPathAssetType'
  },
  'tagDebugLog' : {
	  'writenFileName' : 'tagDebugLog.txt',
	  'downloadFileName' : 'PowerPathDebugLog.txt',
	  'debugFolderName' : 'debugLog'
  },
  'tokenLength': 16,
  'fwTokenLength': 16,
  'firmwareFileExtension': '.zip',
  'filesFolderName': 'files',
  'maxDecimalLength': 2,
  'logs': [{
    'key' : '1',
    'value' : 'dev_col_import'
  }, {
    'key' : '2',
    'value' : 'dev_col_export'
  }]
};

__CONFIG__.isProduction = PRODUCTION;
__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;
__CONFIG__.app_api_maint_url = __CONFIG__.app_api_url + 'tag/maintenance';

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '10.0.0.159',
  isProduction: PRODUCTION
};
