import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import Header from "../Header";
import ImpHomePage from "./ImpHomePage";
import Footer from "../Footer";

const HomePageStyled = styled.div`
   height: 100vh;
`;

const Homepage = (props) => {
   return (
      <HomePageStyled>
         <Header />
         <ImpHomePage />
         <Footer />
      </HomePageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(Homepage);
