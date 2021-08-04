import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Form, Input } from "antd";
import { phoneRegex } from "~/views/utilities/validation/input";

const YourInfoStyled = styled.div``;

function YourInfo(props) {
   const [form] = Form.useForm();
   useEffect(() => {
      form.setFieldsValue(props.user);
      props.user?.email && props.setInfoTrue(true);
      props.setInfo(props.user);
   }, [props.user?.email]);

   const onFieldsChange = async (changedFields, allFields) => {
      const checkFields = allFields.map((f) => {
         if (f.errors?.length > 0) return "";
         return f.value;
      });
      const values = await form.getFieldsValue();
      if (_.compact(checkFields).length === allFields.length) {
         props.setInfoTrue(true);
         props.setInfo({
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
         });
      } else props.setInfoTrue(false);
   };

   const onFinish = (values) => {
      console.log(`file: YourInfo.js ~ line 29 ~ onFinish ~ values`, values);
   };

   const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
   };
   return (
      <YourInfoStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <h3 className='title'>Thông tin khách hàng</h3>
            </div>
            <div className='form-content '>
               <div className='contact-form-action'>
                  <Form
                     form={form}
                     name='info_form'
                     {...formItemLayout}
                     onFinish={onFinish}
                     onFieldsChange={onFieldsChange}>
                     <Form.Item
                        name='name'
                        label='Name'
                        rules={[
                           {
                              required: true,
                              message: "Please input your name"
                           }
                        ]}>
                        <Input placeholder='' />
                     </Form.Item>
                     <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                           {
                              required: true,
                              message: "Please input your E-mail"
                           },
                           {
                              type: "email",
                              message: "E-mail is not valid!"
                           }
                        ]}>
                        <Input placeholder='' type='email' />
                     </Form.Item>
                     <Form.Item
                        name='phone'
                        label='Phone'
                        rules={[
                           {
                              required: true,
                              message: "Please input your phone"
                           },
                           {
                              pattern: phoneRegex,
                              message: "Phone is not valid!"
                           }
                        ]}>
                        <Input placeholder='' type='phone' />
                     </Form.Item>
                     <Form.Item
                        name='address'
                        label='Address'
                        rules={[
                           {
                              required: true,
                              message: "Please input your address"
                           }
                        ]}>
                        <Input placeholder='' />
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </YourInfoStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(YourInfo);
