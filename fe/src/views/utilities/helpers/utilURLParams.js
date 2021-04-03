import _ from "lodash";
import { getString } from "./utilObject";
const queryString = require("query-string");

const generatePagination = (
   pageInfo = {
      page: 0,
      size: 10
   }
) => {
   return {
      page: _.isNumber(pageInfo.page) ? pageInfo.page : 0,
      size: _.isNumber(pageInfo.size) ? pageInfo.size : 10
   };
};

const generateSorterObject = (sorter) => {
   let order = getString(sorter, "order");
   let columnKey = getString(sorter, "columnKey");

   let sorterObject = {};
   if (columnKey && order) {
      sorterObject = { sort: `${columnKey},${order === "descend" ? "DESC" : "ASC"}` };
   }
   return sorterObject;
};

const generateURL = ({ path, params }) => {
   return `${path}?${Object.keys(params)
      .filter((key) => !(_.isString(params[key]) && params[key].trim().length === 0))
      .map((key) => `${key}=${params[key]}`)
      .join("&")}`;
};

const updateURLParams = (props, params = [{ key: "", value: "" }]) => {
   const { location, history } = props;
   let q = queryString.parse(getString(location, "search"));
   params.forEach((item) => {
      q[item.key] = item.value;
   });
   history.push(
      window.location.pathname +
         `?${Object.keys(q)
            .filter((key) => !(_.isString(q[key]) && q[key].trim().length === 0))
            .map((key) => `${key}=${q[key]}`)
            .join("&")}`
   );
};

export { generatePagination, generateURL, generateSorterObject, updateURLParams };
