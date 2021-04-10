import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import { Carousel } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SliderHomePageStyled = styled.div`
   position: relative;
   img {
      object-fit: cover;
      max-width: 100%;
      mask-height: 450px !important;
   }
   .mask {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgb(170, 170, 170, 0.5);
      width: 100%;
      height: 450px;
   }
`;
const contentStyle = {
   height: "160px",
   // width: '100px',
   color: "#fff",
   lineHeight: "160px",
   textAlign: "center",
   background: "#364d79"
};

const SliderHomePage = (props) => {
   return (
      <SliderHomePageStyled>
         <Carousel autoplay id='fullscreen-slide-contain'>
            <img src='images/bg-1.jpg' alt='' />

            <img src='images/bg-1.jpg' alt='' />

            <img src='images/bg-1.jpg' alt='' />

            <img src='images/bg-1.jpg' alt='' />
         </Carousel>
         {/* <div className='mask'></div> */}
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
