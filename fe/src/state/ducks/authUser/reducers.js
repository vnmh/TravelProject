import * as types from "./types";
import produce from "immer";
import { addAuthoz, removeAuthoz, getAuthoz } from "~/state/utils/session";

const initialState = {
   user: null,
   resetKey: null,
   isAuthenticated: !!getAuthoz()
};

const reducer = produce((draft, { type, payload }) => {
   switch (type) {
      case types.VERIFY_OTP_SUCCESS:
         draft.resetKey = payload.res.resetKey;
         return;
      case types.LOGIN_SUCCESS:
      case types.GET_USER_SUCCESS:
         if (payload.res.token) {
            addAuthoz(payload.res.token, payload.res.user);
         }
         draft.isAuthenticated = true;
         draft.user = { ...draft.user, ...payload.res };
         return;
      case types.LOGOUT:
         removeAuthoz();
         draft.isAuthenticated = false;
         draft.user = null;
         return;
      default:
         return draft;
   }
}, initialState);

export default reducer;
