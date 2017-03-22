'use strict';
// Third party modules
const winston = require('winston');
const fs = require('fs');

let logger = (function () {
  let errLogger = new (winston.Logger)({
    transports: [new winston.transports.File({
      filename: __CONFIG__.getLogsFolderPath() + 'exceptions.log',
      timestamp: true,
      prettyPrint: false,
      json: false
    })],
    exceptionHandlers: [new winston.transports.File({
      filename: __CONFIG__.getLogsFolderPath() + 'exceptions.log',
      json: false,
      timestamp: true,
      prettyPrint: true
    })],
    exitOnError: false
  });

  let infoLogger = new (winston.Logger)({
    transports: [new winston.transports.Console({
      json: false,
      timestamp: true
    }), new winston.transports.File({
      filename: __CONFIG__.getLogsFolderPath() + 'debug.log',
      json: false,
      timestamp: true
    })]
  });

  let logAppErrors = function (error) {
    errLogger.error('\n----\n' + error.stack + '\n Arguments : ' + error.arguments +
      '\n Severity : ' + error.severity + '\n----\n');
  };

  let logUncaughtError = function (error) {
    let filename = __CONFIG__.getLogsFolderPath() + 'uncaught-exceptions.log';
    let message = '\n\n----------UNCAUGHT ERROR!!! ----------------\n\n' +
      'Message : ' + error.message + '\n--\n' +
      'Type : ' + error.type + '\n--\n' +
      'StackTrace : ' + error.stack + '\n--\n' +
      '----------------------------------\n';
    fs.appendFileSync(filename, message);
  };

  let logAppInfo = function (info) {
    infoLogger.info(info + '\n----\n');
  };

  let writeErrLog = function (err) {
    errLogger.error(err);
  };

  return {
    logAppErrors: logAppErrors,
    logAppInfo: logAppInfo,
    writeLogErr: writeErrLog,
    logUncaughtError: logUncaughtError
  };
}());

module.exports = logger;
