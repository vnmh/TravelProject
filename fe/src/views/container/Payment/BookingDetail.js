import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import moment from "moment";
import { useParams } from "react-router";
import queryString from "query-string";
import { currencyFormat } from "~/views/utilities/helpers/currency";

const BookingDetailStyled = styled.div``;

function BookingDetail(props) {
   const params = queryString.parse(window.location.search);

   return (
      <BookingDetailStyled>
         <div className='form-box booking-detail-form'>
            <div className='form-title-wrap'>
               <h3 className='title'>Chi tiết đặt tour</h3>
            </div>
            {/* end form-title-wrap */}
            <div className='form-content'>
               <div className='card-item shadow-none radius-none mb-0'>
                  <div className='card-img pb-4'>
                     <div className='d-block'>
                        <img
                           src={
                              props.payment?.images?.length > 0
                                 ? firstImage(_.head(props.payment?.images)?.url || "")
                                 : "images/destination-img7.jpg"
                           }
                           alt='Destination-img'
                        />
                     </div>
                  </div>
                  <div className='card-body p-0'>
                     <div className='d-flex justify-content-between'>
                        <div>
                           <h3 className='card-title'>{props.payment?.titleTour}</h3>
                           <p className='card-meta'>{props.payment?.address}</p>
                        </div>
                     </div>
                     <div className='card-rating'>
                        <span className='badge text-white'>4.4/5</span>
                        <span className='review__text'>Average</span>
                        <span className='rating__text'>(30 Reviews)</span>
                     </div>
                     <div className='section-block' />
                     <ul className='list-items list-items-2 list-items-flush py-2'>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-calendar mr-1 text-black font-size-17' />
                              Ngày khởi hành
                           </span>
                           {UtilDate.toDateLocal(props.payment?.departureDay)}
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-calendar mr-1 text-black font-size-17' />
                              Ngày kết thúc
                           </span>
                           {UtilDate.toDateLocal(
                              moment(props.payment?.departureDay).add(props.payment?.vocationTime, "days")
                           )}
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-clock-o mr-1 text-black font-size-17' />
                              Khoảng thời gian
                           </span>
                           {props.payment?.vocationTime} ngày
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-map-marker mr-1 text-black font-size-17' />
                              Địa điểm khởi hành
                           </span>
                           {props.payment?.departureAddress}
                        </li>
                     </ul>
                     <h3 className='card-title pb-3'>Thanh toán</h3>
                     <div className='section-block' />
                     <ul className='list-items list-items-2 pt-3'>
                        <li>
                           <span>Số người:</span>
                           {params.numberPeople}
                        </li>
                        <li>
                           <span>Giá gốc:</span>
                           {currencyFormat(props.payment?.price * params.numberPeople)}
                        </li>
                        <li>
                           <span>Khuyến mãi:</span>
                           {currencyFormat(props.payment?.price * props.payment?.sale * 0.01 * params.numberPeople)} (
                           {currencyFormat(props.payment?.sale, "%")})
                        </li>
                        <div className='section-block' />
                        <li>
                           <span>Tổng tiền:</span>
                           {currencyFormat(
                              props.payment?.price * params.numberPeople -
                                 props.payment?.price * props.payment?.sale * 0.01 * params.numberPeople
                           )}
                        </li>
                     </ul>
                  </div>
               </div>
               {/* end card-item */}
            </div>
            {/* end form-content */}
         </div>
      </BookingDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(BookingDetail);
