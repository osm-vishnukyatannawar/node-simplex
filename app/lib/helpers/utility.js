var util = {
  toMySQLDateTime: function(dt) {
    if (dt === undefined) {
      dt = new Date();
    }
    return dt.toISOString().slice(0, 19).replace('T', ' ');
  },
  toJSDateTime : function(dtStr) {
    if(dtStr === undefined) {
      return null;
    }
    var t = dtStr.split(/[- :]/);

    //when t[3], t[4] and t[5] are missing they defaults to zero
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
  } 
};

module.exports = util;