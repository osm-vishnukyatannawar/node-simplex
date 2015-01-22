var csv = require('csv');
var fs = require('fs');
var uuid = require('node-uuid');
var utility = require(__CONFIG__.app_base_path + 'lib/helpers/utility');
function csvHelper(){
	
	
}

csvHelper.prototype.readCsvHelper = function(path,cb){
	var fileStream=fs.createReadStream(path);
	var parser = csv.parse({'columns':true}, function(err, data){
		if(err){
			cb(err);
		}
		cb(null , data);
		
	});
	fileStream.pipe(parser);
}

csvHelper.prototype.readObjCreateCsv = function(arrayToRead , cb){
	csv.stringify(arrayToRead, function(err, output){
		  if(err){
			  return cb(err);
		  }
		  cb(null,output);
	});
}

csvHelper.prototype.getArrayForCsv = function(data, cb) {
	  var baseArray = [];
	  var labelsArray = [];
	  for (var index in data) {
	    var valuesArray = [];
	    var element = data[index];
	    if (labelsArray.length == 0) {
	      for (var key in element) {
	        labelsArray.push(key);
	      }
	      baseArray.push(labelsArray);
	    }
	    for (var key in element) {
	      valuesArray.push(element[key]);
	    }
	    baseArray.push(valuesArray);
	  }
	  cb(null, baseArray);
	};
	
csvHelper.prototype.writeCsvStringToFile = function(data, fileName,
		  cb) {
		  fs.writeFile(global.__CONFIG__.app_base_path + "../" + global.__CONFIG__.filesFolderName +
		    "/" + fileName,
		    data,
		    function(err) {
		      if (err) {
		        return cb(err);
		      } else {
		        return cb(null);
		      }
		    });
		};
module.exports = csvHelper;