var util = {
  toMySQLDateTime: function(dt) {
    if (!dt) {
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
  },
  addHoursToDate : function(dt, hoursToAdd) {
    if(!dt) {
      dt = new Date();
    }    
    dt.setHours(dt.getHours() + hoursToAdd);
    return dt;
  },
  UTCToCurrentTime : function(dt) {
    var str = dt.toLocaleString() + ' UTC';
    return new Date(str);
  }
};

module.exports = util;