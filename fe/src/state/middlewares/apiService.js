import { fetch } from "../utils";
import { API_CODE, API_URL } from "~/configs";
import { LOGOUT } from "~/state/ducks/authUser/types";

const apiService = (store) => (next) => (action) => {
   const result = next(action);
   if (!action.meta || !action.meta.async) {
      return new Promise((resolve, reject) => {
         resolve();
         return result;
      });
   }
   // const locale = getState().locale.curLocale;

   const { path, method = "get", body, withToken = false } = action.meta;
   if (!path) {
      throw new Error(`'path' not specified for async action ${action.type}`);
   }

   let url = `${path}`;

   if (path.startsWith("/")) {
      url = `${API_URL}${path}`;
   }
   return fetch(url, method, body, withToken)
      .then(
         (res) => handleResponse(res, action, next),
         (err) => handleErrors(err, action, next)
      )
      .catch((reason) => handleErrors(reason, action, next));
};

const handleErrors = (err, action, next) => {
   let type = `${action.type}_FAILED`;
   let code = err.code;
   if (code === API_CODE.AUTHENTICATION_INVALID) {
      type = LOGOUT;
   }
   next({
      type,
      payload: err.data,
      meta: action.meta
   });
   return Promise.reject(err);
};

const handleResponse = (res, action, next) => {
   next({
      type: `${action.type}_SUCCESS`,
      payload: res,
      meta: action.meta
   });
   return res;
};

export default apiService;
