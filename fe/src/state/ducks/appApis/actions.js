import * as types from "./types";
import apiAction, { defaultAction } from "~/state/ducks/utils/createAction";
import parseObjToQuery from "~/views/utilities/helpers/parseObjToQuery";

// TOUR
export const getTours = (params) => apiAction("get")(types.COMMON, "/tours" + parseObjToQuery(params), {}, true);
export const getTour = (idTour) => apiAction("get")(types.COMMON, "/tour/" + idTour, {}, true);
export const postTour = (body) => apiAction("post")(types.COMMON, "/tour", body, true);
export const putTour = (body) => apiAction("put")(types.COMMON, "/tour", body, true);
export const deleteTour = (body) => apiAction("delete")(types.COMMON, "/tour", body, true);
