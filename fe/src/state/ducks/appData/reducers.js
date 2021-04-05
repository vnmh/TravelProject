import * as types from "./types";
import produce from "immer";

const initialState = {
   initData: null,
   locale: "vn",

   categoryId: ""
};

const reducer = produce((draft, { payload, type }) => {
   switch (type) {
      case types.INIT_APP_DATA:
         draft.initData = "success";
         return;
      case "authUser/LOGIN_SUCCESS":
         draft.locale = "vn";
         return;
      case types.SET_CATEGORY_ID_VIEW:
         draft.categoryId = payload.id;
         return;
      default:
         return draft;
   }
}, initialState);

export default reducer;
