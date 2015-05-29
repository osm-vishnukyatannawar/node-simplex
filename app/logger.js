var winston = require('winston');
var fs = require('fs');

var logger = (function() {
  var errLogger = new(winston.Logger)({
    transports: [new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/exceptions.log',
      timestamp: true,
      prettyPrint: false,
      json: false
    })],
    exceptionHandlers: [new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/exceptions.log',
      json: false,
      timestamp: true,
      prettyPrint: true,
    })],
    exitOnError: false
  });

  var infoLogger = new(winston.Logger)({
    transports: [new winston.transports.Console({
      json: false,
      timestamp: true
    }), new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/debug.log',
      json: false,
      timestamp: true
    })]
  });

  var maintLogger = new(winston.Logger)({
    transports: [new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/maintenance.log',
      json: false,
      timestamp: false,
      prettyPrint: true,
    })]
  });

  var logAppErrors = function(error) {
    errLogger.error('\n----\n' + error.stack + '\n Arguments : ' + error.arguments + '\n Severity : ' + error.severity + '\n----\n');
  };

  var logUncaughtError = function(error) {
    var filename =  __CONFIG__.app_base_path + '../logs/uncaught-exceptions.log';
    var message = '\n\n----------UNCAUGHT ERROR!!! ----------------\n\n' +
      'Message : ' + error.message + '\n--\n' +
      'Type : ' + error.type + '\n--\n' +
      'StackTrace : ' + error.stack + '\n--\n' +
      '----------------------------------\n';
    fs.appendFileSync(filename,message);
    
  };

  var logAppInfo = function(info) {
    infoLogger.info(info + '\n----\n');
  };

  var writeErrLog = function(err) {
    errLogger.error(err);
  };

  var logMaintError = function(info) {
    var dt = new Date();
    var headerDate = dt.toDateString() + ' ' + dt.toTimeString();
    maintLogger.info('\n--------------- Maintenance Data - ' + headerDate + ' --------------------\n\n' + info);
  };

  return {
    logAppErrors: logAppErrors,
    logAppInfo: logAppInfo,
    writeLogErr: writeErrLog,
    logMaintError: logMaintError,
    logUncaughtError: logUncaughtError
  };
}());

module.exports = logger;
