import _ from "lodash";
import queryString from "query-string";

function parseObjToQuery(obj = {}, startWith = "?") {
   if (_.isNil(obj)) return "";
   let keys = Object.keys(obj).filter(
      (key) => !_.isNil(obj[key]) && !(_.isString(obj[key]) && obj[key].trim().length === 0)
   );
   let params = {};

   (keys || []).map((key) => (params = { ...params, [key]: obj[key] }));
   console.log(JSON.stringify(params));
   return startWith + queryString.stringify(params);
}

export default parseObjToQuery;
