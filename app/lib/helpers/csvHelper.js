var csv = require('csv');
var fs = require('fs');

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

module.exports = csvHelper;