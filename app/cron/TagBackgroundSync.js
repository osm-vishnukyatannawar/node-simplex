/**
 * Runs the tag background syncing process for records that have 
 * failed earlier in Cassandra.
 */
var util = require('util');
var CronJob = require('cron').CronJob;
var MaintenanceService = require(__CONFIG__.app_code_path + 'maintenance/MaintenanceService');
var Maintenance = require(__CONFIG__.app_code_path + 'maintenance/Maintenance');
var async = require('async');
var logger = require(__CONFIG__.app_base_path + 'logger');

var maintenanceString = '';
var currentSpString = '';
var errRecords = [];

var TagDataBackgroundSync = (function() {
	var mMaintenance = new Maintenance();	
	var sMaintenance = new MaintenanceService();
	
	/**
	 * Syncs current records that might have crashed.
	 */	
	var syncErrorRecords = function() {
		maintenanceString = '';
		// 1. Get all failed records.
		// 2. Send them to Maintenance Service's process record.			
		async.waterfall([function getFailedRecords(next) {
			var dtStart = new Date();
			maintenanceString += '[' + dtStart.toUTCString() + ']' + 'Start sync...\n\n';
			mMaintenance.getLastXFailedLogs(__CONFIG__.maintenance.max_records, next);
		}, checkAndProcess], function(err, data) {						
			var dtEnd = new Date();
			maintenanceString += '\n\n' + '[' + dtEnd.toUTCString() + ']' + 'Sync ended...\n\n';
			if(errRecords.length !== 0) {				
				maintenanceString += util.inspect(errRecords, {depth : 4});
				// TODO : Send email to recepients...
			}
			logger.logMaintError(maintenanceString);
		});
	};

	function checkAndProcess(data, cbMain) {
		if(data.rows && data.rows.length === 0) {
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
				if(dataToProcess.type === 4) {
					// TODO : Do not check type like this. Needs to be changed to use database.
					// Only processing current data
					sMaintenance.processPostData(dataToProcess, dataToProcess.dmpRecID, function(err, data) {
						if(err) {
							if(dataToProcess.trialCount < 3) {
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
			} catch(e) {
				if(dataToProcess.trialCount < 3) {
					// Only send the error if this is the 
					// second time the record is failing.
					errRecords.push(dataToProcess);
				}
				next();
			}	
		}, function(err, data) {
			if(err) {
				errRecords.push(err);
			}					
			cbMain();
		});
	}
	
	/**
	 * Calls the stored procedure for processing current data.
	 */
	var runCurrentSP = function() {
		var dtStart = new Date();
		currentSpString += '[' + dtStart.toUTCString() + ']' + 'Calling current SP\n\n';	
		mMaintenance.callCurrentSP(function(err, data) {
			if(err) {
				currentSpString += 'ERROR Response : ' + util.inspect(err, {depth : 4});
			} else {
				currentSpString += 'SUCCESS Response : ' + util.inspect(data, {depth : 4});
			}
			currentSpString += '[' + dtStart.toUTCString() + ']' + '\n\nSP Processing ended.';
			// TODO : Send mail.
		});
	};
		
	return {
		syncErrorRecords : syncErrorRecords,
		runCurrentSP : runCurrentSP
	};
}());

var job = new CronJob({
  cronTime: __CONFIG__.maintenance.sync_time,
  onTick: TagDataBackgroundSync.syncErrorRecords,
  start : true  
});

var spJob = new CronJob({
  cronTime: __CONFIG__.maintenance.current_sp_time,
  onTick: TagDataBackgroundSync.runCurrentSP,
  start : true  
});

module.exports = TagDataBackgroundSync;
