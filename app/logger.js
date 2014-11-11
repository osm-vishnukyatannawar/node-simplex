var winston = require('winston');

var logger = (function() {
  var errLogger = new (winston.Logger)({
    transports: [new winston.transports.File({
      filename: __CONFIG__.app_base_path + "../logs/exceptions.log",
      timestamp: true,
      prettyPrint: false,
      json: false
    })],
    exceptionHandlers: [new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/exceptions.log',
      json: false,
      timestamp: true,
      prettyPrint: false
    })],
    exitOnError: false
  });

  var infoLogger = new (winston.Logger)({
    transports: [new winston.transports.Console({
      json: false,
      timestamp: true
    }), new winston.transports.File({
      filename: __CONFIG__.app_base_path + '../logs/debug.log',
      json: false,
      timestamp: true
    })]
  });

  var logAppErrors = function(error, logLevel, severity) {
    errLogger.error("\n----\n" + error.stack + "\n Arguments : "
            + error.arguments + "\n Severity : " + error.severity + "\n----\n");
  };
  var logAppInfo = function(info) {
    infoLogger.info(info + "\n----\n");
  };

  var writeErrLog = function(err) {
    errLogger.error(err);
  };
  return {
    logAppErrors: logAppErrors,
    logAppInfo: logAppInfo,
    writeLogErr: writeErrLog
  };
}());

module.exports = logger;