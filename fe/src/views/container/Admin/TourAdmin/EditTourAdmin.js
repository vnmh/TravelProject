import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox } from "antd";

const EditTourAdminPageStyled = styled.div``;

const layout = {
   labelCol: { span: 24 },
   wrapperCol: { span: 24 }
};

const EditTourAdminPage = (props) => {
   const onFinish = (values) => {
      console.log("Success:", values);
      props.setCurrentEdit(undefined);
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   console.log("🚀 ~ file: EditTourAdmin.js ~ line 78 ~ EditTourAdminPage ~ props.currentEdit", props.currentEdit)
   return (
      <EditTourAdminPageStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Username'
               name='username'
               rules={[
                  {
                     required: true,
                     message: "Please input your username!"
                  }
               ]}>
               <Input />
            </Form.Item>

            <Form.Item
               label='Password'
               name='password'
               rules={[
                  {
                     required: true,
                     message: "Please input your password!"
                  }
               ]}>
               <Input.Password />
            </Form.Item>

            <Form.Item>
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
               <Button type='danger' onClick={()=>{
                  props.setCurrentEdit(undefined)
               }} >
                  Đóng
               </Button>
            </Form.Item>
         </Form>
      </EditTourAdminPageStyled>
   );
};
  

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => EditTourAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(EditTourAdminPage);
