import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { Select, Button, DatePicker, Form, Input } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import moment from "moment";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { useForm } from "antd/lib/form/Form";
import { TYPE_TOUR } from "~/configs/const";
const { Option } = Select;

const SearchListTourStyled = styled.div``;

const SearchListTour = (props) => {
   const [form] = useForm();
   const layout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
   };

   const handleChange = (value) => {
      props.setSearchTour(value);
      console.log(`selected ${value}`);
   };

   const onFinish = (values) => {
      //Chuyển dữ liệu thành query
      const from = UtilDate.toDateLocal(values.from);
      const to = UtilDate.toDateLocal(values.to);
      const params = {
         ...values,
         from,
         to
      };
      props.setSearchTour(params);
      props.setTimeSubmit(Date.now());
   };
   return (
      <SearchListTourStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Bạn muốn đi đâu?</h3>
            <div className='sidebar-widget-item'>
               <div className='contact-form-action'>
                  <Form
                     form={form}
                     initialValues={{
                        destination: "",
                        type: "all"
                     }}
                     name='basic'
                     className='row'
                     {...layout}
                     onFinish={onFinish}>
                     <div className='col-lg-12'>
                        <Form.Item
                           name='destination'
                           className='input-box'
                           label={<label className='label-text'>Điểm đến</label>}>
                           <Input type='text' placeholder='Bạn muốn đi đâu?' width='100%' />
                        </Form.Item>
                     </div>

                     <div className='col-lg-12'>
                        <Form.Item
                           name='from'
                           className='input-box'
                           label={<label className='label-text'>Ngày đi</label>}>
                           <DatePicker
                              disabledDate={(current) => {
                                 // Can not select days before today
                                 return current && current < moment().subtract(1, "day").endOf("day");
                              }}
                              style={{ width: "100%" }}
                           />
                        </Form.Item>
                     </div>

                     <div className='col-lg-12'>
                        <Form.Item
                           name='to'
                           className='input-box'
                           label={<label className='label-text'>Ngày về</label>}>
                           <DatePicker
                              disabledDate={(current) => {
                                 // Can not select days before today and today
                                 return current && current < form.getFieldValue("from")?.endOf("day");
                              }}
                              style={{ width: "100%" }}
                           />
                        </Form.Item>
                     </div>

                     <div className='col-lg-12'>
                        <Form.Item name='type' label={<label className='label-text'>Loại tour</label>}>
                           <Select style={{ width: "100%" }} onChange={handleChange}>
                              {Object.keys(TYPE_TOUR).map((o) => {
                                 return <Option value={o}>{TYPE_TOUR[o]}</Option>;
                              })}
                           </Select>
                        </Form.Item>
                     </div>

                     <div className='d-flex justify-content-end w-100 col-12'>
                        <Button type='primary' size='large' className='btn-box pt-2' htmlType='submit'>
                           Tìm kiếm
                        </Button>
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </SearchListTourStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(SearchListTour);
