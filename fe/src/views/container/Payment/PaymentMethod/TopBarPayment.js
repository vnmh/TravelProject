import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const TopBarPaymentStyled = styled.div``;

function TopBarPayment(props) {
   return (
      <TopBarPaymentStyled>
         <section className='breadcrumb-area bread-bg-3'>
            <div className='breadcrumb-wrap'>
               <div className='container'>
                  <div className='row align-items-center'>
                     <div className='col-lg-6'>
                        <div className='breadcrumb-content'>
                           <div className='section-heading'>
                              <h2 className='sec__title text-white'>Đặt tour</h2>
                           </div>
                        </div>
                     </div>
                     <div className='col-lg-6'>
                        <div className='breadcrumb-list text-right'>
                           <ul className='list-items'>
                              <li>
                                 <Link to='/homepage'>Trang Chủ</Link>
                              </li>
                              <li>Tour</li>
                              <li>Đặt tour</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='bread-svg-box'>
               <svg
                  className='bread-svg'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 100 10'
                  preserveAspectRatio='none'>
                  <polygon points='100 0 50 10 0 0 0 10 100 10' />
               </svg>
            </div>
         </section>
      </TopBarPaymentStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(TopBarPayment);
