import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import moment from "moment";
import { TYPE_TOUR } from "~/configs/const";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import { renderStatusOrder, ORDER_STATUS } from "~/configs/status";

const InfoBookingStyled = styled.div``;

function InfoBooking(props) {
   return (
      <InfoBookingStyled>
         <div className='payment-received-list my-2'>
            <h3 className='title font-size-24'>{props.orderDetail?.titleTour}</h3>
            {/* <div className='card-rating pt-2 pb-3'>
               <span className='badge badge-warning text-white'>4.4/5</span>
               <span className='review__text text-warning'> Average </span>
               <span className='rating__text'>(30 Reviews)</span>
            </div> */}
            <div className='section-block' />
            <div className='row'>
               <div className='col-lg-6 py-3'>
                  <img
                     style={{ width: "100%" }}
                     src={
                        props.orderDetail?.images?.length > 0
                           ? firstImage(_.head(props.orderDetail?.images)?.url || "")
                           : "images/destination-img7.jpg"
                     }
                     alt='Destination-img'
                  />
               </div>
               <div className='col-lg-6'>
                  <ul className='list-items list-items-2 py-3'>
                     <li>
                        <span>Trạng thái:</span>
                        {renderStatusOrder(props.orderDetail?.order?.status || ORDER_STATUS.New)}
                     </li>
                     <li>
                        <span>Khách hàng:</span>
                        <span>{props.orderDetail?.order?.buyer}</span>
                     </li>
                     <li>
                        <span>Địa điểm:</span>
                        {props.orderDetail?.address}
                     </li>
                     <li>
                        <span>Check-in:</span>
                        {UtilDate.toDateLocal(props.orderDetail?.departureDay)}
                     </li>
                     <li>
                        <span>Check-out:</span>
                        {UtilDate.toDateLocal(
                           moment(props.orderDetail?.departureDay).add(props.orderDetail?.vocationTime, "days")
                        )}
                     </li>
                     <li>
                        <span>Số người:</span>
                        {props.orderDetail?.order?.numberPeople} người
                     </li>
                     <li>
                        <span>Loại tour:</span>
                        {TYPE_TOUR[props.orderDetail?.type] || ""}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </InfoBookingStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {}
)(InfoBooking);
