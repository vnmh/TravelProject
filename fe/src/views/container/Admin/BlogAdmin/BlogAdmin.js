import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import BlogBreadAdminPage from "./BlogBreadAdminPage";
import BlogListAdminPage from "./BlogListAdminPage";

const BlogAdminStyled = styled.div``;

const BlogAdmin = () => {
   return (
      <BlogAdminStyled>
         <div class='dashboard-content-wrap'>
            <BlogBreadAdminPage />
            <div class='dashboard-main-content'>
               <div class='container-fluid'>
                  <BlogListAdminPage />
               </div>
            </div>
         </div>
      </BlogAdminStyled>
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
)(BlogAdmin);
