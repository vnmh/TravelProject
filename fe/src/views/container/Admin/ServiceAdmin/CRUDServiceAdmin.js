import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, message } from "antd";

const CRUDServiceAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 12 }
};

const CRUDServiceAdmin = (props) => {
   const onFinish = (values) => {
      if (props.currentEdit) {
         const bodyUpdate = {
            ...values,
            idServices: props.currentEdit?.idServices,
         };
         props
            .putService(bodyUpdate)
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
            .postService(bodyCreate)
            .then((res) => {
               message.success("Tạo dịch vụ thành công!");
               props.setIsCreateService(false);
            })
            .catch((err) => {
               console.log("hiendev ~ file: CRUDServiceAdmin.js ~ line 45 ~ onFinish ~ err", err)
               message.error("Thất bại!");
            });
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <CRUDServiceAdminStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               ...props.currentEdit
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Tên dịch vụ'
               name='titleService'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tiêu đề!"
                  }
               ]}>
               <Input />
            </Form.Item>
            <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: "Hãy nhập mô tả!" }]}>
               <TextArea rows={6} />
            </Form.Item>
            <div className='w-100 d-flex justify-content-center align-items-center'>
               <Button type='primary' htmlType='submit' className='mr-4'>
                  {props.currentEdit ? "Sửa" : "Thêm"}
               </Button>
               <Button
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreateService && props.setIsCreateService(undefined);
                  }}>
                  Đóng
               </Button>
            </div>
         </Form>
      </CRUDServiceAdminStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDServiceAdmin admin , không thì redirect tới homepage
      }),
      {
         // ServiceLogin: appApisActions.ServiceLogin
         getServices: appApisActions.getServices,
         postService: appApisActions.postService,
         putService: appApisActions.putService
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDServiceAdmin);
