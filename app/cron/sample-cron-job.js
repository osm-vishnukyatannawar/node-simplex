/**
 * Runs the tag background syncing process for records that have 
 * failed earlier in Cassandra.
 */
var util = require('util');
var CronJob = require('cron').CronJob;
var MaintenanceService = require(__CONFIG__.app_code_path +
  'maintenance/MaintenanceService');
var Maintenance = require(__CONFIG__.app_code_path + 'maintenance/Maintenance');
var async = require('async');
var logger = require(__CONFIG__.app_base_path + 'logger');
var BackgroundTaskService = require(__CONFIG__.app_code_path +
  'background_task/BackgroundTaskService.js');
var Email = require(__CONFIG__.app_code_path + 'email/Email.js');
var EmailService = require(__CONFIG__.app_code_path + 'email/EmailService.js');
var __ = require('underscore');
var config = require(__CONFIG__.app_base_path + 'config');

var maintenanceString = '';
var currentSpString = '';
var errRecords = [];

var TagDataBackgroundSync = (function() {
  var mMaintenance = new Maintenance();
  var sMaintenance = new MaintenanceService();
  var mEmail = new Email();
  var sEmail = new EmailService();
  var sBackgroundTask = new BackgroundTaskService();

  /**
   * Syncs current records that might have crashed.
   */
  var syncErrorRecords = function() {
    maintenanceString = '';
    // 1. Get all failed records.
    // 2. Send them to Maintenance Service's process record.			
    async.waterfall([function getFailedRecords(next) {
      var dtStart = new Date();
      maintenanceString += '[' + dtStart.toUTCString() + '] ' +
        'Start sync.\n\n';
      mMaintenance.getLastXFailedLogs(__CONFIG__.maintenance.max_records,
        next);
    }, checkAndProcess], function(err, data) {
      var dtEnd = new Date();
      maintenanceString += '\n\n' + '[' + dtEnd.toUTCString() + '] ' +
        'Sync ended.\n\n';
      if (errRecords.length !== 0) {
        maintenanceString += util.inspect(errRecords, {
          depth: 4
        });
      }
      logger.logMaintError(maintenanceString);
    });
  };

  function checkAndProcess(data, cbMain) {
    if (data.rows && data.rows.length === 0) {
      return cbMain();
    }
    async.eachSeries(data.rows, function(record, next) {
      var dataToProcess = {};
      try {
        dataToProcess.tagSN = record.tagsn;
        dataToProcess.data = JSON.parse(record.data);
        dataToProcess.readFlag = true;
        dataToProcess.trialCount = record.trialcount;
        dataToProcess.organizationID = record.organizationid;
        dataToProcess.dmpRecID = record.dmprecid;
        dataToProcess.createdOn = record.createdon;
        dataToProcess.type = parseInt(record.type, 10);
        if (dataToProcess.type === 4) {
          // TODO : Do not check type like this. Needs to be changed to use database.
          // Only processing current data
          sMaintenance.processPostData(dataToProcess, dataToProcess.dmpRecID,
            function(err, data) {
              if (err) {
                if (dataToProcess.trialCount < 3) {
                  // Only send the error if this is the 
                  // second time the record is failing.
                  errRecords.push(dataToProcess);
                }
              }
              next();
            });
        } else {
          next();
        }
      } catch (e) {
        if (dataToProcess.trialCount < 3) {
          // Only send the error if this is the 
          // second time the record is failing.
          errRecords.push(dataToProcess);
        }
        next();
      }
    }, function(err, data) {
      if (err) {
        errRecords.push(err);
      }
      cbMain();
    });
  }

  /**
   * Calls the stored procedure for processing current data.
   */
  var runCurrentSP = function() {
    currentSpString = '';
    var dtStart = new Date();
    currentSpString += '[' + dtStart.toUTCString() + '] ' +
      'Calling current SP\n\n';
    sBackgroundTask.syncCurrentData(function(err, data) {
      if (err) {
        currentSpString += 'ERROR running SP : ' + util.inspect(err, {
          depth: 4
        });
      } else {
        currentSpString += 'Process LOG : ' + util.inspect(data, {
          depth: 5
        });
      }
      var dtEnd = new Date();
      currentSpString += '[' + dtEnd.toUTCString() + '] ' +
        'SP Processing ended.\n\n';
      logger.logMaintError(currentSpString);
    });
  };

  function sendLogMails(dataToSend) {
    if (!config.express.isProduction) {
      // Only send mails for production
      return;
    }
    var dataToMail = {
      title: dataToSend.title,
      dataString: dataToSend.dataString
    };
    var mailObj = __.defaults({
      toEmail: __CONFIG__.email.debugMails,
      templateName: 'maintenance-failed-log',
      subject: dataToSend.subject,
      data: dataToMail
    }, mEmail.getDefaultObj());
    mEmail.queueMail(mailObj, function(err) {
      if (err) {
        logger.logAppErrors(err);
      } else {
        sEmail.sendUnsentMails();
      }
    });
  }

  return {
    syncErrorRecords: syncErrorRecords,
    runCurrentSP: runCurrentSP
  };
}());

// Runs the background sync for failed current records.
var job = new CronJob({
  cronTime: __CONFIG__.maintenance.sync_time,
  onTick: TagDataBackgroundSync.syncErrorRecords,
  start: true
});

// Calls the Current SP every X hours.
var spJob = new CronJob({
  cronTime: __CONFIG__.maintenance.current_sp_time,
  onTick: TagDataBackgroundSync.runCurrentSP,
  start: true
});

module.exports = TagDataBackgroundSync;
