import _ from "lodash";
import { API_URL } from "~/configs";

const getString = (obj, propertyPath = undefined, defaultValue = undefined) => {
   try {
      // propertyPath phải là string hoặc undefined
      if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
         return undefined;
      }
      if (!_.isNil(propertyPath)) {
         if (_.isNil(obj)) {
            return defaultValue;
         }
         if (_.isObject(obj)) {
            var properties = propertyPath.split(".");
            // tìm property value từ property path
            let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
            return _.isString(result) ? result : defaultValue;
         }
      } else if (_.isString(obj)) {
         return obj;
      }
   } catch (err) {
      console.log(err);
   }
   return defaultValue;
};

const getNumber = (obj, propertyPath = undefined, defaultValue = undefined) => {
   try {
      // propertyPath phải là string hoặc undefined

      const fixedFloatNumber = (value) => {
         return parseFloat(Number(value).toFixed(2));
      };
      if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
         return undefined;
      }
      if (!_.isNil(propertyPath)) {
         if (_.isNil(obj)) {
            return defaultValue;
         }
         if (_.isObject(obj)) {
            var properties = propertyPath.split(".");
            // tìm property value từ property path
            let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
            return _.isNumber(result) ? fixedFloatNumber(result) : defaultValue;
         }
      } else if (_.isNumber(obj)) {
         return fixedFloatNumber(obj);
      }
   } catch (err) {
      console.log(err);
   }
   return defaultValue;
};

const getBool = (obj, propertyPath = undefined, defaultValue = undefined) => {
   try {
      // propertyPath phải là string hoặc undefined
      if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
         return undefined;
      }
      if (!_.isNil(propertyPath)) {
         if (_.isNil(obj)) {
            return defaultValue;
         }
         if (_.isObject(obj)) {
            var properties = propertyPath.split(".");
            // tìm property value từ property path
            let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
            return _.isBoolean(result) ? result : defaultValue;
         }
      } else if (_.isBoolean(obj)) {
         return obj;
      }
   } catch (err) {
      console.log(err);
   }
   return defaultValue;
};

const getArray = (obj, propertyPath = undefined, defaultValue = undefined) => {
   try {
      // propertyPath phải là string hoặc undefined
      if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
         return undefined;
      }
      if (!_.isNil(propertyPath)) {
         if (_.isNil(obj)) {
            return defaultValue;
         }
         if (_.isObject(obj)) {
            var properties = propertyPath.split(".");
            // tìm property value từ property path
            let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
            return _.isArray(result) ? result : defaultValue;
         }
      } else if (_.isArray(obj)) {
         return obj;
      }
   } catch (err) {
      console.log(err);
   }
   return defaultValue;
};

const getObject = (obj, propertyPath = undefined, defaultValue = {}) => {
   try {
      // propertyPath phải là string hoặc undefined
      if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
         return undefined;
      }
      if (!_.isNil(propertyPath)) {
         if (_.isNil(obj)) {
            return defaultValue;
         }
         if (_.isObject(obj)) {
            var properties = propertyPath.split(".");
            // tìm property value từ property path
            let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
            return _.isObject(result) ? result : defaultValue;
         }
      } else if (_.isObject(obj)) {
         return obj;
      }
   } catch (err) {
      console.log(err);
   }
   return defaultValue;
};

const getArrayWithoutEmptyItem = (array) => {
   const isEmptyObject = (item) => {
      let keys = Object.keys(item).filter(
         (key) => key !== "key" && (typeof item[key] === "number" || typeof item[key] === "string")
      );
      let counter = 0;
      keys.forEach((key) => {
         if (!isNullOrEmpty(item[key])) {
            counter++;
         }
      });
      return counter === 0;
   };
   return getArray(array, undefined, []).filter((item) => !isEmptyObject(item));
};

const removeEmptyArrayItem = (object) => {
   let keys = Object.keys(object).filter((key) => getArray(object, key, []).length > 0);
   let modifyObject = {};
   keys.forEach((key) => {
      modifyObject[key] = getArrayWithoutEmptyItem(object[key]);
   });
   return {
      ...object,
      ...modifyObject
   };
};

const isNullOrEmpty = (value) => {
   return _.isNil(value) || (!_.isNil(value) && _.isString(value) && (value || "").trim().length === 0);
};

const getMatchedValueWithRegex = (val, reg) => {
   let results = (val || "").match(reg) || [];
   return _.first(results) || "";
};

const mapArrayObjectToAPI = (process, changeName = []) => {
   if (!process) return {};
   if (!process.length) {
      if (_.isEmpty(process)) return {};
      let key = Object.keys(process);
      let modifyObject = key.reduce((prev, curr) => {
         let currChange = curr;
         changeName.map((name) => {
            if (curr === name.currName) name.changeName === "" ? (currChange = false) : (currChange = name.changeName);
         });
         if (!currChange) return prev;
         prev[currChange] = process[curr];
         return prev;
      }, {});
      return modifyObject;
   } else
      return getArray(process, undefined, []).map((val) => {
         if (!val) return [];
         let key = Object.keys(val);
         let modifyObject = key.reduce((prev, curr) => {
            let currChange = curr;
            getArray(changeName, undefined, []).map((name) => {
               if (curr === getString(name, "currName", ""))
                  name.changeName === "" ? (currChange = false) : (currChange = getString(name, "changeName", ""));
            });
            if (!currChange) return prev;
            prev[currChange] = val[curr];
            return prev;
         }, {});
         return modifyObject;
      });
};

const removeSignThenLowerCaseString = (value) => {
   return (getString(value) || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .toLocaleLowerCase()
      .trim();
};

export const firstImage = (strImages = "", width) => {
   let imgUrls = _.first(strImages.split("|"));
   return `${API_URL}${_.isNumber(width) ? `${width}/` : ""}${imgUrls}`;
};

const removeVietnameseTones = (str) => {
   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
   str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
   str = str.replace(/đ/g, "d");
   str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
   str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
   str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
   str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
   str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
   str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
   str = str.replace(/Đ/g, "D");
   // Some system encode vietnamese combining accent as individual utf-8 characters
   // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
   str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
   str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
   // Remove extra spaces
   // Bỏ các khoảng trắng liền nhau
   str = str.replace(/ + /g, " ");
   str = str.trim();
   // Remove punctuations
   // Bỏ dấu câu, kí tự đặc biệt
   str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
   return str;
};

export {
   removeVietnameseTones,
   getString,
   getNumber,
   getObject,
   getArray,
   getBool,
   removeSignThenLowerCaseString,
   getMatchedValueWithRegex,
   isNullOrEmpty,
   getArrayWithoutEmptyItem,
   removeEmptyArrayItem,
   mapArrayObjectToAPI
};
