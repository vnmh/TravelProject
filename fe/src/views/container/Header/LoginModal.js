import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, Modal, message } from "antd";

import { authActions } from "~/state/ducks/authUser";
import { ROLES } from "~/configs/index";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const LoginModalStyled = styled(Modal)``;

const layout = {
   labelCol: { span: 24 },
   wrapperCol: { span: 24 }
};

const LoginModal = (props) => {
   const onFinish = (values) => {
      console.log("hiendev ~ file: LoginModal.js ~ line 22 ~ onFinish ~ values", values);
      // đã validate dữ liệu - map, check dữ liệu
      const body = {
         ...values,
         role: ROLES.administrator // tạm thời hard code để đăng nhập (sau khi sửa API thì không cần trường này nữa)
      };
      // gọi API login
      props
         .login(body)
         .then(({ res }) => {
            // ! DO API nên phải check lỗi ở đây
            // Nếu mà trong res có statusCode === 200 và message thì show message
            if (
               // Dấu hỏi có nghĩa là nếu res là undefined thì nó sẽ không truy cập tiếp nữa
               // để không báo lỗi khi có một phần tử undefined (ngoài phần tử cuối)
               res?.statusCode === 200 &&
               res?.message
            )
               message.error(res?.message);
            // thông báo và redirect qua trang cần thiết theo điều kiện nhất định:
            else {
               // ! Lưu thông tin người dùng lại
               // Lưu ở redux with persisgate (professional) đã làm khi gọi API (redux with type: LOGIN_SUCCESS)
               // xuống dòng 138 để biết cách lấy thông tin từ redux

               // admin => dashboard của admin
               message.success("Đăng nhập thành công!");
               if (res?.role === ROLES.administrator) {
                  props.history.push(PATH.TOUR_LIST);
               }
               // user => (no redirect)
            }
         })
         .catch((err) => {
            console.log("hiendev ~ file: LoginModal.js ~ line 56 ~ onFinish ~ err", err);
            if (err?.message) message.error(err?.message);
            // ! Do API luôn trả về 200 nếu thực hiện thành công (request và nhận được response)
            // // check type error and show message
            // message.error(err?.message || "Đăng nhập thất bại");
         });
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <LoginModalStyled
         onCancel={props.onCancel} // Dấu X bên phải được click
         title='Đăng nhập'
         visible={props.isModalVisible} // ẩn hay hiện là do component parent quyết định
         footer={[]} // ẩn 2 button Cancel and OK (default là Modal của ant luôn có 2 nút này)
      >
         <Form
            {...layout}
            name='login'
            initialValues={{
               remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Email'
               name='email'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập email để tiếp tục!"
                  },
                  {
                     type: "email",
                     message: "Email không hợp lệ!"
                  }
               ]}>
               <Input size='large' />
            </Form.Item>

            <Form.Item
               label='Mật khẩu'
               name='password'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập mật khẩu để tiếp tục!"
                  }
               ]}>
               <Input.Password size='large' />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked'>
               <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>

            <Form.Item>
               <Button size='large' style={{ width: "100%" }} type='primary' htmlType='submit'>
                  Đăng nhập
               </Button>
            </Form.Item>
         </Form>
      </LoginModalStyled>
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
)(LoginModal);
