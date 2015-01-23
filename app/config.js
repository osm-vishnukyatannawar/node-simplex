var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === 'production';
global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path': __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token': '/api/v1/:token/',
  'app_transaction_prop': 'transactionID',
  'email': {
    'server': 'mail.osmosys.asia',
    'username': 'emanate@osmosys.asia',
    'password': 'Emanat3!1',
    'port': 587,
    'fromName': 'Emanate Wireless',
    'maxCon': 5,
    'maxMsgPerCon': 20,
    'baseURL': 'http://10.0.0.15:3000/',
    'emailsToSend': 'abijeet.p@osmosys.asia'
  },
  'maintenance': {
    'run_maria_on_main': true,
    'max_tries': 2,
    'default_value_tag_sn': '999',
    'default_value_org': '999',
    'default_value_type': 99    
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
    'baseFirmwareFileStrs': {
      'ble_fw_version': 'PowerPath_BLE_FW_',
      'wifi_fw_version': 'PowerPath_WIFI_FW_',
      'host_fw_version': 'PowerPath_HOST_FW_'
    },
    'firmwareFileExtension': '.zip',
    'baseVersionFolderName' : 'Powerpath_FW_version_'
  },
  'calibration' :{
	  'allRecordsCsvFileName' : 'allRows.csv',
	  'failureRecordsFileName' : 'failureRecords.csv',
	  'exportCsvFileDownloadName' : 'EmanateDevices.csv',
	  'unExportedLogFileName' : 'UnexportedDevicesLog.csv'
  },
  'tags' : {
	'tagsCsvFileName' : 'EmanateTags.csv'  
  },
  'lookup' : {
	'powerPathAssetType' : 'powerPathAssetType'  
  },
  'tokenLength': 16,
  'fwTokenLength': 16,
  'firmwareFileExtension': '.zip',
  'filesFolderName' : 'files',
  'maxDecimalLength' : 2,
  'logs' : [{key:'1',value:'dev_col_import'},{key:'2',value:'dev_col_export'}]
};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: 'localhost',
  isProduction: PRODUCTION
};