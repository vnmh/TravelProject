import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import TopBar from "../TopBar";
import TourAdmin from "./TourAdmin";
import SideBar from "../SideBar";
import { ROLES } from "~/configs";
import ScrollToTop from "~/ScrollToTop";

const TourAdminPageStyled = styled.div``;

const TourAdminPage = (props) => {
   const history = useHistory();
   useEffect(() => {
      if (props.user?.role !== ROLES.administrator) {
         history.push(PATH.APP_DEFAULT_PATH);
      }
   }, [props.user?.role]);

   return (
      <ScrollToTop>
         <TourAdminPageStyled>
            <body className='section-bg'>
               <section class='dashboard-area'>
                  <SideBar />
                  <TopBar />
                  <TourAdmin />
               </section>
            </body>
         </TourAdminPageStyled>
      </ScrollToTop>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => TourAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TourAdminPage);
