import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { DatePicker, message } from "antd";
import moment from "moment";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import * as PATH from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";
import { ORDER_STATUS } from "~/configs/status";

const { RangePicker } = DatePicker;

const BookingFormTourDetailStyled = styled.div``;

function BookingFormTourDetail(props) {
   const [numberPeople, setNumberPeople] = useState(1);
   const [departureDay, setDepartureDay] = useState(moment(props.tourDetail?.departureDate));
   useEffect(() => {
      setDepartureDay(moment(props.tourDetail?.departureDate));
   }, [props.tourDetail?.departureDate]);

   const dateAvailable = (current) => {
      if (props.tourDetail?.departureDate) {
         // mỗi ngày thì dễ rồi
      }
      const style = {};
      if (current.date() === 1) {
         style.border = "1px solid #1890ff";
         style.borderRadius = "50%";
      }
      return (
         <div className='ant-picker-cell-inner' style={style}>
            {current.date()}
         </div>
      );
   };
   const disabledDateNotUse = (current) => {
      const departureDate = moment(props.tourDetail?.departureDate);
      if (props.tourDetail?.scheduleLoop) {
         return (
            (current && current < moment().endOf("day")) ||
            (current && current < departureDate.startOf("day")) ||
            (current && (current.dayOfYear() - departureDate.dayOfYear()) % props.tourDetail?.scheduleLoop !== 0)
         );
      }
      // Can not select days before today and today
      if (props.tourDetail?.schedule === "daily") return current && current < moment().endOf("day");
      if (props.tourDetail?.schedule === "weekly")
         return (
            (current && current < moment().endOf("day")) ||
            (current && current < departureDate.startOf("day")) ||
            (current && current.day() !== departureDate.day())
         );
      if (props.tourDetail?.schedule === "monthly")
         return (
            (current && current < moment().endOf("day")) ||
            (current && current < departureDate.startOf("day")) ||
            (current && current.date() !== departureDate.date())
         );
      if (props.tourDetail?.schedule === "yearly")
         return (
            (current && current < moment().endOf("day")) ||
            (current && current < departureDate.startOf("day")) ||
            (current && current.date() !== departureDate.date()) ||
            (current && current.months() !== departureDate.months())
         );
   };

   //GET ORDER AND CONFIG FOR DEPARTURE DAY AND NUMBER PEOPLE
   //GET ORDER AND CONFIG FOR DEPARTURE DAY AND NUMBER PEOPLE
   const [sumPeople, setSumPeople] = useState(0);
   useEffect(() => {
      if (departureDay && props.tourDetail?.idTour) {
         props
            .getOrdersWithIdTour({ idTour: props.tourDetail?.idTour })
            .then(({ res }) => {
               const ordersFiltered = (res || [])
                  .map((r) => {
                     return { ...r, departureDayCal: r.departureDay?.slice(0, 10) };
                  })
                  .filter((f) => {
                     return (
                        f.departureDayCal === UtilDate.toDateTimeUtc(departureDay).slice(0, 10) &&
                        f.status !== ORDER_STATUS.Destroy &&
                        f.status !== ORDER_STATUS.Cancel
                     );
                  });
               const sumPeople = _.sumBy(ordersFiltered, "numberPeople");
               setSumPeople(sumPeople);
            })
            .catch((err) => {
               console.log(
                  `ithoangtan -  ~ file: BookingFormTourDetail.js ~ line 128 ~ props.getOrdersWithIdTour ~ err`,
                  err
               );
            });
      }
   }, [UtilDate.toDateTimeUtc(departureDay)]);
   //GET ORDER AND CONFIG FOR DEPARTURE DAY AND NUMBER PEOPLE
   //GET ORDER AND CONFIG FOR DEPARTURE DAY AND NUMBER PEOPLE
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
                     </span>
                     /người{" "}
                     {props.tourDetail?.sale > 0 ? (
                        <div>
                           <span className='before-price'>
                              {currencyFormat(props.tourDetail?.price * numberPeople)}
                           </span>{" "}
                           <span>({props.tourDetail?.sale} %)</span>
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
                           {props.tourDetail?.departureDate ? (
                              <DatePicker
                                 size='large'
                                 disabledDate={disabledDateNotUse}
                                 // dateRender={dateAvailable}
                                 format={UtilDate.formatDateLocal}
                                 style={{ width: "100%" }}
                                 value={departureDay}
                                 onChange={(value) => {
                                    setDepartureDay(value);
                                 }}
                              />
                           ) : (
                              ""
                           )}
                        </div>
                     </div>
                  </form>
               </div>
            </div>
            <div className='sidebar-widget-item mb-2'>
               Có{" "}
               <span style={{ fontWeight: 650 }}>
                  {sumPeople} {numberPeople ? ` + ${numberPeople}` : ""}
               </span>
               /{props.tourDetail?.groupSize} người đã đặt tour này!
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
                           if (numberPeople <= 100) {
                              if (sumPeople + numberPeople + 1 > +props.tourDetail?.groupSize) {
                                 message.warning("Tour ngày này đã đủ người, vui lòng chọn ngày khác!");
                              } else setNumberPeople(numberPeople + 1);
                           }
                        }}>
                        <i className='la la-plus' />
                     </div>
                  </div>
               </div>
            </div>
            <div className='btn-box pt-2'>
               <Link
                  to={
                     PATH.TOUR_BOOKING.replace(":id", props.tourDetail?.idTour) +
                     parseObjToQuery({ numberPeople, departureDay: UtilDate.toDateTimeUtc(departureDay) })
                  }
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
      getTours: appApisActions.getTours,
      getOrdersWithIdTour: appApisActions.getOrdersWithIdTour
   }
)(BookingFormTourDetail);
