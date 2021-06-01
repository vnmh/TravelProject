import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Button, message } from "antd";
import { API_URL } from "~/configs";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const CRUDTourAdminImageStyled = styled.div``;

const CRUDTourAdminImage = (props) => {
   const [fileList, setFileList] = useState(
      (props.currentEdit?.images || []).map((im) => {
         return {
            idImage: im.idImage,
            name: im.name,
            status: "done",
            url: firstImage(im.url)
         };
      })
   );

   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
         src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
   };

   const beforeUpload = (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
         message.error("Chỉ có thể thêm file JPG/PNG!");
      }
      return isJpgOrPng;
   };

   const onRemove = async (file) => {
      props
         .deleteImage(file.idImage ? file.idImage : file.response?.insertId)
         .then((res) => {
            message.success("Thành công!");
         })
         .catch((err) => {
            message.error("Thất bại!");
            console.log("hiendev ~ file: CRUDTourAdminImage.js ~ line 62 ~ onRemove ~ err", err);
         });
      // xóa phần tử image và gọi API xóa image khỏi tour
   };

   const actionUpload = (file) => {
      /**
       * If you return, action will call again
       * */
      const actionUpload = `${API_URL}/image?idTour=${props.currentEdit.idTour}`;

      const newListImage = [...fileList];
      setFileList(newListImage);
      const key = "updatable";
      return (
         message.loading({
            content: `${file.name} đang tải lên...`,
            key,
            duration: 1
         }),
         actionUpload
      );
   };

   return (
      <CRUDTourAdminImageStyled>
         <div className='d-flex justify-content-end w-100'>
            <Button
               onClick={() => {
                  props.setCurrentEdit(undefined);
                  props.setIsCreateTour && props.setIsCreateTour(undefined);
               }}>
               Đóng
            </Button>
         </div>
         {props.currentEdit && (
            <ImgCrop rotate aspect={16 / 9} grid modalWidth={650}>
               <Upload
                  name={"imgUploader"} //This is important similar backend name field
                  multiple={false}
                  action={actionUpload}
                  listType='picture-card'
                  onChange={onChange}
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}
                  fileList={fileList}
                  onPreview={onPreview}>
                  {fileList.length < 10 && "+ Upload"}
               </Upload>
            </ImgCrop>
         )}
         {!props.currentEdit && "Chỉ có thể tải ảnh lên sau khi tạo tour thành công!"}
      </CRUDTourAdminImageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         putTour: appApisActions.putTour,
         deleteImage: appApisActions.deleteImage
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdminImage);
