const momentTimezone = require('moment-timezone');
const moment = require("moment");

const dateKorea = momentTimezone.tz(Date.now(), "Asia/Seoul").format();
// console.log(new Date(dateKorea))
// console.log(dateKorea);
// const curr = new Date();
// console.log(curr)
// const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
// const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
// const a = new Date(utc - KR_TIME_DIFF);
// const b = Date(utc+KR_TIME_DIFF);
// console.log(utc+KR_TIME_DIFF)
// console.log(a)
// console.log(Date(b))
const dayData = "2022-09-06"
const day = moment(dayData).startOf("day");
console.log(day)
console.log(day.toDate())

console.log(moment(dayData).endOf('day').toDate())
console.log(moment(day).endOf('day').toDate())
