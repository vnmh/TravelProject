import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { Tooltip, Typography } from "antd";
import { firstImage, removeVietnameseTones } from "~/views/utilities/helpers/utilObject";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { TYPE_TOUR } from "~/configs/const";
import * as PATH from "~/configs/routesConfig";

const CardItemListTourStyled = styled.div``;

const CardItemListTour = (props) => {
   const [tours, setTours] = useState([]);
   const [toursDefault, setToursDefault] = useState([]);
   const handleChangeTable = (pagination, filters, sorter, extra) => {
      props.setPagination({
         ...props.pagination,
         page: pagination?.current,
         size: pagination?.pageSize
      });
   };

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
                  props.setPagination({
                     page: 1,
                     size: 10,
                     total: tourWithImage.length
                  });
                  setTours(tourWithImage);
                  setToursDefault(tourWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, []);

   useEffect(() => {
      switch (props.sortType) {
         case "price-low-to-high":
            setTours(_.orderBy(tours, ["price"], ["asc"]));
            break;
         case "price-high-to-low":
            setTours(_.orderBy(tours, ["price"], ["desc"]));
            break;
         case "filter-default":
            setTours(toursDefault);
            break;
         case "new-tour":
            setTours(_.orderBy(tours, ["dateEdited"], ["asc"]));
            break;
         case "a-to-z":
            setTours(_.orderBy(tours, ["titleTour"], ["asc"]));
            break;
         default:
            break;
      }
   }, [props.sortType]);

   useEffect(() => {
      let toursTemp = Array.from(toursDefault);
      if (props.searchTour?.destination) {
         toursTemp = toursTemp.filter((o) => {
            return _.lowerCase(removeVietnameseTones(o.address)).includes(
               _.lowerCase(removeVietnameseTones(props.searchTour?.destination))
            );
         });
      }
      // if (props.searchTour?.from) {
      //    toursTemp = _.filter(tours, (o) => {
      //       return true;
      //    });
      // }
      // if (props.searchTour?.to) {
      //    toursTemp = _.filter(tours, (o) => {
      //       return true;
      //    });
      // }
      if (props.searchTour?.type && props.searchTour?.type !== "all") {
         toursTemp = toursTemp.filter((o) => {
            return o.type === props.searchTour.type;
         });
      }

      if (
         !props.searchTour?.destination &&
         !props.searchTour?.from &&
         !props.searchTour?.to &&
         (props.searchTour?.type === "all" || !props.searchTour?.type)
      )
         toursTemp = Array.from(toursDefault);
      setTours(toursTemp); //tours
   }, [props.timeSubmit]);

   return (
      <CardItemListTourStyled>
         {tours.map((item, index) => {
            return (
               <div className='card-item card-item-list'>
                  <div className='card-img'>
                     <Link to={PATH.TOUR_DETAIL.replace(":id", item?.idTour)} className='d-block'>
                        <img
                           src={
                              item.images?.length > 0
                                 ? firstImage(_.head(item.images)?.url || "")
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
                           <Link to={PATH.TOUR_DETAIL.replace(":id", item?.idTour)}>
                              <Typography.Paragraph name='title' classname='text-link' ellipsis={{ rows: 2 }}>
                                 {item.titleTour}
                              </Typography.Paragraph>
                           </Link>
                        </Tooltip>
                     </h3>
                     <p className='card-meta'>{item.address}</p>
                     <p className='card-meta'>Loại tour: {TYPE_TOUR[item.type] || ""}</p>
                     <div className='card-rating'>
                        <span className='badge text-white'>4.4/5</span>
                        <span className='review__text'>Average</span>
                        <span className='rating__text'>(30 Reviews)</span>
                     </div>
                     <div className='card-price d-flex align-items-center justify-content-between'>
                        <p>
                           <span className='price__from'>Chỉ từ </span>
                           <span className='price__num'>{currencyFormat(item.price)}</span>
                        </p>
                        <span className='tour-hour'>
                           <i className='la la-clock-o mr-1' />
                           {item.vocationTime} ngày
                        </span>
                     </div>
                  </div>
               </div>
            );
         })}
      </CardItemListTourStyled>
   );
};

// export default connect(
//    (state) => ({
//       user: state["authUser"].user
//    }),
//    {
//       getTours: appApisActions.getTours,
//       getAllImagesTour: appApisActions.getAllImagesTour
//    }
// )(CardItemListTour);

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
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(CardItemListTour);
