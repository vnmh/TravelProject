import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { API_URL } from "~/configs";

function getBase64(img, callback) {
   const reader = new FileReader();
   reader.addEventListener("load", () => callback(reader.result));
   reader.readAsDataURL(img);
}

function beforeUpload(file) {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
   }
   return isJpgOrPng && isLt2M;
}

function Avatar(props) {
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState("");

   const handleChange = (info) => {
   console.log("maidev ~ file: Avatar.js ~ line 29 ~ handleChange ~ info", info)
      if (info.file.status === "uploading") {
         setLoading(true);
         return;
      }
      if (info.file.status === "done") {
         console.log("maidev ~ file: Avatar.js ~ line 34 ~ handleChange ~ info.file", info.file);
      }
   };

   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </div>
   );
   return (
      <Upload
         name='file'
         listType='picture-card'
         className='avatar-uploader'
         showUploadList={false}
         action={`${API_URL}/file`}
         onChange={handleChange}>
         {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: "100%" }} /> : uploadButton}
      </Upload>
   );
}

export default Avatar;
