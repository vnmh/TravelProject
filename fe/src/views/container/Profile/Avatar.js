import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { API_URL } from "~/configs";
import { firstImage } from "~/views/utilities/helpers/utilObject";

function Avatar(props) {
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState("");

   const handleChange = (info) => {
      if (info.file.status === "uploading") {
         setLoading(true);
         return;
      }
      if (info.file.status === "done") {
         setLoading(false);
         setImageUrl(info.file?.response?.nameFile);
         props.setAvatar(info.file?.response?.nameFile);
      }
   };

   // 
   useEffect(() => {
      setImageUrl(props.avatarAPI);
   }, [props.avatarAPI]);
  

   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </div>
   );
   console.log("maidev ~ file: Avatar.js ~ line 27 ~ Avatar ~ [props.avatarAPI", props.avatarAPI)
   return (
      <Upload
         name='file'
         listType='picture-card'
         className='avatar-uploader'
         showUploadList={false}
         action={`${API_URL}/file`}
         onChange={handleChange}>
         {imageUrl ? <img src={firstImage("/img/" + imageUrl)} alt='avatar' style={{ width: "100%" }} /> : uploadButton}
      </Upload>
   );
}

export default Avatar;
