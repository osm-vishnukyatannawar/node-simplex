var csv = require('csv');
var fs = require('fs');
var async = require('async');

function csvHelper() {
}

csvHelper.prototype.readCsvHelper = function(path, cb) {
  var fileStream = fs.createReadStream(path);
  var parser = csv.parse({
    'columns': true
  }, function(err, data) {
    if (err) {
      cb(err);
    }
    cb(null, data);

  });
  fileStream.pipe(parser);
};

csvHelper.prototype.readObjCreateCsv = function(arrayToRead, cb) {
  csv.stringify(arrayToRead, function(err, output) {
    if (err) {
      return cb(err);
    }
    cb(null, output);
  });
};

csvHelper.prototype.getArrayForCsv = function(data, cb, properties) {
  var baseArray = [];
  var labelsArray = [];
  for (var index in data) {
    var valuesArray = [];
    var element = data[index];
    // @Vamsi - Use triple equal to.
    if (labelsArray.length == 0) {
      for (var key in element) {
        if (properties) {
          var csvName = getPropertyCsvName(key, properties);
          if (csvName) {
            labelsArray.push(csvName);
          } else {
            labelsArray.push(key);
          }

        } else {
          labelsArray.push(key);
        }

      }
      baseArray.push(labelsArray);
    }
    // @Vamsi - Either remove the var, or rename the variable. the name key matches what you have 
    // declared on line 41. Scope of a variable is the parent function.
    for (var key in element) {
      valuesArray.push(element[key]);
    }
    baseArray.push(valuesArray);
  }
  cb(null, baseArray);
};

function getPropertyCsvName(key, props) {
  if (props.hasOwnProperty(key)) {
    if (props[key].hasOwnProperty('csvName')) {
      return props[key]['csvName'];
    } else {
      return false;
    }
  } else {
    return false;
  }
}

csvHelper.prototype.writeCsvStringToFile = function(data, fileName,
  cb) {
  // @Vamsi, use single quotes, no need to use global variable.
  // @Vamsi, to get the path of the files folder, use __CONFIG__.getFilesFolderPath() function.
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


csvHelper.prototype.getCSV = function(data, fileName, cb, properties) {
  var that = this;
  async.waterfall([
    function(wfcb) {
      that.getArrayForCsv(data, wfcb, properties);
    },
    function(array, wfcb) {
      that.readObjCreateCsv(array, wfcb);
    },
    function(stringToWrite, wfcb) {
      that.writeCsvStringToFile(stringToWrite, fileName, wfcb);
    }
  ], function(err, data) {
    cb(err, data);
  });
};
module.exports = csvHelper;
