import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import styled from "styled-components";

const ProfileBreadStyled = styled.div``;

const ProfileBread = () => {
   return (
      <ProfileBreadStyled>
         <div className='dashboard-content-wrap'>
            <div className='dashboard-bread dashboard--bread dashboard-bread-2'>
               <div className='container-fluid'>
                  <div className='row d-flex justify-content-end'>
                     <div className='breadcrumb-list text-right'>
                        <ul className='list-items'>
                           <li>
                              <Link to={PATH.ADMIN_DASHBOARD} className='text-white'>
                                 Trang chủ
                              </Link>
                           </li>
                           <li>Đánh giá</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ProfileBreadStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
      }),
      {
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ProfileBread);
