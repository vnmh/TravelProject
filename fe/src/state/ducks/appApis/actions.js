import * as types from "./types";
import apiAction, { defaultAction } from "~/state/ducks/utils/createAction";
import parseObjToQuery from "~/views/utilities/helpers/parseObjToQuery";

// TOUR
export const getTours = (params) => apiAction("get")(types.COMMON, "/tours" + parseObjToQuery(params), {}, true);
export const getTour = (idTour) => apiAction("get")(types.COMMON, "/tour/" + idTour, {}, true);
export const postTour = (body) => apiAction("post")(types.COMMON, "/tour", body, true);
export const patchTour = (body) => apiAction("patch")(types.COMMON, "/tour", body, true);
export const deleteTour = (body) => apiAction("delete")(types.COMMON, "/tour", body, true);

//IMAGE
export const getAllImagesTour = (params) => apiAction("get")(types.COMMON, "/imagesTour" + parseObjToQuery(params), {}, true);
export const getAllImagesPost = (params) => apiAction("get")(types.COMMON, "/imagesPost" + parseObjToQuery(params), {}, true);

//Blog
export const getPosts = (params) => apiAction("get")(types.COMMON, "/posts" + parseObjToQuery(params), {}, true);
export const getPost = (idTour) => apiAction("get")(types.COMMON, "/post/" + idTour, {}, true);

//Evaluates
