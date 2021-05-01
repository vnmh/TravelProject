import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row, Select, DatePicker, InputNumber, Cascader } from "antd";
const { Option } = Select;
const CRUDBlogAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 8 }
};
const tailLayout = {
   wrapperCol: { offset: 20, span: 16 }
};

const CRUDBlogAdmin = (props) => {
   const onFinish = (values) => {
      console.log("🚀 ~ file: CRUDBlogAdmin.js ~ line 29 ~ onFinish ~ values", values?.services.join(","));
      //Nếu currentEdit thì gọi API update, không thì gọi API create
      // if (props.currentEdit) {
      //    //Gọi API update tour
      //    const bodyUpdate = { ...values, idTour: props.currentEdit?.idTour };
      //    console.log("hiendev ~ file: EditTourAdmin.js ~ line 27 ~ onFinish ~ bodyUpdate", bodyUpdate);
      //    props
      //       .patchTour(bodyUpdate)
      //       .then((res) => {
      //          //Success: thì đóng form edit lại và thông báo cho người dùng
      //          props.setCurrentEdit(undefined);
      //       })
      //       .catch((err) => {
      //          console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
      //       });
      //    //Fail: không làm gì
      // } else {
      //    //Gọi API post tour
      //    const bodyCreate = {
      //       titleTour: "",
      //       price: 1000,
      //       sale: "",
      //       departureDay: "",
      //       describe: "",
      //       address: "",
      //       vocationTime: "",
      //       idAccount: "",
      //       tags: "",
      //       services: "",
      //       views: "",
      //       votes: "",
      //       reuse: "",
      //       type: "",
      //       ...values
      //    };
      //    console.log("hiendev ~ file: CRUDBlogAdmin.js ~ line 42 ~ onFinish ~ bodyCreate", bodyCreate);
      //    props
      //       .postTour(bodyCreate)
      //       .then((res) => {
      //          //Success: thì đóng form create lại và thông báo cho người dùng
      //          props.setIsCreateTour(false);
      //       })
      //       .catch((err) => {
      //          console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
      //       });
      //    //Fail: không làm gì
      // }
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

            <Form.Item {...tailLayout}>
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
               <Button
                  type='danger'
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreatePost && props.setIsCreatePost(undefined);
                  }}>
                  Đóng
               </Button>
            </Form.Item>
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
         getAllImagesPost: appApisActions.getAllImagesPost
         // postPost: appApisActions.postPost,
         // patchPost: appApisActions.patchTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDBlogAdmin);
