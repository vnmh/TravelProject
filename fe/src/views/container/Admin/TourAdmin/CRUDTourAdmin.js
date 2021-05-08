import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row, Select, DatePicker, InputNumber, Cascader, message } from "antd";
import { PROVINCES } from "~/configs/VNprovinces";
import moment from "moment";
import { mapAddressNotWardToOptionAntd } from "~/configs/addressVN";
import { SERVICES } from "~/configs/servicesConfig";
import { TYPE_TOUR } from "~/configs/const";
const { Option } = Select;
const CRUDTourAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 8 }
};
const tailLayout = {
   wrapperCol: { offset: 20, span: 16 }
};

const CRUDTourAdmin = (props) => {
   const onFinish = (values) => {
      // Nếu currentEdit thì gọi API update, không thì gọi API create
      if (props.currentEdit) {
         //Gọi API update tour
         const bodyUpdate = {
            ...values,
            idTour: props.currentEdit?.idTour,
            address: values.address.join(","),
            services: values.services.join(",")
         };
         console.log("hiendev ~ file: EditTourAdmin.js ~ line 27 ~ onFinish ~ bodyUpdate", bodyUpdate);
         props
            .putTour(bodyUpdate)
            .then((res) => {
               //Success: thì đóng form edit lại và thông báo cho người dùng
               props.setCurrentEdit(undefined);
            })
            .catch((err) => {
               message.error(JSON.stringify(err));
               console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
            });
         //Fail: không làm gì
      } else {
         //Gọi API post tour
         const bodyCreate = values;
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

   return (
      <CRUDTourAdminStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               // Để load dữ liệu đã có lên
               ...props.currentEdit,
               departureDay: moment(props.currentEdit?.departureDay),
               address: props.currentEdit?.address ? props.currentEdit?.address.split(",") : undefined,
               services: props.currentEdit?.services ? props.currentEdit?.services.split(",") : undefined
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Tên tour'
               name='titleTour'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tên tour!"
                  }
               ]}>
               <Input />
            </Form.Item>

            <Form.Item label='Giá' name='price' rules={[{ required: true, message: "Hãy nhập tên giá tour!" }]}>
               <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={1000}
                  formatter={(value) => `${value}đ`}
                  parser={(value) => value.replace("đ", "")}
               />
            </Form.Item>
            <Form.Item
               label='Ngày khởi hành'
               name='departureDay'
               rules={[{ required: true, message: "Hãy nhập tên ngày khởi hành!" }]}>
               <DatePicker
                  format='DD/MM/YYYY'
                  // value của thằng này là một dạng moment (from momentjs)
               />
            </Form.Item>
            <Form.Item
               label='Địa điểm khởi hành'
               name='departureAddress'
               rules={[{ required: true, message: "Hãy nhập tên địa điểm!" }]}>
               <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder='Chọn địa chỉ'
                  optionFilterProp='children'
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {PROVINCES.map((province) => {
                     return <Option value={province}>{province}</Option>;
                  })}
               </Select>
            </Form.Item>

            <Form.Item label='Mô tả' name='describe' rules={[{ required: true, message: "Hãy nhập mô tả!" }]}>
               <TextArea rows={4} />
            </Form.Item>
            <Form.Item label='Địa điểm' name='address' rules={[{ required: true, message: "Hãy nhập tên địa điểm!" }]}>
               <Cascader
                  //
                  // defaultValue={["zhejiang", "hangzhou"]}
                  options={mapAddressNotWardToOptionAntd()}
               />
            </Form.Item>
            <Form.Item
               name='type'
               label='Loại tour'
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: "Hãy chọn loại tour!"
                  }
               ]}>
               <Select style={{ width: "100%" }}>
                  {Object.keys(TYPE_TOUR).map((o) => {
                     return <Option value={o}>{TYPE_TOUR[o]}</Option>;
                  })}
               </Select>
            </Form.Item>
            <Form.Item label='Dịch vụ' name='services' rules={[{ required: true, message: "Hãy chọn loại dịch vụ!" }]}>
               <Select
                  showSearch
                  mode='multiple'
                  style={{ width: "100%" }}
                  placeholder='Chọn dich vụ'
                  optionFilterProp='children'
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {SERVICES.map((service) => {
                     return <Option value={service}>{service}</Option>;
                  })}
               </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
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
         putTour: appApisActions.putTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdmin);
