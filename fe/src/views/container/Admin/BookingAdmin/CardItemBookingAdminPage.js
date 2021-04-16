import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
const CardItemBookingAdminPageStyled = styled.div``;

const CardItemBookingAdminPage = () => {
   return (
      <CardItemBookingAdminPageStyled>
         <div class='row'>
            <div class='col-lg-12'>
               <div className='form-box'>
                  <div className='form-title-wrap'>
                     <div className='d-flex align-items-center justify-content-between'>
                        <h3 className='title'>Booking Results</h3>
                        <div className='select-contain'>
                           <select className='select-contain-select'>
                              <option value={1}>Any Status</option>
                              <option value={2}>Approved</option>
                              <option value={3}>Pending</option>
                              <option value={4}>Cancelled</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className='form-content pb-2'>
                     <div className='card-item card-item-list card-item--list'>
                        <div className='card-img'>
                           <img src='images/img1.jpg' alt='hotel-img' />
                        </div>
                        <div className='card-body'>
                           <div className='d-flex align-items-center'>
                              <h3 className='card-title'>Hotel Malte – Astotel</h3>
                              <span className='badge badge-warning text-white ml-2'>Pending</span>
                           </div>
                           <ul className='list-items list-items-2 pt-2 pb-3'>
                              <li>
                                 <span>Start date:</span>12 December 2019
                              </li>
                              <li>
                                 <span>End date:</span>12 Jun 2020
                              </li>
                              <li>
                                 <span>Booking details:</span> 3 People
                              </li>
                              <li>
                                 <span>Client:</span> David Martin
                              </li>
                           </ul>
                           <div className='btn-box'>
                              <a
                                 href='#'
                                 className='theme-btn theme-btn-small theme-btn-transparent'
                                 data-toggle='modal'
                                 data-target='#modalPopup'>
                                 <i className='la la-envelope mr-1' />
                                 Send Message
                              </a>
                           </div>
                        </div>
                        <div className='action-btns'>
                           <a href='#' className='theme-btn theme-btn-small mr-2'>
                              <i className='la la-check-circle mr-1' />
                              Approve
                           </a>
                           <a href='#' className='theme-btn theme-btn-small'>
                              <i className='la la-times mr-1' />
                              Cancel
                           </a>
                        </div>
                     </div>
                     {/* end card-item */}
                  </div>
               </div>
            </div>
         </div>
      </CardItemBookingAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => dashboard admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CardItemBookingAdminPage);
