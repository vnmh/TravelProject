import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import DashBoardBread from "./DashBoardBread";
import Notification from "./Notification";
import Chart from "./Chart";
import { appApisActions } from "~/state/ducks/appApis";

const TourAdminStyled = styled.div``;

const TourAdmin = (props) => {
   const [reports, setReports] = useState();
   useEffect(() => {
      props
         .getReport()
         .then(({ res }) => {
            setReports(res);
         })
         .catch((err) => {
            console.log(`file: DashBoardPage.js ~ line 23 ~ props.getReport ~ err`, err);
         });
   }, []);

   return (
      <TourAdminStyled>
         <div class='dashboard-content-wrap'>
            <DashBoardBread reports={reports} />
            <div class='dashboard-main-content'>
               <div class='container-fluid'>
                  <div class='row'>
                     <div class='col-lg-12 responsive-column--m'>
                        <Chart reports={reports}/>
                     </div>
                     {/* <div class="col-lg-5 responsive-column--m">
                        <Notification />
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
      </TourAdminStyled>
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
         login: authActions.login,
         getReport: appApisActions.getReport,
         getReportChart: appApisActions.getReportChart
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TourAdmin);
