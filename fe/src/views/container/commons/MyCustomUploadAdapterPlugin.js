import React from "react";
import { getString } from "~/views/utilities/helpers/utilObject";
import { CKEDITOR_URL_IMG } from "~/configs";

class MyUploadAdapter {
   constructor(loader) {
      // The file loader instance to use during the upload.
      this.loader = loader;
   }

   // Starts the upload process.
   upload() {
      return this.loader.file.then(
         (file) =>
            new Promise((resolve, reject) => {
               this._initRequest();
               this._initListeners(resolve, reject, file);
               this._sendRequest(file);
            })
      );
   }

   // Aborts the upload process.
   abort() {
      if (this.xhr) {
         this.xhr.abort();
      }
   }

   // Initializes the XMLHttpRequest object using the URL passed to the constructor.
   _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest());

      // Note that your request may look different. It is up to you and your editor
      // integration to choose the right communication channel. This example uses
      // a POST request with JSON as a data structure but your configuration
      // could be different.
      xhr.open("POST", CKEDITOR_URL_IMG, true);
      xhr.responseType = "json";
   }

   // Initializes XMLHttpRequest listeners.
   _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${file.name}.`;

      xhr.addEventListener("error", () => reject(genericErrorText));
      xhr.addEventListener("abort", () => reject());
      xhr.addEventListener("load", () => {
         const response = xhr.response;
         if (!response || response.error) {
            return reject(response && response.error ? response.error.message : genericErrorText);
         }
         resolve({
            default: getString(response, "urls.default")
         });
      });
      if (xhr.upload) {
         xhr.upload.addEventListener("progress", (evt) => {
            if (evt.lengthComputable) {
               loader.uploadTotal = evt.total;
               loader.uploaded = evt.loaded;
            }
         });
      }
   }
   _sendRequest(file) {
      const data = new FormData();
      data.append("upload", file);
      this.xhr.send(data);
   }
}

export default function MyCustomUploadAdapterPlugin(editor) {
   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter(loader);
   };
}
