var sloggerConfig = {
  'url': __CONFIG__.slogerrUrl,
  'method': 'POST',
  'headers': {
    'content-type': 'application/json'
  },
  'data': {
    'LogMessage': '',
    'StackTrace': '',
    'User': 'Osmosys',
    'Customer': 'Emanate Wireless',
    'PageOrModuleName': '',
    'Application': __CONFIG__.slogger_app_id,
    'Subscription': null,
    'Reserve1': null,
    'Reserve2': null,
    'Reserve3': null,
    'Reserve4': null,
    'LogType': 0,
    'Severity': 1
  }
};

module.exports = sloggerConfig;
