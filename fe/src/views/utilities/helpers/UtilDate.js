"use strict";
import moment from "moment";
import {} from "moment-precise-range-plugin";
import _ from "lodash";
import "./moment_vi";

//'YYYY-MM-DDTHH:mm:ss' quêt định format chung cho kiểu ngày giờ nha

const defaultUndefined = "";
export default class UtilDate {
   // Mặc định app nhận thời gian là UTC + 00
   // => *** Khi hiển thị trên giao diện sẽ cộng thời gian này GTM + 07 ***
   // Đối với các trường hợp time do app quyết định và gửi lên server thì time gửi đi phải là UTC + 00
   static DEFAULT_UTC = true;

   //Server UTC
   //static formatDateTimeServer = 'YYYY-MM-DDTHH:mm:ss'; // HH = 24h
   static formatDateTimeServer = "YYYY-MM-DDTHH:mm:ss.SSS[Z]"; // HH = 24h

   static formatDateServer = "YYYY-MM-DD";
   static formatTimeServer = "THH:mm:ss";
   //Local
   static formatDateTimeLocal = "hh:mm a, DD/MM/YYYY";
   static formatTimeDateLocal = "HH:mm DD/MM/YYYY";
   static formatDateLocal = "DD/MM/YYYY";
   static formatTimeLocal = "HH:mm";
   static formatTimeLogLocal = "ddd - DD/MM/YYYY";

   static formatDateDayWeek = "DD MMM YYYY (dddd)";
   //sameDay: '[Today], h A',
   static formatCalendar = {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: UtilDate.formatDate + " (dddd)",
      lastDay: UtilDate.formatDate + " (dddd)",
      lastWeek: UtilDate.formatDate + " (dddd)",
      sameElse: UtilDate.formatDate + " (dddd)"
   };

   static isValid(dateTime) {
      try {
         return moment(dateTime).isValid();
      } catch (e) {
         return false;
      }
   }

   static isValidDate(dateTime) {
      return dateTime instanceof Date && !isNaN(dateTime);
   }

   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   // **************************Hàm có đuôi ...Local dùng để chuyển thời gian từ UTC+00 qua GMT+07*************************************
   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   static toDateTimeLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC, undefinedString = defaultUndefined) {
      try {
         if (!UtilDate.isValid(dateTime) || _.isUndefined(dateTime) || _.isNull(dateTime)) {
            return undefinedString;
         }
         if (isUTC) {
            /*
                let utcTime = "2017-02-02 08:00:13";
                var local_date= moment.utc(utcTime ).local().format('YYYY-MM-DD HH:mm:ss');
                */
            return moment.utc(dateTime).local().lang("vi").format(UtilDate.formatDateTimeLocal);
         } else {
            return moment(dateTime).format(UtilDate.formatDateTimeLocal);
         }
      } catch (e) {
         return undefinedString;
      }
   }

   static toDateLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC, stringFormatDate = UtilDate.formatDateLocal) {
      try {
         if (!UtilDate.isValid(dateTime) || _.isNil(dateTime)) {
            return "";
         }
         if (isUTC) {
            return moment.utc(dateTime).local().format(stringFormatDate);
         } else {
            return moment(dateTime).format(stringFormatDate);
         }
      } catch (e) {
         return "";
      }
   }
   static toTimeLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC) {
      try {
         if (!UtilDate.isValid(dateTime)) {
            return "";
         }
         if (isUTC) {
            return moment.utc(dateTime).local().format(UtilDate.formatTimeLocal);
         } else {
            return moment(dateTime).format(UtilDate.formatTimeLocal);
         }
      } catch (e) {
         return "";
      }
   }
   static toTimeDateLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC, undefinedString = defaultUndefined) {
      try {
         if (!UtilDate.isValid(dateTime) || _.isUndefined(dateTime) || _.isNull(dateTime)) {
            return undefinedString;
         }
         if (isUTC) {
            /*
                let utcTime = "2017-02-02 08:00:13";
                var local_date= moment.utc(utcTime ).local().format('YYYY-MM-DD HH:mm:ss');
                */
            return moment.utc(dateTime).local().format(UtilDate.formatTimeDateLocal);
         } else {
            return moment(dateTime).format(UtilDate.formatTimeDateLocal);
         }
      } catch (e) {
         return undefinedString;
      }
   }

   static toTimeLogLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC, undefinedString = defaultUndefined) {
      try {
         if (!UtilDate.isValid(dateTime) || _.isUndefined(dateTime) || _.isNull(dateTime)) {
            return undefinedString;
         }
         if (isUTC) {
            /*
                let utcTime = "2017-02-02 08:00:13";
                var local_date= moment.utc(utcTime ).local().format('YYYY-MM-DD HH:mm:ss');
                */
            return moment.utc(dateTime).local().calendar({
               sameDay: "[Today]",
               nextDay: "[Tomorrow]",
               nextWeek: "dddd",
               lastDay: "[Yesterday]",
               lastWeek: "[Last] dddd",
               sameElse: "DD/MM/YYYY"
            });
         } else {
            return moment(dateTime)
               .calendar({
                  sameDay: "[Today]",
                  nextDay: "[Tomorrow]",
                  nextWeek: "dddd",
                  lastDay: "[Yesterday]",
                  lastWeek: "[Last] dddd",
                  sameElse: "DD/MM/YYYY"
               })
               .format(UtilDate.formatTimeLogLocal);
         }
      } catch (e) {
         return undefinedString;
      }
   }

   static toCalendarLocal(dateTime, isUTC = UtilDate.DEFAULT_UTC) {
      try {
         if (!UtilDate.isValid(dateTime)) {
            return "";
         }
         if (isUTC) {
            return moment.utc(dateTime).local().calendar(null, UtilDate.formatCalendar);
         } else {
            return moment(dateTime).calendar(null, UtilDate.formatCalendar);
         }
      } catch (e) {
         return "";
      }
   }

   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   // *******************************Hàm có đuôi ...UTC dùng để chuyển thời gian từ GMT+07 qua UTC+00**********************************
   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   static toDateUtc(dateTimeLocal) {
      try {
         if (!UtilDate.isValid(dateTimeLocal)) {
            return "";
         }
         return moment(dateTimeLocal).utc().format(UtilDate.formatDateServer);
      } catch (e) {
         return "";
      }
   }
   static toDateTimeUtc(dateTimeLocal) {
      try {
         if (!UtilDate.isValid(dateTimeLocal)) {
            return "";
         }
         return moment(dateTimeLocal).utc().format(UtilDate.formatDateTimeServer);
      } catch (e) {
         return "";
      }
   }

   static toTimeUtc(dateTimeLocal) {
      try {
         if (!UtilDate.isValid(dateTimeLocal)) {
            return "";
         }
         return moment(dateTimeLocal).utc().format(UtilDate.formatTimeServer);
      } catch (e) {
         return "";
      }
   }

   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   // ********************************************-------Các hàm convert/so sánh-------*********************************************
   // ******************************************************************************************************************************
   // ******************************************************************************************************************************
   static toDiffMonth(dateTimeOne, dateTimeTwo) {
      try {
         if (!UtilDate.isValid(dateTimeOne)) {
            return "";
         }
         if (!UtilDate.isValid(dateTimeTwo)) {
            return "";
         }
         var m1 = moment(dateTimeOne, UtilDate.formatDateTimeServer);
         var m2 = moment(dateTimeTwo, UtilDate.formatDateTimeServer);
         return moment.preciseDiff(m1, m2, true).days; // '1 month 2 days 3 hours 4 minutes 5 seconds'
      } catch (e) {
         return "";
      }
   }

   static convertUTCStringTimeToDate(stringUTCTime) {
      try {
         return moment.utc(stringUTCTime);
      } catch (e) {}
      return undefined;
   }

   /**
    * Trả về ngày mặc định cho MyDateTimePicker chọn ngày sinh - 16 năm trước so với ngày hiện tại
    */
   static getDefaultDateTimePickerForBirthday() {
      try {
         let today = new Date();
         return today.setFullYear(today.getFullYear() - 16);
      } catch (error) {}
      return undefined;
   }
   /**
    *
    * @param {*} dateRange 'today' | 'week' | 'month' | 'year'
    */
   static getRangeDate(dateRange) {
      switch (dateRange) {
         case "today":
            {
               let current = new Date();
               let start = new Date(current.getFullYear(), current.getMonth(), current.getDate());
               let end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999);

               return {
                  from: start,
                  to: end
               };
            }
            break;
         case "week":
            {
               let current = new Date();
               let startOfDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
               let end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999);
               let startOfWeek = moment(startOfDay).add(-1 * startOfDay.getDay() + 1, "days");

               return {
                  from: startOfWeek,
                  to: end
               };
            }
            break;
         case "month":
            {
               let current = new Date();
               let startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
               let end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999);

               return {
                  from: startOfMonth,
                  to: end
               };
            }
            break;
         case "year":
            {
               let current = new Date();
               let startOfYear = new Date(current.getFullYear(), 0, 1);
               let end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999);

               return {
                  from: startOfYear,
                  to: end
               };
            }
            break;
      }
      return {
         from: undefined,
         to: undefined
      };
   }

   static getStartMomentDateLocal(momentDate) {
      if (!_.isNil(momentDate)) {
         return moment(new Date(momentDate.year(), momentDate.month(), momentDate.dates(), 0, 0, 0));
      }
      return undefined;
   }
   static getEndMomentDateLocal(momentDate) {
      if (!_.isNil(momentDate)) {
         return moment(new Date(momentDate.year(), momentDate.month(), momentDate.dates(), 23, 59, 59, 999));
      }
      return undefined;
   }

   static getStartDateLocal(momentDate) {
      if (!_.isNil(momentDate)) {
         return new Date(momentDate.year(), momentDate.month(), momentDate.dates(), 0, 0, 0);
      }
      return undefined;
   }
   static getEndDateLocal(momentDate) {
      if (!_.isNil(momentDate)) {
         return new Date(momentDate.year(), momentDate.month(), momentDate.dates(), 23, 59, 59, 999);
      }
      return undefined;
   }
}
