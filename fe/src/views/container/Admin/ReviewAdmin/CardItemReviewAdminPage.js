import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import ReviewBreadAdminPage from "./ReviewBreadAdminPage";

const CardItemReviewAdminPageStyled = styled.div``;

const CardItemReviewAdminPage = () => {
   return (
      <CardItemReviewAdminPageStyled>
         <div className='row'>
            <div className='col-lg-12'>
               <div className='form-box'>
                  <div className='form-title-wrap'>
                     <div className='d-flex align-items-center justify-content-between'>
                        <div>
                           <h3 className='title'>Review Lists</h3>
                           <p className='font-size-14'>Showing 1 to 4 of 20 entries</p>
                        </div>
                        <div className='select-contain'>
                           <select className='select-contain-select'>
                              <option value={1}>Any Time</option>
                              <option value={2}>Latest</option>
                              <option value={3}>Oldest</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className='form-content'>
                     <div className='comments-list'>
                        <div className='comment'>
                           <div className='comment-avatar'>
                              <img className='avatar__img' alt='' src='images/team8.jpg' />
                           </div>
                           <div className='comment-body'>
                              <div className='meta-data'>
                                 <h3 className='comment__author'>Grand Plaza Serviced Apartments</h3>
                                 <div className='meta-data-inner d-flex'>
                                    <p className='comment__meta mr-1'>
                                       By <a href='#'>John Smith</a>
                                    </p>
                                    <span className='ratings d-flex align-items-center mr-1'>
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                    </span>
                                    <p className='comment__date'>April 5, 2019</p>
                                 </div>
                              </div>
                              <p className='comment-content'>
                                 Our stay was pleasant and welcoming. We stayed in an apartment meant for 3 adults with
                                 kitchen facilities. The cleaning services were superp. We liked the laundry and kitchen
                                 cleaning services on top of the regular cleaning services.
                              </p>
                              <div className='comment-reply'>
                                 <a className='theme-btn' href='#' data-toggle='modal' data-target='#modalPopup'>
                                    <span className='la la-mail-reply mr-1' />
                                    Reply
                                 </a>
                              </div>
                           </div>
                        </div>
                        {/* end comments */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </CardItemReviewAdminPageStyled>
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
)(CardItemReviewAdminPage);
