import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row, Select, DatePicker, InputNumber, Cascader, message } from "antd";
import { PROVINCES } from "~/configs/VNprovinces";
import moment from "moment";
import { mapAddressNotWardToOptionAntd } from "~/configs/addressVN";
import { SERVICES } from "~/configs/servicesConfig";
import { TYPE_TOUR } from "~/configs/const";
import { PEOPLE_NUM } from "~/configs/const";
import { getServices } from "~/state/ducks/appApis/actions";
const { Option } = Select;
const CRUDTourAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 12 }
};

const CRUDTourAdmin = (props) => {
   const [form] = Form.useForm();

   const onFinish = (values) => {
      // Nếu currentEdit có dữ liệu thì gọi API update, không thì gọi API create
      if (props.currentEdit) {
         //Gọi API update tour
         //Trước khi gọi API phải map thành JSON hết những dữ liệu Địa điểm, Dịch vụ
         const bodyUpdate = {
            ...values,
            // values.address là một mảng, khi lưu xuống CSDL cần phải chuyển thành string bằng phương thức join
            address: values?.address.join(","),
            services: values?.services.join(","),
            idTour: props.currentEdit?.idTour
         };
         props
            .putTour(bodyUpdate)
            .then((res) => {
               message.success("Thành công!");
               //Success: gọi lại API lấy dữ liệu ở table VÀ đóng form edit lại, thông báo cho người dùng
               props.setCurrentEdit(undefined);
            })
            .catch((err) => {
               console.log("hiendev ~ file: CRUDTourAdmin.js ~ line 48 ~ onFinish ~ err", err);
               message.error(JSON.stringify(err));
            });
         //Fail: không làm gì
      } else {
         //Gọi API post tour
         const bodyCreate = values;
         console.log("hiendev ~ file: CRUDTourAdmin.js ~ line 42 ~ onFinish ~ bodyCreate", bodyCreate);
         props
            .postTour(bodyCreate)
            .then((res) => {
               message.success("Thành công!");
               //Success: thì đóng form create lại và thông báo cho người dùng
               props.setCurrentEdit(bodyCreate);
               props.setIsCreateTour(false);
            })
            .catch((err) => {
               message.error("Thất bại!");
               console.log("hiendev ~ file: EditTourAdmin.js ~ line 30 ~ onFinish ~ err", err);
            });
         //Fail: không làm gì
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   // for submit
   useEffect(() => {
      if (props.isSubmit) {
         form.submit();
         props.setIsSubmit(false);
      }
   }, [props.isSubmit]);

   // services
   const [services, setServices] = useState([]);
   useEffect(() => {
      props
         .getServices()
         .then(({ res }) => {
            setServices(res || []);
         })
         .catch((err) => {
            console.error("hiendev ~ file: CRUDTourAdmin.js ~ line 234 ~ getServices ~ err", err);
         });
   }, []);
   // services
   return (
      <CRUDTourAdminStyled>
         <Form
            form={form} //ref
            {...layout}
            name='basic'
            initialValues={{
               // Để load dữ liệu đã có lên
               ...props.currentEdit,
               departureDay: moment(props.currentEdit?.departureDay),
               address: props.currentEdit?.address ? props.currentEdit?.address : undefined, // vì đã map bên kia ròi, ở đây không cần làm lại
               services: props.currentEdit?.services ? props.currentEdit?.services : undefined // vì đã map bên kia ròi, ở đây không cần làm lại
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <div className='row overflow-hidden'>
               <Form.Item
                  className='col-6'
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
               <Form.Item
                  className='col-6'
                  label='Giá'
                  name='price'
                  rules={[{ required: true, message: "Hãy nhập tên giá tour!" }]}>
                  <InputNumber
                     style={{ width: "100%" }}
                     min={0}
                     step={1000}
                     formatter={(value) => `${value} VNĐ`}
                     parser={(value) => value.replace(" VNĐ", "")}
                  />
               </Form.Item>
               <Form.Item
                  className='col-6'
                  label='Ngày khởi hành'
                  name='departureDay'
                  rules={[{ required: true, message: "Hãy nhập tên ngày khởi hành!" }]}>
                  <DatePicker
                     format='DD/MM/YYYY'
                     // value của thằng này là một dạng moment (from momentjs)
                  />
               </Form.Item>
               <Form.Item
                  className='col-6'
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
               <Form.Item className='col-6' label='Youtube' name='video'>
                  <Input />
               </Form.Item>
               <Form.Item
                  className='col-6'
                  label='Độ tuổi thấp nhất'
                  name='minAge'
                  rules={[{ required: true, message: "Hãy nhập độ tuổi thấp nhất!" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} max={80} step={1} />
               </Form.Item>

               <Form.Item
                  className='col-6'
                  label='Số người'
                  name='groupSize'
                  rules={[{ required: true, message: "Hãy nhập số người!" }]}>
                  <Select
                     style={{ width: "100%" }}
                     placeholder='Chọn số người'
                     optionFilterProp='children'
                     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                     {PEOPLE_NUM.map((pNum) => {
                        return <Option value={pNum}>{`<${pNum}`}</Option>;
                     })}
                  </Select>
               </Form.Item>

               <Form.Item
                  className='col-6'
                  label='Địa điểm'
                  name='address'
                  rules={[{ required: true, message: "Hãy nhập tên địa điểm!" }]}>
                  <Cascader
                     // defaultValue={["zhejiang", "hangzhou"]}
                     options={mapAddressNotWardToOptionAntd()}
                  />
               </Form.Item>
               <Form.Item
                  className='col-6'
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
               {/* <Form.Item
                  className='col-6'
                  label='Dịch vụ'
                  name='services'
                  rules={[{ required: true, message: "Hãy chọn loại dịch vụ!" }]}>
                  <Select
                     showSearch
                     mode='multiple'
                     style={{ width: "100%" }}
                     placeholder='Chọn dịch vụ'
                     optionFilterProp='children'
                     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                     {SERVICES.map((service) => {

                        return <Option value={service}>{service}</Option>;
                     })}
                  </Select>
               </Form.Item> */}
               <Form.Item
                  className='col-6'
                  label='Dịch vụ'
                  name='services'
                  rules={[{ required: true, message: "Hãy chọn loại dịch vụ!" }]}>
                  <Select
                     showSearch
                     mode='multiple'
                     style={{ width: "100%" }}
                     placeholder='Chọn dịch vụ'
                     optionFilterProp='children'
                     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                     {services.map((service) => {
                        return <Option value={service?.idServices + ""}>{service.titleService}</Option>;
                     })}
                  </Select>
               </Form.Item>
               <Form.Item
                  className='col-6'
                  label='Mô tả'
                  name='describe'
                  rules={[{ required: true, message: "Hãy nhập mô tả!" }]}>
                  <TextArea rows={4} />
               </Form.Item>
            </div>
            <div className='w-100 d-flex justify-content-center align-items-center'>
               <Button type='primary' htmlType='submit' className='mr-4'>
                  {props.currentEdit ? "Sửa" : "Thêm"}
               </Button>
               <Button
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreateTour && props.setIsCreateTour(undefined);
                  }}>
                  Đóng
               </Button>
            </div>
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
         putTour: appApisActions.putTour,
         getServices: appApisActions.getServices
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdmin);
