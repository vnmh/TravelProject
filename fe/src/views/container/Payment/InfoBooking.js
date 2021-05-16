import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useHistory, useRouteMatch } from "react-router";
import { message } from "antd";
import queryString from "query-string";

const InfoBookingStyled = styled.div``;

function InfoBooking(props) {
   const [orderDetail, setOrderDetail] = useState();
   const params = queryString.parse(window.location.search);
   console.log("maidev ~ file: InfoBooking.js ~ line 16 ~ InfoBooking ~ params", params);

   const hisory = useHistory();
   console.log("hiendev ~ file: index.js ~ line 18 ~ TourDetail ~ hisory", hisory);
   const match = useRouteMatch();
   console.log("hiendev ~ file: index.js ~ line 20 ~ TourDetail ~ match", match);

   useEffect(() => {
   
      let tourDetail = {};
      props
         .getOrder({ idOrder: params.idOrder, PIN: params.orderId })
         .then(({ res }) => {
            tourDetail = Object.assign(tourDetail, { order: res });

            props.getTour(res.idTour).then(({ res }) => {
               props.getAllImagesTour().then((resImg) => {
                  tourDetail = Object.assign(tourDetail, {
                     ...res,
                     images: resImg.res.filter((image) => {
                        return res.idTour === image.idTour;
                     })
                  });
                  setOrderDetail(tourDetail);
               });
            });
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);

   return (
      <InfoBookingStyled>
         <div className='payment-received-list'>
            <h3 className='title font-size-24'>{orderDetail?.titleTour}</h3>
            <div className='card-rating'>
               <span className='badge badge-warning text-white'>4.4/5</span>
               <span className='review__text text-warning'>Average</span>
               <span className='rating__text'>(30 Reviews)</span>
            </div>
            <ul className='list-items list-items-2 py-3'>
               <li>
                  <span>Location:</span>Delaware, OH, USA
               </li>
               <li>
                  <span>Check-in:</span>Thu 30 Mar, 2020
               </li>
               <li>
                  <span>Check-out:</span>Sat 01 Jun, 2020
               </li>
               <li>
                  <span>Booking details:</span>2 Nights, 1 Room, Max 2 Adult(s)
               </li>
               <li>
                  <span>Room type:</span>Luxury View Suite
               </li>
               <li>
                  <span>Client:</span>David Martin
               </li>
            </ul>
         </div>
      </InfoBookingStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getOrder: appApisActions.getOrder,
      getAllImagesTour: appApisActions.getAllImagesTour
   }
)(InfoBooking);
