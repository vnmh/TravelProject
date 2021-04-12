import { message } from "antd";

message.config({
   maxCount: 1,
   duration: 2
});

export const API_URL = process.env.DOMAIN;
export const API_UPLOAD_URL = API_URL + "/upload";
export const CKEDITOR_URL_IMG = API_URL + "/upload";

export const imgUploadConfig = {
   minWidth: 750,
   minHeight: 500,
   fileSize: 5,
   type: /\.(jpg|jpeg|bmp|png|gif|tiff)$/i
};

export const imageExtension = ".png, .jpg, .jpeg, .bmp,.tiff";

export const API_CODE = {
   SUCCESS: "SUCCESS",
   AUTHENTICATION_INVALID: "AUTHENTICATION_INVALID",
   UNAUTHORIZED: "UNAUTHORIZED"
};

export const JWT = "jwt_" + API_URL;

export const ROLES = {
   administrator: "administrator",
   user: "user"
};
