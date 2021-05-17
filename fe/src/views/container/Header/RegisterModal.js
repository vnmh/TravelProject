import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Form, Input, Button, Modal, message, Result } from "antd";
import * as PATH from "~/configs/routesConfig";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { ROLES } from "~/configs";

const RegisterModalStyled = styled(Modal)``;

const layout = {
   labelCol: { span: 24 },
   wrapperCol: { span: 24 }
};

const RegisterModal = (props) => {
   const [form] = Form.useForm();

   const [loading, setLoading] = useState(false);

   const [registerSuccess, setRegisterSuccess] = useState(false);

   const [email, setEmail] = useState("");
   const onFinish = (values) => {
      setLoading(true);
      console.log("hiendev ~ file: RegisterModal.js ~ line 22 ~ onFinish ~ values", values);
      // đã validate dữ liệu - map, check dữ liệu
      const body = {
         ...values,
         role: ROLES.user
      };
      // gọi API register

      props
         .register(body)
         .then(({ res }) => {
            console.log("hiendev ~ file: RegisterModal.js ~ line 30 ~ .then ~ res", res);
            // ! DO API nên phải check lỗi ở đây
            // Nếu mà trong res có statusCode === 200 và message thì show message
            if (res?.statusCode === 200 && res?.message) message.error(res?.message);
            // thông báo và redirect qua trang cần thiết theo điều kiện nhất định:
            else {
               // ! Lưu thông tin người dùng lại
               // Lưu ở redux with persisgate (professional) đã làm khi gọi API (redux with type: LOGIN_SUCCESS)

               // admin => dashboard của admin
               message.success("Đăng ký thành công!");
               setLoading(false);
               setEmail(values.email);
               setRegisterSuccess(true);
               form.resetFields();
               if (res?.role === ROLES.user) {
                  props.history.push(PATH.TOUR_GRID);
               }
               // user => (no redirect)
            }
         })
         .catch((err) => {
            console.log("hiendev ~ file: RegisterModal.js ~ line 53 ~ onFinish ~ err", err);
            if (err?.message) message.error(err?.message);
            setLoading(false);
            // ! Do API luôn trả về 200 nếu thực hiện thành công (request và nhận được response)
            // // check type error and show message
            // message.error(err?.message || "Đăng nhập thất bại");
         });
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   useEffect(() => {
      form.resetFields();
      setRegisterSuccess(false);
      setLoading(false);
      setEmail(false);
   }, [props.isModalVisible]);

   return (
      <RegisterModalStyled
         onCancel={props.onCancel} // Dấu X bên phải được click
         title='Đăng ký'
         visible={props.isModalVisible} // ẩn hay hiện là do component parent quyết định
         footer={[]} // ẩn 2 button Cancel and OK (default là Modal của ant luôn có 2 nút này)
      >
         {registerSuccess ? (
            <Result
               status='success'
               title='Đăng ký thành công'
               subTitle={
                  <span>
                     Một mail xác thực đã gửi tới hộp thư của bạn (<a href={`mailto:${email}`}>{email}</a>)
                  </span>
               }
            />
         ) : (
            <Form {...layout} form={form} name='register' onFinish={onFinish} onFinishFailed={onFinishFailed}>
               <Form.Item
                  label='Họ và tên'
                  name='name'
                  rules={[
                     {
                        required: true,
                        message: "Hãy nhập họ và tên của bạn!"
                     }
                  ]}>
                  <Input size='large' />
               </Form.Item>
               <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     {
                        required: true,
                        message: "Hãy nhập email của bạn!"
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
                  hasFeedback
                  rules={[
                     {
                        required: true,
                        message: "Hãy nhập mật khẩu của bạn!"
                     }
                  ]}>
                  <Input.Password size='large' />
               </Form.Item>
               <Form.Item
                  label='Nhập lại mật khẩu'
                  name='confirm password'
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                     {
                        required: true,
                        message: "Hãy nhập lại mật khẩu của bạn!"
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error("Hai mật khẩu đã nhập không trùng khớp!"));
                        }
                     })
                  ]}>
                  <Input.Password size='large' />
               </Form.Item>
               <Form.Item>
                  <Button loading={loading} size='large' style={{ width: "100%" }} type='primary' htmlType='submit'>
                     Đăng ký
                  </Button>
               </Form.Item>
            </Form>
         )}
      </RegisterModalStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postRegister: appApisActions.postRegister
         register: authActions.register
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(RegisterModal);
