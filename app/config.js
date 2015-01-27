var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === 'production';
global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path': __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token': '/api/v1/:token/',
  'app_http_base_url': 'http://10.0.0.15:3000/',
  'app_transaction_prop': 'transactionID',
  'email': {
    'server': 'mail.osmosys.asia',
    'username': 'emanate@osmosys.asia',
    'password': 'Emanat3!1',
    'port': 587,
    'fromName': 'Emanate Wireless',
    'maxCon': 5,
    'maxMsgPerCon': 20,
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
    'baseVersionFolderName': 'Powerpath_FW_version_'
  },
  'tagConfigDefaults': {
    'minMaintIntervalSec': 0,
    'minMaintLowBattSec': 0,
    'unPluggedAction': '',
    'ccxVendorID': 0,
    'ccxChannels': '',
    'ccxBatteryReport': 1,
    'ccxReportEnable_t': 0,
    'wifiNumPktsperChan': 3,
    'wifiTxPowerdBm': 12,
    'accelEnable': 0,
    'accelMotionTimeSec': 1,
    'irEnable': 0,
    'lfEnable': 0,
    'tamperDetEnable': 0,
    'pktSpacingMs': 120,
    'currentMeasEn': 0,
    'maxCurrentSamples': 100,
    'histConfigEnable': 0,
    'histThresh1': 100,
    'histThresh2': 100,
    'histThresh3': 100,
    'maxPimCurrentSamples': 100,
    'versionNum': 1
  },
  'wifiParams': {
    'serverURL': '',
    'numDnsServer': 1,
    'dnsIpAddress': '',
    'networkSSID': '',
    'passphrase': '',
    'networkSecurity': 1,
    'addrType': 1
  },
  'calibration': {
    'allRecordsCsvFileName': 'allRows.csv',
    'failureRecordsFileName': 'failureRecords.csv',
    'exportCsvFileDownloadName': 'EmanateDevices.csv',
    'unExportedLogFileName': 'UnexportedDevicesLog.csv'
  },
  'tags': {
    'tagsCsvFileName': 'EmanateTags.csv'
  },
  'lookup': {
    'powerPathAssetType': 'powerPathAssetType'
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

__CONFIG__.email.baseURL = __CONFIG__.app_http_base_url;
__CONFIG__.app_api_url = __CONFIG__.app_http_base_url.replace(/\/+$/, '') + __CONFIG__.app_base_url;

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '10.0.0.15',
  isProduction: PRODUCTION
};