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
 * @param : path
 *        -path of the zip file that you want to read.
 * @param : cb
 *        -Callback
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

// @vamsi - why is this function name in caps??
/**
 * This method is used to unzip the zipped files
 * @param sourcePath
 *        -Path of the file that you want to unzip
 * @param destPath
 *        -Destination path to which you want to extract all the files
 * @param cb
 *        -Callback
 */
Service.prototype.UnzipFilesTofolder = function(sourcePath, destPath, cb) {
  var that = this;
  this.zipper.extractFiles(sourcePath, destPath, function(err) {
    if (err) {
      // @vamsi - The service is suppose to be generalized, you can't put this
      // firmware specific error message here. Also Please **remember** for future
      // errors as well send the Error object to AppError as the first parameter, 
      // in this case err. Why is this a badRequest.
      var e = new AppError(that.getStatusCode('badRequest'),
        'Version number already user. Please give a unique version number.', err);
      return cb(e);
    }
    return cb(null);
  });
};

Service.prototype.getTimePeriod = function(timePeriod, isHourly) {
  timePeriod = timePeriod.toLowerCase();
  var endDate = getPrevDateTime(true);
  var interval = 1;
  var days = __CONFIG__.daysShown[timePeriod];
  var iterations = __CONFIG__.samplesShown[timePeriod];
  var dateTimeArr = [];
  var dtArr = [];
  var i = 0;
  for (i = 0; i < days; ++i) {
    var dt = getPrevDateTime(true);
    dt.setDate(dt.getDate() - (interval * i));
    dtArr.push(dt);
  }
  var startDate = dtArr[dtArr.length - 1];
  if (isHourly) {
    for (i = 0; i < dtArr.length; ++i) {
      for (var j = 0; j < iterations; ++j) {
        dateTimeArr.push(moment(dtArr[i]).format('MMM DD'));
      }
    }
    dtArr = dateTimeArr;
  }
  var obj = {
    interval: interval,
    iterations: iterations,
    dates: dtArr,
    endDate: endDate,
    startDate: startDate
  };
  return obj;
};

Service.prototype.getDateInYMDFormate = function(dateObj) {
  var date = dateObj.getDate();
  var month = dateObj.getMonth() + 1;
  var year = dateObj.getFullYear();
  return year + '-' + month + '-' + date;
};

Service.prototype.parseClientDate = function(date) {
  var dt = moment(date, __CONFIG__.clientSideDateFormat);
  return dt;
};

Service.prototype.parseClientDateTime = function(date) {
  var dt = moment(date, __CONFIG__.clientSideDateTimeFormat);
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
