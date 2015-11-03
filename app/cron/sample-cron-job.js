/* global __CONFIG__ */
/**
 * Runs the tag background syncing process for records that have 
 * failed earlier in Cassandra.
 */
var util = require('util');
var CronJob = require('cron').CronJob;
var async = require('async');
var logger = require(__CONFIG__.app_base_path + 'logger');
var __ = require('underscore');

var SampleCronJob = (function() {
  function doNothing() {
    
  } 
  
  return {
    doNothing : doNothing
  };
}());

// Runs a dummy background sync.
var job = new CronJob({
  cronTime: __CONFIG__.cron_time,
  onTick: SampleCronJob.doNothing,
  start: true
});


module.exports = SampleCronJob;
