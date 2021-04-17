import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const NotificationStyled = styled.div``;

const Notification = () => {
   return (
      <NotificationStyled>
         <div className='list-group drop-reveal-list'>
            <a href='#' className='list-group-item list-group-item-action border-top-0'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-bell' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>Status updated</h3>
                     <p className='msg-text'>2 min ago</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element bg-1 flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-bell' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>50% Discount Offer</h3>
                     <p className='msg-text'>2 min ago</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element bg-2 flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-check' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>Your account has been created</h3>
                     <p className='msg-text'>1 day ago</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element bg-3 flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-user' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>Your account updated</h3>
                     <p className='msg-text'>2 hrs ago</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element bg-4 flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-lock' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>Your password changed</h3>
                     <p className='msg-text'>Yesterday</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
            <a href='#' className='list-group-item list-group-item-action'>
               <div className='msg-body d-flex align-items-center'>
                  <div className='icon-element bg-5 flex-shrink-0 mr-3 ml-0'>
                     <i className='la la-user' />
                  </div>
                  <div className='msg-content w-100'>
                     <h3 className='title pb-1'>Your account updated</h3>
                     <p className='msg-text'>2 hrs ago</p>
                  </div>
                  <span
                     className='icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0'
                     data-toggle='tooltip'
                     data-placement='left'
                     title='Mark as read'>
                     <i className='la la-check-square' />
                  </span>
               </div>
               {/* end msg-body */}
            </a>
         </div>
      </NotificationStyled>
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
)(Notification);
