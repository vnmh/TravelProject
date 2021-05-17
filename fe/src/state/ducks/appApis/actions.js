import * as types from "./types";
import apiAction, { defaultAction } from "~/state/ducks/utils/createAction";
import parseObjToQuery from "~/views/utilities/helpers/parseObjToQuery";

// TOUR
export const getTours = (params) => apiAction("get")(types.COMMON, "/tours" + parseObjToQuery(params), {}, true);
export const putTour = (body) => apiAction("put")(types.COMMON, "/tour", body, true);
export const getTour = (idTour) => apiAction("get")(types.COMMON, "/tour" + parseObjToQuery({ idTour }), {}, true);
export const postTour = (body) => apiAction("post")(types.COMMON, "/tour", body, true);
export const deleteTour = (idTour) =>
   apiAction("delete")(types.COMMON, "/tour" + parseObjToQuery({ idTour }), {}, true);

// SCHEDULE
export const getScheduleTour = (idTour) =>
   apiAction("get")(types.COMMON, "/schedule" + parseObjToQuery({ idTour }), {}, true);
export const putSchedule = (body) => apiAction("put")(types.COMMON, "/schedule", body, true);

// TIMELINE
export const getTimelineTour = (idTour) =>
   apiAction("get")(types.COMMON, "/timeline" + parseObjToQuery({ idTour }), {}, true);
export const postTimeline = (body) => apiAction("post")(types.COMMON, "/timeline", body, true);
export const putTimeline = (body) => apiAction("put")(types.COMMON, "/timeline", body, true);
export const deleteTimeline = (idTimelines) =>
   apiAction("delete")(types.COMMON, "/timeline" + parseObjToQuery({ idTimelines }), {}, true);

//IMAGE
export const getAllImagesTour = (params) =>
   apiAction("get")(types.COMMON, "/imagesTour" + parseObjToQuery(params), {}, true);
export const getAllImagesPost = (params) =>
   apiAction("get")(types.COMMON, "/imagesPost" + parseObjToQuery(params), {}, true);
export const deleteImage = (idImage) =>
   apiAction("delete")(types.COMMON, "/image" + parseObjToQuery({ idImage }), {}, true);

//Blog
export const getPosts = (params) => apiAction("get")(types.COMMON, "/posts" + parseObjToQuery(params), {}, true);
export const getPost = (idPost) => apiAction("get")(types.COMMON, "/post" + parseObjToQuery({ idPost }), {}, true);
export const postPost = (body) => apiAction("post")(types.COMMON, "/post", body, true);
export const putPost = (body) => apiAction("put")(types.COMMON, "/put", body, true);
export const deletePost = (idPost) =>
   apiAction("delete")(types.COMMON, "/post" + parseObjToQuery({ idPost }), {}, true);

//SERVICE
export const getServices = (params) => apiAction("get")(types.COMMON, "/services" + parseObjToQuery(params), {}, true);
export const postService = (body) => apiAction("post")(types.COMMON, "/service", body, true);
export const putService = (body) => apiAction("put")(types.COMMON, "/service", body, true);
export const deleteService = (idServices) =>
   apiAction("delete")(types.COMMON, "/service" + parseObjToQuery({ idServices }), {}, true);

//MOMO

export const getLinkMoMo = (body) => apiAction("post")(types.COMMON, "/getLinkMomo", body, true);
export const createOrder = (body) => apiAction("post")(types.COMMON, "/order", body, true);
export const getOrder = (params) => apiAction("get")(types.COMMON, "/order" + parseObjToQuery(params), {}, true);
