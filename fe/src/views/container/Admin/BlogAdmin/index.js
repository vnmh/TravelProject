import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import BlogAdmin from "./BlogAdmin";
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import { ROLES } from "~/configs";
import ScrollToTop from "~/ScrollToTop";
import HOCAdmin from "~/HOCAdmin";

const BlogAdminPageStyled = styled.div``;

const BlogAdminPage = (props) => {
   return (
      <ScrollToTop>
         <HOCAdmin>
            <BlogAdminPageStyled>
               <body className='section-bg'>
                  <section class='dashboard-area'>
                     <SideBar />
                     <TopBar />
                     <BlogAdmin />
                  </section>
               </body>
            </BlogAdminPageStyled>
         </HOCAdmin>
      </ScrollToTop>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => BlogAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login,
         logout: authActions.logout
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogAdminPage);
