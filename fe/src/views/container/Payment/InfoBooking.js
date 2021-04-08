import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import InfoTour from "../Tour/InfoTour";
import YourInfo from "./YourInfo";
import PaymentMethod from "./PaymentMethod";
import BookingDetail from "./BookingDetail";

const InfoBookingStyled = styled.div``;

function InfoBooking(props) {
   return (
      <InfoBookingStyled>
         <div className='payment-received-list'>
            <h3 className='title font-size-24'>EnVision Hotel Boston</h3>
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
      getTours: appApisActions.getTours
   }
)(InfoBooking);
