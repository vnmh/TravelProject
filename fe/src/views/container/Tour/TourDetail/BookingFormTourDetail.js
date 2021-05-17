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

const { RangePicker } = DatePicker;

const BookingFormTourDetailStyled = styled.div``;

function BookingFormTourDetail(props) {
   const [numberPeople, setNumberPeople] = useState(1);
   return (
      <BookingFormTourDetailStyled>
         <div className='sidebar-widget single-content-widget'>
            <div className='sidebar-widget-item'>
               <div className='sidebar-book-title-wrap mb-3'>
                  <p>
                     <span className='text-form'>Chỉ từ</span>
                     <span className='text-value ml-2 mr-1'>
                        {currencyFormat(
                           props.tourDetail?.price * numberPeople -
                              props.tourDetail?.price * props.tourDetail?.sale * 0.01 * numberPeople
                        )}
                     </span>{" "}
                     {props.tourDetail?.sale > 0 ? (
                        <span className='before-price'>{currencyFormat(props.tourDetail?.price * numberPeople)}</span>
                     ) : (
                        <React.Fragment></React.Fragment>
                     )}
                  </p>
               </div>
            </div>
            {/* end sidebar-widget-item */}
            <div className='sidebar-widget-item'>
               <div className='contact-form-action'>
                  <form action='#'>
                     <div className='input-box'>
                        <label className='label-text'>Thời gian</label>
                        <div className='form-group'>
                           <RangePicker
                              size='large'
                              format={UtilDate.formatDateLocal}
                              style={{ width: "100%" }}
                              disabled={true}
                              value={[
                                 moment(props.tourDetail?.departureDay),
                                 moment(props.tourDetail?.departureDay).add(props.tourDetail?.vocationTime, "days")
                              ]}
                           />
                        </div>
                     </div>
                  </form>
               </div>
            </div>
            {/* end sidebar-widget-item */}
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
            {/* end sidebar-widget-item */}
            <div className='btn-box pt-2'>
               <Link
                  to={PATH.TOUR_BOOKING.replace(":id", props.tourDetail?.idTour) + parseObjToQuery({ numberPeople })}
                  className='theme-btn text-center w-100 mb-2'>
                  <i className='la la-shopping-cart mr-2 font-size-18' />
                  Đặt ngay
               </Link>
               <a href='#' className='theme-btn text-center w-100 theme-btn-transparent'>
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
               </div>
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
