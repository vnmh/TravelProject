//! moment.js locale configuration
/* eslint no-undef: "off" */
(function (global, factory) {
   typeof exports === "object" && typeof module !== "undefined" && typeof require === "function"
      ? factory(require("moment"))
      : typeof define === "function" && define.amd
      ? define(["moment"], factory)
      : factory(global.moment);
})(this, function (moment) {
   "use strict";

   var vi = moment.defineLocale("vi", {
      months: "Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12".split(
         "_"
      ),
      monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
      monthsParseExact: true,
      weekdays: "Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy".split("_"),
      weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
      weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
      weekdaysParseExact: true,
      meridiemParse: /sa|ch/i,
      isPM: function (input) {
         return /^ch$/i.test(input);
      },
      meridiem: function (hours, minutes, isLower) {
         if (hours < 12) {
            return isLower ? "sáng" : "SÁNG";
         } else {
            return isLower ? "chiều" : "CHIỀU";
         }
      },
      longDateFormat: {
         LT: "HH:mm",
         LTS: "HH:mm:ss",
         L: "DD/MM/YYYY",
         LL: "D MMMM [năm] YYYY",
         LLL: "D MMMM [năm] YYYY HH:mm",
         LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
         l: "DD/M/YYYY",
         ll: "D MMM YYYY",
         lll: "D MMM YYYY HH:mm",
         llll: "ddd, D MMM YYYY HH:mm"
      },
      calendar: {
         sameDay: "[Hôm nay] - DD/MM/YYYY",
         nextDay: "[Ngày mai] - DD/MM/YYYY",
         nextWeek: "dddd - DD/MM/YYYY",
         lastDay: "[Hôm qua] - DD/MM/YYYY",
         lastWeek: "dddd - DD/MM/YYYY",
         sameElse: "dddd - DD/MM/YYYY"
      },
      relativeTime: {
         future: "%s tới",
         past: "%s trước",
         s: "vài giây",
         ss: "%d giây",
         m: "một phút",
         mm: "%d phút",
         h: "một giờ",
         hh: "%d giờ",
         d: "một ngày",
         dd: "%d ngày",
         M: "một tháng",
         MM: "%d tháng",
         y: "một năm",
         yy: "%d năm"
      },
      dayOfMonthOrdinalParse: /\d{1,2}/,
      ordinal: function (number) {
         return number;
      },
      week: {
         dow: 1, // Monday is the first day of the week.
         doy: 4 // The week that contains Jan 4th is the first week of the year.
      }
   });

   return vi;
});
