import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";
import * as PATH from "~/configs/routesConfig";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { message, Tooltip, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Rating from "./Rating";
import { SCHEDULE_ENUM } from "~/configs/const";

const CarouselProviderWrapper = styled(CarouselProvider)`
   position: relative;
   .arrow-left {
      position: absolute;
      left: -15px;
      top: 200px;
      outline: none;
      border: none;
      border-radius: 50%;
   }
   .arrow-right {
      position: absolute;
      right: -15px;
      top: 200px;
      outline: none;
      border: none;
      border-radius: 50%;
   }
`;

const CardItemHomePage = (props) => {
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
                  setTours(tourWithImage);
               })
               .catch((err) => {
                  message.error("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
                  console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
               });
         })
         .catch((err) => {
            message.error("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);

            console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
         });
   }, []);

   return (
      <CarouselProviderWrapper
         naturalSlideWidth={100}
         naturalSlideHeight={160}
         totalSlides={tours.length}
         visibleSlides={3}
         step={3}>
         <Slider>
            {tours.map((item, index) => {
               return (
                  <Slide>
                     <div className='card-item trending-card mb-0 mr-2'>
                        <div className='card-img'>
                           <Link to={PATH.TOUR_DETAIL.replace(":id", item.idTour)} className='d-block'>
                              <img
                                 style={{ maxHeight: 203.65, objectFit: "cover" }}
                                 src={
                                    _.get(_.head(item.images), "url")
                                       ? firstImage(_.get(_.head(item.images), "url", ""))
                                       : "images/destination-img7.jpg"
                                 }
                                 alt='Destination-img'
                              />
                           </Link>
                           {item?.sale > 0 ? <span className='badge'>Tour bán chạy</span> : ""}
                        </div>
                        <div className='card-body' style={{ minHeight: 207 }}>
                           <h3 className='card-title'>
                              <Tooltip title={item.titleTour}>
                                 <Link to={PATH.TOUR_DETAIL.replace(":id", item.idTour)}>
                                    <Typography.Paragraph
                                       className='text_link mb-2'
                                       style={{ minHeight: 45 }}
                                       ellipsis={{ rows: 2 }}>
                                       {item.titleTour}
                                    </Typography.Paragraph>
                                 </Link>
                              </Tooltip>
                           </h3>
                           <Rating item={item}></Rating>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <div>
                                 <p className='m-0'>
                                    <span>
                                       <i className='la la-clock mr-1' />
                                       {item.vocationTime} ngày
                                    </span>
                                 </p>
                                 <p className='m-0'>
                                    {item.schedule
                                       ? ` (${SCHEDULE_ENUM[item.schedule]})`
                                       : item.scheduleLoop
                                       ? " (Mỗi " + item.scheduleLoop + " ngày)"
                                       : undefined}
                                 </p>
                              </div>
                              <p>
                                 <span className='price__from'>Từ </span>
                                 <span className='price__num'>{currencyFormat(item.price)}</span>/người
                              </p>
                           </div>
                        </div>
                     </div>
                  </Slide>
               );
            })}
         </Slider>
         <ButtonBack className='arrow-left'>
            <LeftCircleOutlined style={{ fontSize: 40, color: "#595959" }} />
         </ButtonBack>
         <ButtonNext className='arrow-right'>
            <RightCircleOutlined style={{ fontSize: 40, color: "#595959" }} />
         </ButtonNext>
      </CarouselProviderWrapper>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CardItemHomePage);
