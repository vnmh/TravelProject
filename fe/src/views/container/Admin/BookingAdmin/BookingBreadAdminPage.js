import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const BookingBreadAdminPageStyled = styled.div``;

const BookingBreadAdminPage = () => {
   return (
      <BookingBreadAdminPageStyled>
         <div className='dashboard-bread dashboard--bread dashboard-bread-2'>
            <div className='container-fluid'>
               <div className='row align-items-center'>
                  <div className='col-lg-6'>
                     <div className='breadcrumb-content'>
                        <div className='section-heading'>
                           <h2 className='sec__title font-size-30 text-white'>Đại lý du lịch</h2>
                        </div>
                     </div>
                     {/* end breadcrumb-content */}
                  </div>
                  {/* end col-lg-6 */}
                  <div className='col-lg-6'>
                     <div className='breadcrumb-list text-right'>
                        <ul className='list-items'>
                           <li>
                              <a href='/' className='text-white'>
                                 Trang chủ
                              </a>
                           </li>
                           <li>Booking</li>
                        </ul>
                     </div>
                     {/* end breadcrumb-list */}
                  </div>
                  {/* end col-lg-6 */}
               </div>
               {/* end row */}
            </div>
         </div>
         {/* end dashboard-bread */}
      </BookingBreadAdminPageStyled>
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
)(BookingBreadAdminPage);
