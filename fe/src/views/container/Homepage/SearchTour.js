import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import { Form, Input, DatePicker, Select, Button } from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import UtilDate from "~/views/utilities/helpers/UtilDate";
import * as PATH from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchTourPageStyled = styled.div`
   height: 100vh;
`;
const layout = {
   labelCol: { span: 24 },
   wrapperCol: { span: 24 }
};

const SearchTour = (props) => {
   const onFinish = (values) => {
      console.log("hiendev ~ file: SearchTour.js ~ line 30 ~ onFinish ~ values", values);
      //Chuyển dữ liệu thành query
      const from = UtilDate.toDateLocal(_.head(values.days));
      const to = UtilDate.toDateLocal(_.last(values.days));
      const params = {
         destination: values.destination,
         from,
         to,
         price: values.price
      };
      console.log("hiendev ~ file: SearchTour.js ~ line 40 ~ onFinish ~ params", params);
      //sau đó chuyển sang trang danh sách tour
      props.history.push(PATH.TOUR_LIST + parseObjToQuery(params));
   };

   return (
      <SearchTourPageStyled>
         <div className='search-fields-container'>
            <div className='contact-form-action'>
               <Form name='basic' className='row' {...layout} onFinish={onFinish}>
                  <div className='col-lg-4'>
                     <Form.Item
                        name='destination'
                        className='input-box'
                        label={<label className='label-text'>Điểm đến</label>}>
                        <Input size='large' type='text' placeholder='Bạn muốn đi đâu?' width='100%' />
                     </Form.Item>
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-4'>
                     <Form.Item
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn thời gian!"
                           }
                        ]}
                        name='days'
                        className='input-box'
                        label={<label className='label-text'>Thời gian</label>}>
                        <RangePicker
                           disabledDate={(current) => {
                              return current && current < moment().subtract(1, "day").endOf("day");
                           }}
                           size='large'
                           style={{ width: "100%" }}
                        />
                     </Form.Item>
                  </div>

                  {/* end col-lg-4 */}
                  <div className='col-lg-4'>
                     <Form.Item name='price' className='input-box' label={<label className='label-text'>Giá</label>}>
                        <Select size='large' placeholder='Chọn giá' style={{ width: "100%" }}>
                           <Option value={1000000}>0 - 1000000</Option>
                        </Select>
                     </Form.Item>
                  </div>
                  {/* end col-lg-3 */}
                  <div className='d-flex justify-content-end w-100 col-12'>
                     <Button type='primary' size='large' className='btn-box pt-2' htmlType='submit'>
                        Tìm kiếm
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
      </SearchTourPageStyled>
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
)(SearchTour);
