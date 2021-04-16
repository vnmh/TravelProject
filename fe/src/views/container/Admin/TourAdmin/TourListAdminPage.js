import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import TourListAdminPagePage from "./TourAdmin";
import TopBar from "../TopBar";

const TourListAdminPageStyled = styled.div``;

const TourListAdminPage = () => {
   return (
      <TourListAdminPageStyled>
         <div>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='form-box'>
                     <div className='form-title-wrap'>
                        <h3 className='title'>Travel Agent Lists</h3>
                        <p className='font-size-14'>Showing 1 to 8 of 20 entries</p>
                     </div>
                     <div className='form-content'>
                        <div className='table-form table-responsive'>
                           <table className='table'>
                              <thead>
                                 <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Agency Name</th>
                                    <th scope='col'>Website</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Country</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <th scope='row'>1</th>
                                    <td>
                                       <div className='table-content'>
                                          <h3 className='title'>Ocean Travel Agency</h3>
                                       </div>
                                    </td>
                                    <td>
                                       <a href='#' className='color-text'>
                                          www.oceantravelagency.com
                                       </a>
                                    </td>
                                    <td>oceantravelagency@gmail.com</td>
                                    <td>Italy</td>
                                    <td>Rome</td>
                                    <td>
                                       <span className='badge badge-success py-1 px-2'>Active</span>
                                    </td>
                                    <td>
                                       <div className='table-content'>
                                          <a
                                             href='#'
                                             className='theme-btn theme-btn-small mr-2'
                                             data-toggle='tooltip'
                                             data-placement='top'
                                             title='View'>
                                             <i className='la la-eye' />
                                          </a>
                                          <a
                                             href='#'
                                             className='theme-btn theme-btn-small'
                                             data-toggle='tooltip'
                                             data-placement='top'
                                             title='Edit'>
                                             <i className='la la-edit' />
                                          </a>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
                  {/* end form-box */}
               </div>
               {/* end col-lg-12 */}
            </div>
            {/* end row */}
            <div className='row'>
               <div className='col-lg-12'>
                  <nav aria-label='Page navigation example'>
                     <ul className='pagination'>
                        <li className='page-item'>
                           <a className='page-link page-link-nav' href='#' aria-label='Previous'>
                              <span aria-hidden='true'>
                                 <i className='la la-angle-left' />
                              </span>
                              <span className='sr-only'>Previous</span>
                           </a>
                        </li>
                        <li className='page-item'>
                           <a className='page-link page-link-nav' href='#'>
                              1
                           </a>
                        </li>
                        <li className='page-item active'>
                           <a className='page-link page-link-nav' href='#'>
                              2 <span className='sr-only'>(current)</span>
                           </a>
                        </li>
                        <li className='page-item'>
                           <a className='page-link page-link-nav' href='#'>
                              3
                           </a>
                        </li>
                        <li className='page-item'>
                           <a className='page-link page-link-nav' href='#' aria-label='Next'>
                              <span aria-hidden='true'>
                                 <i className='la la-angle-right' />
                              </span>
                              <span className='sr-only'>Next</span>
                           </a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>
      </TourListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => TourListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TourListAdminPage);
