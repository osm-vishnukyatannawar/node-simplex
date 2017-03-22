'use strict';

// Third party modules
const request = require('request');
// Osm includes
let SlogerrConfig = require(__CONFIG__.app_base_path + 'slogerr-config');


/**
 * A module that will log the errors into the slogerr.
 *
 * @param req
 * @param res
 */

var Slogerr = {
  log: function (logMessage, stackTrace, severity, cb) {
    var dataToSend = SlogerrConfig.data;
    dataToSend.LogMessage = logMessage;
    dataToSend.StackTrace = stackTrace;
    dataToSend.Severity = severity;
    var options = {
      url: SlogerrConfig.url,
      method: SlogerrConfig.method,
      headers: SlogerrConfig.headers,
      body: JSON.stringify(dataToSend)
    };
    request(options, function (err, response, body) {
      if (cb) {
        return cb(err, response, body);
      }
    });
  }
};

module.exports = Slogerr;
