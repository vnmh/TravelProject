import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const StatusPaymentStyled = styled.div``;

function StatusPayment(props) {
   return (
      <StatusPaymentStyled>
         <div className='form-title-wrap'>
            <div className='step-bar-wrap text-center'>
               <ul className='step-bar-list d-flex align-items-center justify-content-around'>
                  <li className='step-bar flex-grow-1 step-bar-active'>
                     <span className='icon-element'>1</span>
                     <p className='pt-2 color-text-2'>Chọn tour</p>
                  </li>
                  <li className='step-bar flex-grow-1 step-bar-active'>
                     <span className='icon-element'>2</span>
                     <p className='pt-2 color-text-2'>Thông tin chi tiết tour &amp; Thanh toán</p>
                  </li>
                  <li className='step-bar flex-grow-1'>
                     <span className='icon-element'>3</span>
                     <p className='pt-2 color-text-2'>Đặt tour thành công!</p>
                  </li>
               </ul>
            </div>
         </div>
      </StatusPaymentStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(StatusPayment);
