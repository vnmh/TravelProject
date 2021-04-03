import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { Form, Input, Button, Checkbox, message } from "antd";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const WrapLoginPage = styled.div`
   height: 100vh;
`;

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
      // mỗi action của redux trả về một Promise
      // Nếu như values cần được map lại hoặc chỉ xài một số thuộc tính thì tạo một object body khác

      const body = {
         ...values,
         role: "administrator"
      };
      props
         .login(body)
         .then((res) => {
            props.history.push(PATH.DASHBOARD);
         })
         .catch((err) => {
            message.error("Tài khoản hoặc mật khẩu không chính xác!");
         });
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   useEffect(() => {
      if (props.user) {
         props.history.push(PATH.DASHBOARD);
      }
   }, [props.user]);

   return (
      <WrapLoginPage className='d-flex justify-content-center align-items-center'>
         <Form {...layout} name='basic' initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Email'
               name='email'
               rules={[
                  {
                     required: true,
                     message: "Please input your email!"
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

            {/* <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
               <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
            </Form.Item>
         </Form>
      </WrapLoginPage>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(Login);
