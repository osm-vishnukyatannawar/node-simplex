var getStatus = require(__CONFIG__.app_base_path + 'lib/status');
var zip = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
var moment = require('moment');

function Service() {
  this.getStatusCode = getStatus;
  this.zipper = new zip();
}

Service.prototype.buildTransactionObj = function(transactionID, data) {
  return {
    transactionID: transactionID,
    data: data
  };
};

/**
 * This method is used to get the details of the files in the zip file
 *
 * @param : path
 *        -path of the zip file that you want to read.
 *
 * @param : cb
 *        -Callback
 *
 */
Service.prototype.getDetailsFromZip = function(path, cb) {
  var that = this;
  this.zipper.getFilesInfo(path, function(err, data) {
    if (err) {
      var e = new AppError(that.getStatusCode('badRequest'),
        'Invalid or unsupported zip format.', err);
      return cb(e);
    }
    return cb(null, data);
  });
};

/**
 * This method is used to unzip the zipped files
 *
 * @param sourcePath
 *        -Path of the file that you want to unzip
 *
 * @param destPath
 *        -Destination path to which you want to extract all the files
 *
 * @param cb
 *        -Callback
 */
Service.prototype.UnzipFilesTofolder = function(sourcePath, destPath, cb) {
  var that = this;
  this.zipper.extractFiles(sourcePath, destPath, function(err) {
    if (err) {
      var e = new AppError(that.getStatusCode('badRequest'),
        'Version number already user. Please give a unique version number.', err);
      return cb(e);
    }
    return cb(null);
  });
};

Service.prototype.getTimePeriod = function(timePeriod) {
  timePeriod = timePeriod.toLowerCase();
  var endDate = getPrevDateTime(true);
  var interval = 1;
  var iterations = 7;
  if (timePeriod === 'month') {
    interval = 7;
    iterations = 5;
  } else if (timePeriod === 'year') {
    interval = 30;
    iterations = 12;
  }
  var dtArr = [];
  for (var i = 0; i < iterations; ++i) {
    var dt = getPrevDateTime(true);
    dt.setDate(dt.getDate() - (interval * i));
    dtArr.push(dt);
  }
  var startDate = dtArr[dtArr.length-1];
  var obj = {
    interval: interval,
    iterations: iterations,
    dates: dtArr,
    endDate: endDate,
    startDate: startDate
  };
  return obj;
};

Service.prototype.getDateInYMDFormate = function(dateObj){
	var date = dateObj.getDate();
	var month = dateObj.getMonth() + 1;
	var year = dateObj.getFullYear();
	return year+'-'+month+'-'+date;
}; 

Service.prototype.parseClientDate = function(date) {
  var dt = moment(date, __CONFIG__.clientSideDateFormat);
  return dt;
};

function getPrevDateTime(isPrevDay) {
  var dt = new Date();
  if (isPrevDay) {
    dt.setDate(dt.getDate() - 1);
  }
  return dt;
}



module.exports = Service;