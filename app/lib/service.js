var getStatus = require(__CONFIG__.app_base_path + 'lib/status');

function Service() {
  this.getStatusCode = getStatus;
}

Service.prototype.buildTransactionObj = function(transactionID, data) {
  return {
    transactionID : transactionID,
    data : data
  };
};


module.exports = Service;