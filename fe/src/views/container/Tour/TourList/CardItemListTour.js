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
import { SCHEDULE_ENUM, TYPE_TOUR } from "~/configs/const";
import * as PATH from "~/configs/routesConfig";
import queryString from "query-string";
import Rating from "../../Homepage/Rating";

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
      const params = queryString.parse(window.location.search);
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
                  setToursDefault(tourWithImage);
                  props.setTourCount(tourWithImage.length);
                  if (params.address) {
                     let toursTemp = Array.from(tourWithImage);
                     toursTemp = toursTemp.filter((o) => {
                        return _.lowerCase(removeVietnameseTones(o.address)).includes(
                           _.lowerCase(removeVietnameseTones(props.addressType ? props.addressType : params.address))
                        );
                     });
                     setTours(toursTemp);
                  } else if (+params.price) {
                     let toursTemp = Array.from(tourWithImage);
                     toursTemp = toursTemp.filter((o) => {
                        switch (+params.price) {
                           case 1000000:
                              // <Option value={1000000}>0 - 1,000,000</Option>
                              return o.price > 0 && o.price < 1000000;
                           case 5000000:
                              // <Option value={5000000}>1,000,001 - 5,000,000</Option>
                              return o.price > 1000000 && o.price < 5000000;
                           case 10000000:
                              // <Option value={10000000}>> 10.000.000</Option>
                              return o.price > 10000000;
                           default:
                              break;
                        }
                     });
                     setTours(toursTemp);
                  } else setTours(tourWithImage);
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
      if (props.addressType) {
         toursTemp = toursTemp.filter((o) => {
            return _.lowerCase(removeVietnameseTones(o.address)).includes(
               _.lowerCase(removeVietnameseTones(props.addressType))
            );
         });
      }
      setTours(toursTemp); //tours
   }, [props.addressType]);

   useEffect(() => {
      let toursTemp = Array.from(toursDefault);
      if (props.searchTour?.destination) {
         toursTemp = toursTemp.filter((o) => {
            return _.lowerCase(removeVietnameseTones(o.address)).includes(
               _.lowerCase(removeVietnameseTones(props.searchTour?.destination))
            );
         });
      }

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

   // Price
   useEffect(() => {
      let toursTemp = Array.from(toursDefault);
      if (props.price) {
         toursTemp = toursTemp.filter((o) => {
            switch (props.price) {
               case 1000000:
                  // <Option value={1000000}>0 - 1,000,000</Option>
                  return o.price > 0 && o.price < 1000000;
               case 5000000:
                  // <Option value={5000000}>1,000,001 - 5,000,000</Option>
                  return o.price > 1000000 && o.price < 5000000;
               case 10000000:
                  // <Option value={10000000}>> 10.000.000</Option>
                  return o.price > 10000000;
               default:
                  break;
            }
         });
         console.log(`ithoangtan -  ~ file: CardItemListTour.js ~ line 193 ~ useEffect ~ toursTemp`, toursTemp);

         setTours(toursTemp); //tours
      }
   }, [props.price]);

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
                     <p className='card-meta'>Lo???i tour: {TYPE_TOUR[item.type] || ""}</p>
                     <Rating item={item}></Rating>
                     <div className='card-price d-flex align-items-center justify-content-between'>
                        <p>
                           <span className='price__from'>Ch??? t??? </span>
                           <span className='price__num'>{currencyFormat(item.price)}</span>/ng?????i
                        </p>
                        <span>
                           <i className='la la-clock mr-1' />
                           {item.vocationTime} ng??y
                           {item.schedule
                              ? ` (${SCHEDULE_ENUM[item.schedule]})`
                              : item.scheduleLoop
                              ? " (M???i " + item.scheduleLoop + " ng??y)"
                              : undefined}
                        </span>
                     </div>
                  </div>
               </div>
            );
         })}
      </CardItemListTourStyled>
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
   withRouter //????? push(nh???y qua trang kh??c) l?? ch??? y???u
)(CardItemListTour);
