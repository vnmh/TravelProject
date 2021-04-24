import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row } from "antd";

const CRUDTourAdminStyled = styled.div``;

const layout = {
   // labelCol: { span: 24 },
   // wrapperCol: { span: 24 }
};

const CRUDTourAdmin = (props) => {
   
   const onFinish = (values) => {
      //Nếu currentEdit thì gọi API update, không thì gọi API create
      if (props.currentEdit) {
         //Gọi API update tour
         const bodyUpdate = { ...values, idTour: props.currentEdit?.idTour };
         console.log("hiendev ~ file: EditTourAdmin.js ~ line 27 ~ onFinish ~ bodyUpdate", bodyUpdate);
         props
            .patchTour(bodyUpdate)
            .then((res) => {
               //Success: thì đóng form edit lại và thông báo cho người dùng
               props.setCurrentEdit(undefined);
            })
            .catch((err) => {
               console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
            });

         //Fail: không làm gì
      } else {
         //Gọi API post tour
         const bodyCreate = {
            titleTour: "",
            price: 1000,
            sale: "",
            departureDay: "",
            describe: "",
            address: "",
            vocationTime: "",
            idAccount: "",
            tags: "",
            services: "",
            views: "",
            votes: "",
            reuse: "",
            type: "",
            ...values
         };
         console.log("hiendev ~ file: CRUDTourAdmin.js ~ line 42 ~ onFinish ~ bodyCreate", bodyCreate);

         props
            .postTour(bodyCreate)
            .then((res) => {
               //Success: thì đóng form create lại và thông báo cho người dùng
               props.setIsCreateTour(false);
            })
            .catch((err) => {
               console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
            });

         //Fail: không làm gì
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   console.log("hiendev ~ file: EditTourAdmin.js ~ line 78 ~ CRUDTourAdmin ~ props.currentEdit", props.user);
   return (
      <CRUDTourAdminStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               ...props.currentEdit
            }}
            name='horizontal_login'
            layout='inline'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Tên Tour'
               name='titleTour'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tên tour!"
                  }
               ]}>
               <Input />
            </Form.Item>
            <Form.Item
               label='Tên Tour'
               name='titleTour'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tên tour!"
                  }
               ]}>
               <Input />
            </Form.Item>

            <Form.Item>
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
               <Button
                  type='danger'
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreateTour && props.setIsCreateTour(undefined);
                  }}>
                  Đóng
               </Button>
            </Form.Item>
         </Form>
      </CRUDTourAdminStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDTourAdmin admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         patchTour: appApisActions.patchTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdmin);
