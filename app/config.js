var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
global.__CONFIG__ = {
  'app_base_path': __dirname + '/',
  'app_code_path' : __dirname + '/code/',
  'app_base_url': '/api/v1/',
  'app_base_url_token' : '/api/v1/:token/',
  'app_transaction_prop' : 'transactionID',
  'email' : {
    'server' : 'mail.osmosys.asia',
    'username' : 'emanate@osmosys.asia',    
    'password' : 'Emanat3!1',
    'port' : 587,
    'fromName' : 'Emanate Wireless',
    'maxCon' : 5,
    'maxMsgPerCon' : 20,
    'baseURL' : 'http://10.0.0.15:3000/',
    'emailsToSend' :'surendra.b@osmosys.asia'
  },
  'maintenance' : {
    'run_maria_on_main' : true,
    'max_tries' : 2,
    'default_value_tag_sn': '999',
    'default_value_org': '999',
    'default_value_type': 99,
    'max_tries' : 2
  },
  'user' : {
    'default_password' : 'cb8da6a0-776f-4f2e-acba-9055b7bcb3a5',
    'default_organization' : 'an organization', 
	'default_pass_encrypt_rounds' : 10,		
	'default_forgot_pass_time' : 6,	// hours
	'default_created_by' : 'NodeJS'
  },
  'tokenLength' : 16,
  'fwTokenLength' : 16,
  'baseFirmwareFileStrs' : {'bleFw'  :'PowerPath_BLE_FW_' , 
	  						'wifiFw' :'PowerPath_WIFI_FW_' , 
	  						'hostFw' :'PowerPath_HOST_FW_'} ,
  'firmwareFileExtension' : ".zip"
};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "10.0.0.44",
  isProduction : PRODUCTION
};
