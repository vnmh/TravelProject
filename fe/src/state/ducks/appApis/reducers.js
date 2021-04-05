import * as types from "./types";
import produce from "immer";

const initialState = {};

const reducer = produce((draft, { type, payload }) => {
   switch (type) {
      default:
         return draft;
   }
}, initialState);

export default reducer;
