import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { Form, Input, Button, Checkbox, message } from "antd";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SearchTour from "./SearchTour";
import Header from "../Header";

const WrapLoginPage = styled.div`
   height: 100vh;
`;

const Homepage = (props) => {
   return (
      <WrapLoginPage>
         <Header />
         <SearchTour />
         
      </WrapLoginPage>
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
