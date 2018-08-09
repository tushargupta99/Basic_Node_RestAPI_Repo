// Standardizing the time order to make database and APIs robust
const moment = require ('moment');
const momenttz = require("moment-timezone");

const timeZone = 'Asia/Calcutta'

let now = () => {
    return moment.utc().format()
}

let getLocalTime = () => {
    return moment.tz(timeZone).format()
}

let converToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('LLLL');
}

module.exports = {
    now : now,
    getLocalTime : getLocalTime,
    converToLocalTime : converToLocalTime
 }