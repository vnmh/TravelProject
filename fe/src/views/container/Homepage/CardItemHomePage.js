import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const CardItemHomePageStyled = styled.div`
   height: 100vh;
`;

const CardItemHomePage = (props) => {
   return (
      <CardItemHomePageStyled>
         <div className='card-item trending-card mb-0'>
            <div className='card-img'>
               <Link to='/tour-detail' className='d-block'>
                  <img src='images/img9.jpg' alt='Destination-img' />
               </Link>
               <span className='badge'>Bestseller</span>
            </div>
            <div className='card-body'>
               <h3 className='card-title mb-0'>
                  <Link to='/tour-detail'>Empire State Building Admission</Link>
               </h3>
               <div className='card-rating'>
                  <span className='badge text-white'>4.4/5</span>
                  <span className='rating__text'>30 Reviews</span>
               </div>
               <div className='card-price d-flex align-items-center justify-content-between'>
                  <span>
                     <i className='la la-clock mr-1' />5 Days
                  </span>
                  <p>
                     <span className='price__from'>from</span>
                     <span className='price__num'>$124.00</span>
                  </p>
               </div>
            </div>
         </div>
      </CardItemHomePageStyled>
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
)(CardItemHomePage);
