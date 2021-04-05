import { parseObjToQuery } from "~/views/utilities/helpers";
import { API_URL } from "~/configs";
import { requestHeaders } from "./fetch";

export const downloadFile = ({ url, params, method = "get", body = {}, filename = "filename" }) => {
   fetch(API_URL + url + parseObjToQuery(params), {
      method: method,
      headers: requestHeaders(true),
      body: method !== "get" ? body : undefined
   })
      .then((response) => response.blob())
      .then((blob) => {
         let url = window.URL.createObjectURL(blob);
         let a = document.createElement("a");
         a.href = url;
         a.download = filename;
         a.click();
      });
};
