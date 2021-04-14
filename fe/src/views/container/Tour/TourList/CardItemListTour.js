import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { Tooltip, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";

const CardItemListTourStyled = styled.div``;

const CardItemListTour = (props) => {
   const [tours, setTours] = useState([]);
   const [images, setImages] = useState([]);

   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            props
               .getAllImagesTour()
               .then((resImg) => {
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
                  console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, []);

   return (
      <CardItemListTourStyled>
         {tours.map((item, index) => {
            return (
               <div className='card-item card-item-list '>
                  <div className='card-img'>
                     <Link to='/tour-detail' className='d-block'>
                        <img
                           src={
                              _.get(_.head(item.images), "url")
                                 ? firstImage(_.get(_.head(item.images), "url", ""))
                                 : "images/destination-img7.jpg"
                           }
                           alt='Destination-img'
                        />
                     </Link>
                     <div
                        className='add-to-wishlist icon-element'
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Save for Later'>
                        <i className='la la-heart-o' />
                     </div>
                  </div>
                  <div className='card-body'>
                     <h3 className='card-title'>
                        <Tooltip title={item.titleTour}>
                           <Link to='/tour-detail'>
                              <Typography.Paragraph classname='text-link' ellipsis={{ rows: 2 }}>
                                 {item.titleTour}
                              </Typography.Paragraph>
                           </Link>
                        </Tooltip>
                     </h3>
                     <p className='card-meta'>124 E Huron St, New york</p>
                     <div className='card-rating'>
                        <span className='badge text-white'>4.4/5</span>
                        <span className='review__text'>Average</span>
                        <span className='rating__text'>(30 Reviews)</span>
                     </div>
                     <div className='card-price d-flex align-items-center justify-content-between'>
                        <p>
                           <span className='price__from'>From</span>
                           <span className='price__num'>$124.00</span>
                        </p>
                        <span className='tour-hour'>
                           <i className='la la-clock-o mr-1' />
                           Full day
                        </span>
                     </div>
                  </div>
               </div>
            );
         })}
      </CardItemListTourStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours,
      getAllImagesTour: appApisActions.getAllImagesTour
   }
)(CardItemListTour);
