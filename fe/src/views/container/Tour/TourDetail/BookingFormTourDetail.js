import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const BookingFormTourDetailStyled = styled.div``;

function BookingFormTourDetail(props) {
   return (
      <BookingFormTourDetailStyled>
         <div className='sidebar-widget single-content-widget'>
            <div className='sidebar-widget-item'>
               <div className='sidebar-book-title-wrap mb-3'>
                  <h3>Bestseller</h3>
                  <p>
                     <span className='text-form'>From</span>
                     <span className='text-value ml-2 mr-1'>$399.00</span> <span className='before-price'>$412.00</span>
                  </p>
               </div>
            </div>
            {/* end sidebar-widget-item */}
            <div className='sidebar-widget-item'>
               <div className='contact-form-action'>
                  <form action='#'>
                     <div className='input-box'>
                        <label className='label-text'>Date</label>
                        <div className='form-group'>
                           <span className='la la-calendar form-icon' />
                           <input className='date-range form-control' type='text' name='daterange' readOnly />
                        </div>
                     </div>
                  </form>
               </div>
            </div>
            {/* end sidebar-widget-item */}
            <div className='sidebar-widget-item'>
               <div className='qty-box mb-2 d-flex align-items-center justify-content-between'>
                  <label className='font-size-16'>
                     Adults <span>Age 18+</span>
                  </label>
                  <div className='qtyBtn d-flex align-items-center'>
                     <div className='qtyDec'>
                        <i className='la la-minus' />
                     </div>
                     <input type='text' name='qtyInput' defaultValue={0} />
                     <div className='qtyInc'>
                        <i className='la la-plus' />
                     </div>
                  </div>
               </div>
               {/* end qty-box */}
               <div className='qty-box mb-2 d-flex align-items-center justify-content-between'>
                  <label className='font-size-16'>
                     Children <span>2-12 years old</span>
                  </label>
                  <div className='qtyBtn d-flex align-items-center'>
                     <div className='qtyDec'>
                        <i className='la la-minus' />
                     </div>
                     <input type='text' name='qtyInput' defaultValue={0} />
                     <div className='qtyInc'>
                        <i className='la la-plus' />
                     </div>
                  </div>
               </div>
               {/* end qty-box */}
               <div className='qty-box mb-2 d-flex align-items-center justify-content-between'>
                  <label className='font-size-16'>
                     Infants <span>0-2 years old</span>
                  </label>
                  <div className='qtyBtn d-flex align-items-center'>
                     <div className='qtyDec'>
                        <i className='la la-minus' />
                     </div>
                     <input type='text' name='qtyInput' defaultValue={0} />
                     <div className='qtyInc'>
                        <i className='la la-plus' />
                     </div>
                  </div>
               </div>
               {/* end qty-box */}
            </div>
            {/* end sidebar-widget-item */}
            <div className='btn-box pt-2'>
               <Link to='/tour-booking' className='theme-btn text-center w-100 mb-2'>
                  <i className='la la-shopping-cart mr-2 font-size-18' />
                  Book Now
               </Link>
               <a href='#' className='theme-btn text-center w-100 theme-btn-transparent'>
                  <i className='la la-heart-o mr-2' />
                  Add to Wishlist
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
