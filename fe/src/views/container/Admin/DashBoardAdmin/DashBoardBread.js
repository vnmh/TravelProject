import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const DashBoardStyled = styled.div``;

const DashBoard = () => {
   return (
      <DashBoardStyled>
         <div className='dashboard-bread dashboard-bread-2'>
            <div className='container-fluid'>
               <div className='row align-items-center'>
                  <div className='col-lg-6'>
                     <div className='breadcrumb-content'>
                        <div className='section-heading'>
                           <h2 className='sec__title font-size-30 text-white'>Dashboard</h2>
                        </div>
                     </div>
                     {/* end breadcrumb-content */}
                  </div>
                  {/* end col-lg-6 */}
                  <div className='col-lg-6'>
                     <div className='breadcrumb-list text-right'>
                        <ul className='list-items'>
                           <li>
                              <a href='index.html' className='text-white'>
                                 Trang chủ
                              </a>
                           </li>
                        </ul>
                     </div>
                     {/* end breadcrumb-list */}
                  </div>
                  {/* end col-lg-6 */}
               </div>
               {/* end row */}
               <div className='row mt-4'>
                  <div className='col-lg-3 responsive-column-l'>
                     <div className='icon-box icon-layout-2 dashboard-icon-box pb-0'>
                        <div className='d-flex pb-3 justify-content-between'>
                           <div className='info-content'>
                              <p className='info__desc'>Total Booking!</p>
                              <h4 className='info__title'>55</h4>
                           </div>
                           {/* end info-content */}
                           <div className='info-icon icon-element bg-4'>
                              <i className='la la-shopping-cart' />
                           </div>
                           {/* end info-icon*/}
                        </div>
                        <div className='section-block' />
                        <a
                           href='admin-dashboard-booking.html'
                           className='d-flex align-items-center justify-content-between view-all'>
                           View All <i className='la la-angle-right' />
                        </a>
                     </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column-l'>
                     <div className='icon-box icon-layout-2 dashboard-icon-box pb-0'>
                        <div className='d-flex pb-3 justify-content-between'>
                           <div className='info-content'>
                              <p className='info__desc'>New Reviews!</p>
                              <h4 className='info__title'>22</h4>
                           </div>
                           {/* end info-content */}
                           <div className='info-icon icon-element bg-3'>
                              <i className='la la-star' />
                           </div>
                           {/* end info-icon*/}
                        </div>
                        <div className='section-block' />
                        <a
                           href='admin-dashboard-reviews.html'
                           className='d-flex align-items-center justify-content-between view-all'>
                           View All <i className='la la-angle-right' />
                        </a>
                     </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column-l'>
                     <div className='icon-box icon-layout-2 dashboard-icon-box pb-0'>
                        <div className='d-flex pb-3 justify-content-between'>
                           <div className='info-content'>
                              <p className='info__desc'>Total Subscribers!</p>
                              <h4 className='info__title'>27</h4>
                           </div>
                           {/* end info-content */}
                           <div className='info-icon icon-element bg-2'>
                              <i className='la la-envelope' />
                           </div>
                           {/* end info-icon*/}
                        </div>
                        <div className='section-block' />
                        <a
                           href='admin-dashboard-subscribers.html'
                           className='d-flex align-items-center justify-content-between view-all'>
                           View All <i className='la la-angle-right' />
                        </a>
                     </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column-l'>
                     <div className='icon-box icon-layout-2 dashboard-icon-box pb-0'>
                        <div className='d-flex pb-3 justify-content-between'>
                           <div className='info-content'>
                              <p className='info__desc'>New Bookmarks!</p>
                              <h4 className='info__title'>25</h4>
                           </div>
                           {/* end info-content */}
                           <div className='info-icon icon-element bg-1'>
                              <i className='la la-bookmark-o' />
                           </div>
                           {/* end info-icon*/}
                        </div>
                        <div className='section-block' />
                        <a
                           href='admin-dashboard-wishlist.html'
                           className='d-flex align-items-center justify-content-between view-all'>
                           View All <i className='la la-angle-right' />
                        </a>
                     </div>
                  </div>
                  {/* end col-lg-3 */}
               </div>
               {/* end row */}
            </div>
         </div>
         {/* end dashboard-bread */}
      </DashBoardStyled>
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
)(DashBoard);
