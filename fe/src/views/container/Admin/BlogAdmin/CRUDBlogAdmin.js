import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row, Select, DatePicker, InputNumber, Cascader, message } from "antd";
const { Option } = Select;
const CRUDBlogAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 12 }
};

const CRUDBlogAdmin = (props) => {
   const onFinish = (values) => {
      if (props.currentEdit) {
         const bodyUpdate = {
            ...values,
            idPost: props.currentEdit?.idPost,
         };
         props
            .putPost(bodyUpdate)
            .then((res) => {
               message.success("Sửa thành công!");
               props.setCurrentEdit(undefined);
            })
            .catch((err) => {
               message.error(JSON.stringify(err));
            });
      } else {
         const bodyCreate = { ...values, idAccount: props.user?.idAccount };
         props
            .postPost(bodyCreate)
            .then((res) => {
               message.success("Tạo Blog thành công!");
               props.setIsCreatePost(false);
            })
            .catch((err) => {
               console.log("🚀 ~ file: CRUDBlogAdmin.js ~ line 45 ~ onFinish ~ err", err);
               message.error("Thất bại!");
            });
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <CRUDBlogAdminStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               ...props.currentEdit
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Tiêu đề'
               name='titlePost'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tiêu đề!"
                  }
               ]}>
               <Input />
            </Form.Item>
            <Form.Item label='Mô tả' name='describe' rules={[{ required: true, message: "Hãy nhập mô tả!" }]}>
               <TextArea rows={6} />
            </Form.Item>
            <div className='w-100 d-flex justify-content-center align-items-center'>
               <Button type='primary' htmlType='submit' className='mr-4'>
                  {props.currentEdit ? "Sửa" : "Thêm"}
               </Button>
               <Button
                  type='danger'
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreatePost && props.setIsCreatePost(undefined);
                  }}>
                  Đóng
               </Button>
            </div>
         </Form>
      </CRUDBlogAdminStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDBlogAdmin admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getPosts: appApisActions.getPosts,
         getAllImagesPost: appApisActions.getAllImagesPost,
         putPost: appApisActions.putPost,
         postPost: appApisActions.postPost
         // patchPost: appApisActions.patchTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDBlogAdmin);
