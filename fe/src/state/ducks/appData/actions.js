import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const initAppData = () => ({ type: types.INIT_APP_DATA });

export const setCategoryId = (id) => defaultAction(types.SET_CATEGORY_ID_VIEW, { id });
