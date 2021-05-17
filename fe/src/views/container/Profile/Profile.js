import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import ProfileSettingPage from "./ProfileSettingPage";
import ChangePassword from "./ChangePassword";

const ProfileStyled = styled.div``;

const Profile = (props) => {
   return (
      <ProfileStyled>
         <div className='dashboard-main-content'>
            <div className='container-fluid'>
               <div className='row d-flex justify-content-center'>
                  <ProfileSettingPage profile={props.profile}/>
                  <ChangePassword profile={props.profile}/>
               </div>
            </div>
         </div>
      </ProfileStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.istrator && isAuthenticated => dashboard  , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(Profile);
