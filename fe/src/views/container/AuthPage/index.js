import React from "react";
import { Wrapper } from "./styles";
import { LoginForm } from "~/views/presentation/AuthForm";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { LOGIN_PATH, MASTER_DATA_DASHBOARD } from "~/configs/routesConfig";
import { compose } from "recompose";
import { connect } from "react-redux";

import { Form, Input, Button, Checkbox } from "antd";
const layout = {
   labelCol: {
      span: 8
   },
   wrapperCol: {
      span: 16
   }
};
const tailLayout = {
   wrapperCol: {
      offset: 8,
      span: 16
   }
};

const Login = (props) => {
   const onFinish = (values) => {
      console.log("Success:", values);
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
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

         <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
         </Form.Item>

         <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {}
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(Login);
