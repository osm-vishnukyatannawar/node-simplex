 var admzip = require('adm-zip');

 function zipper(){
	 
 };
 
 zipper.prototype.getFilesInfo = function(sourcePath , destPath , cb){
	var zip = new admzip(sourcePath);
	var zipEntries = zip.getEntries();
	//zip.extractAllTo( destPath, true);
	cb(null,zipEntries);
}
 
 zipper.prototype.extractFiles = function(sourcePath , destpath , cb){
	 try{
		 var zip = new admzip(sourcePath);
		 var result =  zip.extractAllTo(destpath, true);
		 cb(null);
	 }catch(e){
		 cb(e); 
	 }
	 
	 
 }
 
 
 
 module.exports = zipper;