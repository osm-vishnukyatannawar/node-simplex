'use strict';

// Third party modules
const util = require('util');
const CronJob = require('cron').CronJob;
const async = require('async');
const __ = require('underscore');
const path = require('path');

// Osm includes
let logger = require(path.join(__CONFIG__.app_base_path, 'logger'));

var SampleCronJob = (function () {
  function doNothing () {

  }

  return {
    doNothing: doNothing
  };
}());

// Runs a dummy background sync.
var job = new CronJob({
  cronTime: __CONFIG__.cron_time,
  onTick: SampleCronJob.doNothing,
  start: true
});

module.exports = SampleCronJob;
