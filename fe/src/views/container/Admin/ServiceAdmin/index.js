import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import ServiceAdmin from "./ServiceAdmin";
import * as PATH from "~/configs/routesConfig";

const ServiceAdminPageStyled = styled.div``;

const ServiceAdminPage = () => {
   return (
      <ServiceAdminPageStyled>
         <body className='section-bg'>
            <section class='dashboard-area'>
               <SideBar />
               <TopBar />
               <ServiceAdmin />
            </section>
         </body>
      </ServiceAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => ServiceAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ServiceAdminPage);
