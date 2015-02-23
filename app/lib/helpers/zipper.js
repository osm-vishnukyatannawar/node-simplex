 var admzip = require('adm-zip');
 var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');

 function zipper() {

 }

 zipper.prototype.getFilesInfo = function(sourcePath, cb) {
   var zipEntries = null;
   try {
     var zip = new admzip(sourcePath);
     zipEntries = zip.getEntries();
   } catch (e) {
     return cb(new AppError(e, 'There was an error while reading the zip file.', {}));
   }
   return cb(null, zipEntries);
 };

 zipper.prototype.extractFiles = function(sourcePath, destpath, cb) {
   try {
     var zip = new admzip(sourcePath);
     zip.extractAllTo(destpath, true);
     return cb(null);
   } catch (e) {
     return cb(new AppError(e, 'There was an error while extracting the zip file.', {}));
   }
 };

 module.exports = zipper;
