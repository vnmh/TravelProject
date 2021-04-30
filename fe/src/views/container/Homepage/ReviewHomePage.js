import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const ReviewHomePageStyled = styled.div``;

const ReviewHomePage = (props) => {
   return (
      <ReviewHomePageStyled>
         <div className='col-lg-12'>
            <div className='testimonial-carousel carousel-action'></div>
            <div className='testimonial-card'>
               <div className='testi-desc-box'>
                  <p className='testi__desc'>
                     Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit anim laborum
                     sint occaecat cupidatat non proident. Occaecat cupidatat non proident des.
                  </p>
               </div>
               <div className='author-content d-flex align-items-center'>
                  <div className='author-img'>
                     <img src='images/team8.jpg' alt='testimonial image' />
                  </div>
                  <div className='author-bio'>
                     <h4 className='author__title'>Leroy Bell</h4>
                     <span className='author__meta'>United States</span>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                     </span>
                  </div>
               </div>
            </div>
         </div>
         {/* end testimonial-card */}
      </ReviewHomePageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ReviewHomePage);
