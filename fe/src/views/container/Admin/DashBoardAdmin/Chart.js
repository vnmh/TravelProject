import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const ChartStyled = styled.div``;

const Chart = () => {
   return (
      <ChartStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <div className='d-flex align-items-center justify-content-between'>
                  <ul className='chart-pagination d-flex'>
                     <li>
                        <a href='#' className='theme-btn theme-btn-small mr-2'>
                           Day
                        </a>
                     </li>
                     <li>
                        <a href='#' className='theme-btn theme-btn-small theme-btn-transparent mr-2'>
                           Week
                        </a>
                     </li>
                     <li>
                        <a href='#' className='theme-btn theme-btn-small theme-btn-transparent'>
                           This year
                        </a>
                     </li>
                  </ul>
                  <div className='select-contain'>
                     <select className='select-contain-select'>
                        <option value='January'>January</option>
                        <option value='February'>February</option>
                        <option value='March'>March</option>
                        <option value='April'>April</option>
                        <option value='May'>May</option>
                        <option value='June'>June</option>
                        <option value='July'>July</option>
                        <option value='August'>August</option>
                        <option value='September'>September</option>
                        <option value='October'>October</option>
                        <option value='November'>November</option>
                        <option value='December'>December</option>
                     </select>
                  </div>
               </div>
            </div>
            <div className='form-content'>
               <canvas id='line-chart' />
            </div>
         </div>
         {/* end form-box */}
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
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(Chart);
