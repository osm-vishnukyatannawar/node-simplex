function Service() {
  
}

Service.prototype.buildTransactionObj = function(transactionID, data) {
  return {
    transactionID : transactionID,
    data : data
  };
}
module.exports = Service;