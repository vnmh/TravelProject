import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";

import { authActions } from "~/state/ducks/authUser";
import { Carousel } from "antd";
import { Tooltip, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SearchTour from "./SearchTour";

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
   const [tours, setTours] = useState([]);

   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            props
               .getAllImagesTour()
               .then((resImg) => {
                  // setImages(res);
                  const tourWithImage = res.map((tour) => {
                     return {
                        ...tour,
                        images: resImg.res.filter((image) => {
                           return tour.idTour === image.idTour;
                        })
                     };
                  });
                  tourWithImage.length=3;
                  setTours(tourWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
         });
   }, []);
   return (
      <SliderHomePageStyled>
         <Carousel id='fullscreen-slide-contain' style={{ height: 500 }}>
            {tours.map((item, index) => {
               return (
                  <img
                     style={{ height: 500, maxWidth: "100%" }}
                     src={
                        _.get(_.head(item.images), "url")
                           ? firstImage(_.get(_.head(item.images), "url", ""))
                           : "images/destination-img7.jpg"
                     }
                     alt='Destination-img'
                  />
               );
            })}
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
         login: authActions.login,
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(SliderHomePage);
