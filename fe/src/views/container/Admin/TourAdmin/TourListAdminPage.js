import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import { Table, Tag, Space, Button, Image } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import TourTableListAdminPage from "./TourTableListAdminPage";

const TourListAdminPageStyled = styled.div``;

const TourListAdminPage = (props) => {
   const [isCreateTour, setIsCreateTour] = useState(false);
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });
   return (
      <TourListAdminPageStyled>
         <div>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='form-box'>
                     <div className='form-title-wrap'>
                        <h3 className='title'>Danh sách tour</h3>
                        <Button
                           type='primary'
                           onClick={() => {
                              setIsCreateTour(true);
                           }}>
                           Thêm
                        </Button>
                        <p className='font-size-14'>
                           Showing {pagination.page} to {Math.ceil(pagination.total / pagination.size)} of{" "}
                           {pagination.total} entries
                        </p>
                     </div>
                     <div className='form-content'>
                        <div className='table-form table-responsive'>
                           <TourTableListAdminPage isCreateTour={isCreateTour} setIsCreateTour={setIsCreateTour} pagination={pagination}/>
                        </div>
                     </div>
                  </div>
                  {/* end form-box */}
               </div>
               {/* end col-lg-12 */}
            </div>
            {/* end row */}
         </div>
      </TourListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => TourTableListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TourListAdminPage);
