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
    'Application' : '551537eb-28a4-41b3-bc80-0e405a0bc003',
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
