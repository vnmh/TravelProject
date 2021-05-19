import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import queryString from 'query-string'

const PaymentDetailStyled = styled.div``;

function PaymentDetail(props) {
   const params = queryString.parse(window.location.search);
   console.log("hiendev ~ file: PaymentDetail.js ~ line 13 ~ PaymentDetail ~ params", params)

   console.log("hiendev ~ file: InfoBooking.js ~ line 22 ~ InfoBooking ~ props.orderDetail", props.orderDetail);

   return (
      <PaymentDetailStyled>
         <div className='row pt-3'>
            <div className='col-lg-12'>
               <div className='payment-received-list'>
                  <h2 className='title'>Thông tin thanh toán chi tiết</h2>
                  <div className='table-form table-layout-2 table-responsive pt-3'>
                     <table className='table'>
                        <thead>
                           <tr>
                              <th scope='col'>Tour</th>
                              <th scope='col' className='text-right'>
                                 Tổng cộng
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th scope='row'>
                                 <div className='table-content'>
                                    <p className='font-size-15 text-gray line-height-20 font-weight-medium'>
                                       <span className='mr-2 color-text-2'>Giá gốc:</span>
                                    </p>
                                    <p className='font-size-15 text-gray line-height-20 font-weight-medium'>
                                       <span className='mr-2 color-text-2'>Phương thức thanh toán:</span>Thu 30 Mar,
                                       2020
                                    </p>
                                 </div>
                              </th>
                              <td>
                                 <div className='table-content text-right'>
                                    <h3 className='title color-text'>
                                       {currencyFormat(
                                          props.orderDetail?.price * props.orderDetail?.order?.numberPeople
                                       )}
                                    </h3>
                                 </div>
                              </td>
                           </tr>
                           <tr>
                              <th scope='row'>
                                 <div className='table-content'>
                                    <p className='title'>Khuyến mãi</p>
                                 </div>
                              </th>
                              <td>
                                 <div className='table-content text-right'>
                                    <h3 className='title color-text'>
                                       {currencyFormat(
                                          props.orderDetail?.price *
                                             props.orderDetail?.sale *
                                             0.01 *
                                             props.orderDetail?.order?.numberPeople
                                       )}{" "}
                                       ({currencyFormat(props.orderDetail?.sale, "%")})
                                    </h3>
                                 </div>
                              </td>
                           </tr>
                           <tr>
                              <th scope='row'>
                                 <div className='table-content'>
                                    <p className='title'>Tổng cộng</p>
                                 </div>
                              </th>
                              <td>
                                 <div className='table-content text-right'>
                                    <h3 className='title color-text'>
                                       {currencyFormat(
                                          props.orderDetail?.price * props.orderDetail?.order?.numberPeople -
                                             props.orderDetail?.price *
                                                props.orderDetail?.sale *
                                                0.01 *
                                                props.orderDetail?.order?.numberPeople
                                       )}
                                    </h3>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </PaymentDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {}
)(PaymentDetail);
