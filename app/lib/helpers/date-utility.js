'use strict';
// Third party modules
const moment = require('moment');
const momentTimezone = require('moment-timezone');

var DateUtil = {
  toMySQLDateTime: function (dt) {
    if (!dt) {
      dt = new Date();
    }
    return dt.toISOString().slice(0, 19).replace('T', ' ');
  },
  toJSDateTime: function (dtStr) {
    if (dtStr === undefined) {
      return null;
    }
    var t = dtStr.split(/[- :]/);

    // when t[3], t[4] and t[5] are missing they defaults to zero
    return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
  },
  addHoursToDate: function (dt, hoursToAdd) {
    if (!dt) {
      dt = new Date();
    }
    dt.setHours(dt.getHours() + hoursToAdd);
    return dt;
  },
  UTCToCurrentTime: function (dt) {
    var str = dt.toLocaleString() + ' UTC';
    return new Date(str);
  },
  toMySQLDateTimeWithoutISO: function (dt) {
    if (!dt) {
      dt = new Date();
    }
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
  },
  convertTimezoneBasedTimeToUTC: function (dt, timezone) {
    if (!dt) {
      dt = new Date();
    }
    return momentTimezone.tz(dt, timezone).utc().format('YYYY-MM-DD HH:mm:ss');
  }
};

module.exports = DateUtil;
