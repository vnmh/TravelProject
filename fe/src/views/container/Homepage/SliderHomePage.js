import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";
import { authActions } from "~/state/ducks/authUser";
import { Carousel } from "antd";
import { Typography, Button } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";
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
   .title-tour {
      color: #444444;
      text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc, 1px 2px 1px #eeeeee,
         3px 2px 1px #cccccc, 2px 3px 1px #eeeeee, 4px 3px 1px #cccccc, 3px 4px 1px #eeeeee, 5px 4px 1px #cccccc,
         4px 5px 1px #eeeeee, 6px 5px 1px #cccccc, 5px 6px 1px #eeeeee, 7px 6px 1px #cccccc;
   }
   .text-describe{
      font-size: 16px;
      letter-spacing: 0px;
      word-spacing: 2px;
      color: #000000;
      text-decoration: none;_normal
      font-style: normal;
      font-variant: normal;
      text-transform: none;
      text-shadow: 4px 4px 2px rgba(0,0,0,0.6);
   }
`;

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
                  tourWithImage.length = 3;
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
            {tours.map((item) => {
               return (
                  <div style={{ height: 500, maxWidth: "100%" }} className='position-relative'>
                     <div
                        className='position-absolute'
                        style={{ marginLeft: 220, marginTop: 35, maxWidth: window.innerWidth * 0.7 }}>
                        <Typography.Title className='title-tour'>{item.titleTour}</Typography.Title>
                        <Typography.Paragraph
                           ellipsis={{ rows: 3 }}
                           strong
                           className='text-wrap text-describe'
                           style={{ color: "white" }}>
                           {item.describe}
                        </Typography.Paragraph>
                        <Button type="primary" size='large' className="float-right">
                           Xem chi tiết
                        </Button>
                     </div>
                     <img
                        style={{ objectFit: "cover", width: "100%" }}
                        src={
                           _.get(_.head(item.images), "url")
                              ? firstImage(_.get(_.head(item.images), "url", ""))
                              : "images/destination-img7.jpg"
                        }
                        alt='Destination-img'
                     />
                  </div>
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
