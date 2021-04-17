import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const ChangePasswordAdminStyled = styled.div``;

const ChangePasswordAdmin = () => {
   return (
      <ChangePasswordAdminStyled>
         <div className='col-lg-6'>
            <div className='form-box'>
               <div className='form-title-wrap'>
                  <h3 className='title'>Change Email</h3>
               </div>
               <div className='form-content'>
                  <div className='contact-form-action'>
                     <form action='#'>
                        <div className='row'>
                           <div className='col-lg-12 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Current Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope form-icon' />
                                    <input className='form-control' type='text' placeholder='Current email' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                           <div className='col-lg-12 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>New Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope form-icon' />
                                    <input className='form-control' type='text' placeholder='New email' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                           <div className='col-lg-12 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>New Email Again</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope form-icon' />
                                    <input className='form-control' type='text' placeholder='New email again' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button className='theme-btn' type='button'>
                                    Change Email
                                 </button>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                        </div>
                        {/* end row */}
                     </form>
                  </div>
               </div>
            </div>
            {/* end form-box */}
         </div>
         {/* end col-lg-6 */}
      </ChangePasswordAdminStyled>
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
)(ChangePasswordAdmin);
