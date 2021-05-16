import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import Profile from "./Profile";
import Header from "../Header";
import TopBar from "../Admin/TopBar";
import SideBar from "../Admin/SideBar";
import ProfileBreadPage from "./ProfileBreadPage";

const ProfilePageStyled = styled.div``;

const ProfilePage = (props) => {
   return (
      <ProfilePageStyled>
         {props.user?.role === "user" ? (
            <>
               <div className='mb-5'><Header /></div>
               <div><Profile /></div>
            </>
         ) : (
            <>
               <body className='section-bg'>
                  <section className='dashboard-area'>
                     <SideBar />
                     <ProfileBreadPage />
                     <TopBar />
                     <Profile />
                  </section>
               </body>
            </>
         )}
      </ProfilePageStyled>
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
)(ProfilePage);
