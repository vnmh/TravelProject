import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { DatePicker } from "antd";
import moment from "moment";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import * as PATH from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";
import { SCHEDULE_ENUM } from "~/configs/const";

const { RangePicker } = DatePicker;

const BookingFormTourDetailStyled = styled.div``;

function BookingFormTourDetail(props) {
   const [numberPeople, setNumberPeople] = useState(1);
   const [departureDay, setDepartureDay] = useState(moment(props.tourDetail?.departureDay));
   useEffect(() => {
      setDepartureDay(moment(props.tourDetail?.departureDay))
   }, [props.tourDetail?.departureDay])

   const dateAvailable = (current) => {
      if (props.tourDetail?.departureDay) {
         // mỗi ngày thì dễ rồi
      }
      const style = {};
      if (current.date() === 1) {
         style.border = '1px solid #1890ff';
         style.borderRadius = '50%';
      }
      return (
         <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
         </div>
      );
   }
   const disabledDateNotUse = (current) => {
      const departureDay = moment(props.tourDetail?.departureDay)
      if (props.tourDetail?.scheduleLoop) {
         return (current && current < moment().endOf('day')) || (current && current < departureDay.endOf('day')) || (current && (current.dayOfYear() - departureDay.dayOfYear()) % props.tourDetail?.scheduleLoop !== 0);
      }
      // Can not select days before today and today
      if (props.tourDetail?.schedule === "daily")
         return current && current < moment().endOf('day');
      if (props.tourDetail?.schedule === "weekly")
         return (current && current < moment().endOf('day')) || (current && current < departureDay.endOf('day')) || (current && current.day() !== departureDay.day());
      if (props.tourDetail?.schedule === "monthly")
         return (current && current < moment().endOf('day')) || (current && current < departureDay.endOf('day')) || (current && current.date() !== departureDay.date());
      if (props.tourDetail?.schedule === "yearly")
         return (current && current < moment().endOf('day')) || (current && current < departureDay.endOf('day')) || ((current && current.date() !== departureDay.date()) || (current && current.months() !== departureDay.months()));
   }
   return (
      <BookingFormTourDetailStyled data-aos='fade-up'>
         <div className='sidebar-widget single-content-widget'>
            <div className='sidebar-widget-item'>
               <div className='sidebar-book-title-wrap mb-3'>
                  <p>
                     {/* <span className='text-form'>Chỉ từ</span> */}
                     <span className='text-value ml-2 mr-1'>
                        {currencyFormat(
                           props.tourDetail?.price * numberPeople -
                           props.tourDetail?.price * props.tourDetail?.sale * 0.01 * numberPeople
                        )}
                     </span>/người{" "}

                     {props.tourDetail?.sale > 0 ? (
                        <div>
                           <span className='before-price'>{currencyFormat(props.tourDetail?.price * numberPeople)}</span>
                           {" "} <span>({props.tourDetail?.sale} %)</span>
                        </div>
                     ) : (
                        <React.Fragment></React.Fragment>
                     )}

                  </p>
               </div>
            </div>
            <div className='sidebar-widget-item'>
               <div className='contact-form-action'>
                  <form action='#'>
                     <div className='input-box'>
                        <label className='label-text'>Thời gian</label>
                        <div className='form-group'>
                           {props.tourDetail?.departureDay ? <DatePicker
                              size='large'
                              disabledDate={disabledDateNotUse}
                              // dateRender={dateAvailable}
                              format={UtilDate.formatDateLocal}
                              style={{ width: "100%" }}
                              value={departureDay}
                              onChange={(value) => {
                                 setDepartureDay(value)
                              }}
                           /> : ""}
                        </div>
                     </div>
                  </form>
               </div>
            </div>
            <div className='sidebar-widget-item'>
               <div className='qty-box mb-2 d-flex align-items-center justify-content-between'>
                  <label className='font-size-16'>Số người</label>
                  <div className='qtyBtn d-flex align-items-center'>
                     <div
                        className='qtyDec'
                        onClick={() => {
                           if (numberPeople > 1) {
                              setNumberPeople(numberPeople - 1);
                           }
                        }}>
                        <i className='la la-minus' />
                     </div>
                     <input type='text' name='qtyInput' value={numberPeople} />
                     <div
                        className='qtyInc'
                        onClick={() => {
                           if (numberPeople < 100) {
                              setNumberPeople(numberPeople + 1);
                           }
                        }}>
                        <i className='la la-plus' />
                     </div>
                  </div>
               </div>
            </div>
            <div className='btn-box pt-2'>
               <Link
                  to={PATH.TOUR_BOOKING.replace(":id", props.tourDetail?.idTour) + parseObjToQuery({ numberPeople, departureDay: UtilDate.toDateTimeUtc(departureDay) })}
                  className='theme-btn text-center w-100 mb-2'>
                  <i className='la la-shopping-cart mr-2 font-size-18' />
                  Đặt ngay
               </Link>
               {/* <a href='#' className='theme-btn text-center w-100 theme-btn-transparent'>
                  <i className='la la-heart-o mr-2' />
                  Thêm vào yêu thích
               </a>
               <div className='d-flex align-items-center justify-content-between pt-2'>
                  <a
                     href='#'
                     className='btn theme-btn-hover-gray font-size-15'
                     data-toggle='modal'
                     data-target='#sharePopupForm'>
                     <i className='la la-share mr-1' />
                     Share
                  </a>
                  <p>
                     <i className='la la-eye mr-1 font-size-15 color-text-2' />
                     3456
                  </p>
               </div> */}
            </div>
         </div>
      </BookingFormTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(BookingFormTourDetail);
