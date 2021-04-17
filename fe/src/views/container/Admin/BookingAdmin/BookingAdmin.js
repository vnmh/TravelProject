import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import CardItemBookingAdminPage from "./CardItemBookingAdminPage";
import BookingBreadAdminPage from "./BookingBreadAdminPage";
const BookingAdminStyled = styled.div``;

const BookingAdmin = () => {
   return (
      <BookingAdminStyled>
         <div class='dashboard-content-wrap'>
            <BookingBreadAdminPage />
            <div class='dashboard-main-content'>
               <div class='container-fluid'>
                  <CardItemBookingAdminPage />
               </div>
            </div>
         </div>
      </BookingAdminStyled>
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
)(BookingAdmin);
