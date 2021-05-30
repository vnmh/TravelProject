import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import ChartBiz from "./ChartBiz";
import { Typography } from "antd";
import { appApisActions } from "~/state/ducks/appApis";
import { currencyFormat } from "~/views/utilities/helpers/currency";

const ChartStyled = styled.div``;

const Chart = (props) => {
   const [reportChart, setReportChart] = useState();
   useEffect(() => {
      props
         .getReportChart()
         .then(({ res }) => {
            console.log(`ithoangtan -  ~ file: Chart.js ~ line 21 ~ .then ~ res`, res);

            setReportChart(res);
         })
         .catch((err) => {
            console.log(`file: DashBoardPage.js ~ line 23 ~ props.getReportChart ~ err`, err);
         });
   }, []);
   return (
      <ChartStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <div className=''>
                  <ul className='chart-pagination d-flex w-100'>
                     <Typography.Paragraph strong className='mr-5'>
                        {" "}
                        Thống kê:{" "}
                     </Typography.Paragraph>

                     <Typography.Paragraph strong className='mr-3'>
                        {" "}
                        Doanh thu: {currencyFormat(props.reports?.totalRevenue)}{" "}
                     </Typography.Paragraph>
                     <Typography.Paragraph strong className='mr-3'>
                        {" "}
                        Doanh số: {currencyFormat(props.reports?.totalSales)}{" "}
                     </Typography.Paragraph>
                  </ul>
                  <div className='select-contain'></div>
               </div>
            </div>
            <div className='form-content'>
               <ChartBiz reportChart={reportChart} />
            </div>
         </div>
      </ChartStyled>
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
)(Chart);
