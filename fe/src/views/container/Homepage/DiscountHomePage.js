import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import { Carousel } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const DiscountHomePageStyled = styled.div``;
const contentStyle = {};

const DiscountHomePage = (props) => {
   return (
      <DiscountHomePageStyled>
            <div className='flip-box'>
               <div className='flip-box-front'>
                  <img src='images/img1.jpg' alt='' className='flip-img' />
                  <a href='#' className='flip-content d-flex align-items-end justify-content-start'>
                     <h3 className='flip-title'>Phú Quốc</h3>
                  </a>
                  {/* end flip-content */}
               </div>
               {/* end flip-box-front */}
               <div className='flip-box-back'>
                  <img src='images/img1.jpg' alt='' className='flip-img' />
                  <a href='#' className='flip-content d-flex align-items-center justify-content-center'>
                     <div>
                        <div className='icon-element mx-auto mb-3 bg-white text-color-2'>
                           <i className='la la-arrow-right' />
                        </div>
                        <h3 className='flip-title'>Explore Activity</h3>
                     </div>
                  </a>
                  {/* end flip-content */}
               </div>
               {/* end flip-box-back */}
            </div>
            {/* end flip-box */}
         {/* end col-lg-3 */}
      </DiscountHomePageStyled>
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
)(DiscountHomePage);
