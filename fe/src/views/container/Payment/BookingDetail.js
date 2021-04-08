import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const BookingDetailStyled = styled.div``;

function BookingDetail(props) {
   return (
      <BookingDetailStyled>
         <div className='form-box booking-detail-form'>
            <div className='form-title-wrap'>
               <h3 className='title'>Booking Details</h3>
            </div>
            {/* end form-title-wrap */}
            <div className='form-content'>
               <div className='card-item shadow-none radius-none mb-0'>
                  <div className='card-img pb-4'>
                     <a href='tour-details.html' className='d-block'>
                        <img src='images/img11.jpg' alt='tour-img' />
                     </a>
                  </div>
                  <div className='card-body p-0'>
                     <div className='d-flex justify-content-between'>
                        <div>
                           <h3 className='card-title'>Golden Gate Seaplane Tour</h3>
                           <p className='card-meta'>124 E Huron St, New york</p>
                        </div>
                        <div>
                           <a href='tour-details.html' className='btn ml-1'>
                              <i className='la la-edit' data-toggle='tooltip' data-placement='top' title='Edit' />
                           </a>
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
                              Check in
                           </span>
                           12 May 2020 7:40am
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-calendar mr-1 text-black font-size-17' />
                              Check out
                           </span>
                           15 May 2020 7:40am
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-clock-o mr-1 text-black font-size-17' />
                              Duration
                           </span>
                           3 days 3 hours
                        </li>
                        <li className='font-size-15'>
                           <span className='w-auto d-block mb-n1'>
                              <i className='la la-map-marker mr-1 text-black font-size-17' />
                              Location
                           </span>
                           124 E Huron St, New york
                        </li>
                     </ul>
                     <h3 className='card-title pb-3'>Order Details</h3>
                     <div className='section-block' />
                     <ul className='list-items list-items-2 py-3'>
                        <li>
                           <span>Tour:</span>3 Days
                        </li>
                        <li>
                           <span>Extra Benefits:</span>No
                        </li>
                        <li>
                           <span>Travellers:</span>4
                        </li>
                     </ul>
                     <div className='section-block' />
                     <ul className='list-items list-items-2 pt-3'>
                        <li>
                           <span>Sub Total:</span>$240
                        </li>
                        <li>
                           <span>Taxes And Fees:</span>$5
                        </li>
                        <li>
                           <span>Total Price:</span>$245
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
