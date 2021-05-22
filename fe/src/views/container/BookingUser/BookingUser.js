import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import BookingListUserPage from "./BookingListUserPage";
import BookingBreadUserPage from "./BookingBreadUserPage";

const BookingUserStyled = styled.div``;

const BookingUser = (props) => {
   return (
      <BookingUserStyled>
         <div class='dashboard-content-wrap'>
            <BookingBreadUserPage />
            <div class='dashboard-main-content'>
               <div class='container-fluid'>
                  <BookingListUserPage
                     tourBooking={props.tourBooking}
                     needLoading={props.needLoading}
                     setNeedLoading={props.setNeedLoading}
                     setStatus={props.setStatus}
                     status={props.status}
                     tourBookingFilter={props.tourBookingFilter}
                  />
               </div>
            </div>
         </div>
      </BookingUserStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.Useristrator && isAuthenticated => dashboard User , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingUser);
