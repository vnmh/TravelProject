import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "antd";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import ServiceTableListAdminPage from "./ServiceTableListAdminPage";

const ServiceListAdminPageStyled = styled.div``;

const ServiceListAdminPage = (props) => {
   const [isCreateService, setIsCreateService] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });
   const [currentEdit, setCurrentEdit] = useState();
   return (
      <ServiceListAdminPageStyled>
         <div>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='form-box'>
                     <div className='form-title-wrap'>
                        <h3 className='title'>Danh sách dịch vụ</h3>
                        {!isCreateService && !currentEdit && (
                        <Button
                           type='primary'
                           className='float-right'
                           onClick={() => {
                              setIsCreateService(true);
                              isCreateService && setIsSubmit(true); // chỉ submit khi isCreateTour
                           }}>
                           Thêm
                        </Button>
                        )}
                        <p className='font-size-14'>
                           Showing {pagination.page} to {Math.ceil(pagination.total / pagination.size)} of{" "}
                           {pagination.total} entries
                        </p>
                     </div>
                     <div className='form-content'>
                        <div className='table-form table-responsive'>
                           <ServiceTableListAdminPage
                              isCreateService={isCreateService}
                              setIsCreateService={setIsCreateService}
                              currentEdit={currentEdit}
                              setCurrentEdit={setCurrentEdit}
                              pagination={pagination}
                              setPagination={setPagination}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ServiceListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => ServiceTableListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // ServiceLogin: appApisActions.ServiceLogin
         getServices: appApisActions.getServices
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ServiceListAdminPage);
