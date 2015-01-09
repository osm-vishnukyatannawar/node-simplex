var getStatus = require(__CONFIG__.app_base_path + 'lib/status');
var zip = require(__CONFIG__.app_base_path + 'lib/helpers/zipper');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
function Service() {
  this.getStatusCode = getStatus;
  this.zipper = new zip();
}

Service.prototype.buildTransactionObj = function(transactionID, data) {
  return {
    transactionID : transactionID,
    data : data
  };
};


/**
 * This method is used to get the details of the files in the zip file
 * 
 * @param : path 
 * 				-path of the zip file that you want to read.
 * 
 * @param : cb
 * 				-Callback
 * 
 */
Service.prototype.getDetailsFromZip = function(path, cb) {
var that = this;
this.zipper.getFilesInfo(path, function(err, data) {
 if (err) {
   e = new AppError(that.getStatusCode("badRequest"),
     "Invalid or unsupported zip format.", err);
   return cb(e);
 }
 return cb(null, data);
});
};


/**
 * This method is used to unzip the zipped files
 * 
 * @param sourcePath 
 * 				-Path of the file that you want to unzip
 * 
 * @param destPath
 * 				-Destination path to which you want to extract all the files
 * 
 * @param cb
 * 				-Callback
 */
Service.prototype.UnzipFilesTofolder = function(sourcePath, destPath, cb) {
var that = this;
this.zipper.extractFiles(sourcePath, destPath, function(err, data) {
 if (err) {
   e = new AppError(that.getStatusCode("badRequest"),
     "Version number already user. Please give a unique version number.", err);
   return cb(e);
 }
 return cb(null);
});
};


module.exports = Service;