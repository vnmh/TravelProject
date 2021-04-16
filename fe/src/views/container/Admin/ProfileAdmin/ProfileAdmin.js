import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import ProfileBreadAdminPage from "./ProfileBreadAdminPage";
import ProfileSettingAdminPage from "./ProfileSettingAdminPage";
import ChangePasswordAdmin from "./ChangePasswordAdmin";

const ProfileAdminStyled = styled.div``;

const ProfileAdmin = () => {
   return (
      <ProfileAdminStyled>
         <ProfileBreadAdminPage />
         <div className='dashboard-main-content'>
            <div className='container-fluid'>
               <div className='row'>
                  <ProfileSettingAdminPage />
                  <ChangePasswordAdmin />
               </div>
            </div>
         </div>
      </ProfileAdminStyled>
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
)(ProfileAdmin);
