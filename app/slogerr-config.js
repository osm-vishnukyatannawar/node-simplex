var sloggerConfig = {
  'url' : 'http://log.osmosys.asia/api/log/WriteLog1',
  'method' : 'POST',
  'headers' : {'content-type' : 'application/json'},
  'data' : {
    'LogMessage' : '',
    'StackTrace' : '',
    'User' :  'Osmosys',
    'Customer' : 'Emanate Wireless',
    'PageOrModuleName' : '',
    'Application' : __CONFIG__.slogerrAppID,
    'Subscription' : null,
    'Reserve1' : null,
    'Reserve2' : null,
    'Reserve3' : null,
    'Reserve4' : null,
    'LogType' : 0,
    'Severity' : 1
  }
};

module.exports = sloggerConfig;
