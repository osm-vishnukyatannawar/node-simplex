var moment = require('moment');
var momentTimezone = require('moment-timezone');

var util = {
  toMySQLDateTime: function(dt) {
    if (!dt) {
      dt = new Date();
    }
    return dt.toISOString().slice(0, 19).replace('T', ' ');
  },
  toJSDateTime: function(dtStr) {
    if (dtStr === undefined) {
      return null;
    }
    var t = dtStr.split(/[- :]/);

    //when t[3], t[4] and t[5] are missing they defaults to zero
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
  },
  addHoursToDate: function(dt, hoursToAdd) {
    if (!dt) {
      dt = new Date();
    }
    dt.setHours(dt.getHours() + hoursToAdd);
    return dt;
  },
  UTCToCurrentTime: function(dt) {
    var str = dt.toLocaleString() + ' UTC';
    return new Date(str);
  },
  getTagDateTimeInStr: function(timeStamp) {
    try {
      var tagDate = new Date(timeStamp.tm_year, parseInt(timeStamp.tm_mon) - 1,
        timeStamp.tm_mday, timeStamp.tm_hour, timeStamp.tm_min,
        timeStamp.tm_sec, 0);
      return moment(tagDate).format('YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      return false;
    }
  },
  getTagDateTime: function(timeStamp) {
    try {
      return new Date(timeStamp.tm_year, parseInt(timeStamp.tm_mon) - 1,
        timeStamp.tm_mday, timeStamp.tm_hour, timeStamp.tm_min,
        timeStamp.tm_sec, 0).getTime();
    } catch (e) {
      return false;
    }
  },
  toMySQLDateTimeWithoutISO: function(dt) {
    if (!dt) {
      dt = new Date();
    }
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
  },
  convertTimezoneBasedTimeToUTC: function(dt, timezone) {
    if(!dt) {
      dt = new Date();
    }
    return momentTimezone.tz(dt, timezone).utc().format('YYYY-MM-DD HH:mm:ss');
  }
};

module.exports = util;
