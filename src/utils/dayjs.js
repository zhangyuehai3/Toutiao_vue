import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

Vue.filter('time-chagndu', time => {
  // dayjs(time).from(dayjs())
  return console.log("1");
})
