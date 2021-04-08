import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SliderHomePageStyled = styled.div``;

const SliderHomePage = (props) => {
   return (
      <SliderHomePageStyled>
         <div id='fullscreen-slide-contain'>
            <ul className='slides-container'>
               <li>
                  <img src='images/hero-bg2.jpg' alt='' />
               </li>
               {/* <li>
                        <img src='images/hero--bg2.jpg' alt='' />
                     </li>
                     <li>
                        <img src='images/hero--bg3.jpg' alt='' />
                     </li> */}
            </ul>
         </div>
      </SliderHomePageStyled>
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
)(SliderHomePage);
