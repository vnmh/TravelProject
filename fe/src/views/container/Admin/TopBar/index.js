import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const TopBarStyled = styled.div``;

const TopBar = () => {
   return (
      <TopBarStyled>
         <div className='dashboard-nav dashboard--nav'>
            <div className='container-fluid'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='menu-wrapper'>
                        <div className='logo mr-5'>
                           <a href='index.html'>
                              <img src='images/logo2.png' alt='logo' />
                           </a>
                           <div className='menu-toggler'>
                              <i className='la la-bars' />
                              <i className='la la-times' />
                           </div>
                           {/* end menu-toggler */}
                           <div className='user-menu-open'>
                              <i className='la la-user' />
                           </div>
                           {/* end user-menu-open */}
                        </div>
                        <div className='dashboard-search-box'>
                           <div className='contact-form-action'>
                              <form action='#'>
                                 <div className='form-group mb-0'>
                                    <input className='form-control' type='text' name='text' placeholder='Tìm kiếm' />
                                    <button className='search-btn'>
                                       <i className='la la-search' />
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                        <div className='nav-btn ml-auto'>
                           <div className='notification-wrap d-flex align-items-center'>
                              <div className='notification-item mr-2'>
                                 <div className='dropdown'>
                                    <a
                                       href='#'
                                       className='dropdown-toggle drop-reveal-toggle-icon'
                                       id='notificationDropdownMenu'
                                       data-toggle='dropdown'
                                       aria-haspopup='true'
                                       aria-expanded='false'>
                                       <i className='la la-bell' />
                                       <span className='noti-count'>4</span>
                                    </a>
                                    <div className='dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right'>
                                       <div className='dropdown-header drop-reveal-header'>
                                          <h6 className='title'>
                                             You have <strong className='text-black'>4</strong> notifications
                                          </h6>
                                       </div>
                                       <div className='list-group drop-reveal-list'>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body d-flex align-items-center'>
                                                <div className='icon-element flex-shrink-0 mr-3 ml-0'>
                                                   <i className='la la-bell' />
                                                </div>
                                                <div className='msg-content w-100'>
                                                   <h3 className='title pb-1'>Your request has been sent</h3>
                                                   <p className='msg-text'>2 min ago</p>
                                                </div>
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
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                       </div>
                                       <a href='#' className='dropdown-item drop-reveal-btn text-center'>
                                          View all
                                       </a>
                                    </div>
                                    {/* end dropdown-menu */}
                                 </div>
                              </div>
                              {/* end notification-item */}
                              <div className='notification-item mr-2'>
                                 <div className='dropdown'>
                                    <a
                                       href='#'
                                       className='dropdown-toggle drop-reveal-toggle-icon'
                                       id='messageDropdownMenu'
                                       data-toggle='dropdown'
                                       aria-haspopup='true'
                                       aria-expanded='false'>
                                       <i className='la la-envelope' />
                                       <span className='noti-count'>4</span>
                                    </a>
                                    <div className='dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right'>
                                       <div className='dropdown-header drop-reveal-header'>
                                          <h6 className='title'>
                                             You have <strong className='text-black'>4</strong> messages
                                          </h6>
                                       </div>
                                       <div className='list-group drop-reveal-list'>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body d-flex align-items-center'>
                                                <div className='avatar flex-shrink-0 mr-3'>
                                                   <img src='images/team8.jpg' alt='' />
                                                </div>
                                                <div className='msg-content w-100'>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <h3 className='title pb-1'>Steve Wornder</h3>
                                                      <span className='msg-text'>3 min ago</span>
                                                   </div>
                                                   <p className='msg-text'>Ancillae delectus necessitatibus no eam</p>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body d-flex align-items-center'>
                                                <div className='avatar flex-shrink-0 mr-3'>
                                                   <img src='images/team9.jpg' alt='' />
                                                </div>
                                                <div className='msg-content w-100'>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <h3 className='title pb-1'>Marc Twain</h3>
                                                      <span className='msg-text'>1 hrs ago</span>
                                                   </div>
                                                   <p className='msg-text'>Ancillae delectus necessitatibus no eam</p>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body d-flex align-items-center'>
                                                <div className='avatar flex-shrink-0 mr-3'>
                                                   <img src='images/team10.jpg' alt='' />
                                                </div>
                                                <div className='msg-content w-100'>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <h3 className='title pb-1'>Enzo Ferrari</h3>
                                                      <span className='msg-text'>2 hrs ago</span>
                                                   </div>
                                                   <p className='msg-text'>Ancillae delectus necessitatibus no eam</p>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body d-flex align-items-center'>
                                                <div className='avatar flex-shrink-0 mr-3'>
                                                   <img src='images/team11.jpg' alt='' />
                                                </div>
                                                <div className='msg-content w-100'>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <h3 className='title pb-1'>Lucas Swing</h3>
                                                      <span className='msg-text'>3 hrs ago</span>
                                                   </div>
                                                   <p className='msg-text'>Ancillae delectus necessitatibus no eam</p>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                       </div>
                                       <a href='#' className='dropdown-item drop-reveal-btn text-center'>
                                          View all
                                       </a>
                                    </div>
                                    {/* end dropdown-menu */}
                                 </div>
                              </div>
                              {/* end notification-item */}
                              <div className='notification-item'>
                                 <div className='dropdown'>
                                    <a
                                       href='/admin-profile'
                                       className='dropdown-toggle'
                                       id='userDropdownMenu'
                                       data-toggle='dropdown'
                                       aria-haspopup='true'
                                       aria-expanded='false'>
                                       <div className='d-flex align-items-center'>
                                          <div className='avatar avatar-sm flex-shrink-0 mr-2'>
                                             <img src='images/team8.jpg' alt='team-img' />
                                          </div>
                                          <span className='font-size-14 font-weight-bold'>Royel Admin</span>
                                       </div>
                                    </a>
                                    <div className='dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right'>
                                       <div className='dropdown-item drop-reveal-header user-reveal-header'>
                                          <h6 className='title text-uppercase'>Welcome!</h6>
                                       </div>
                                       <div className='list-group drop-reveal-list user-drop-reveal-list'>
                                          <a
                                             href='admin-dashboard-settings.html'
                                             className='list-group-item list-group-item-action'>
                                             <div className='msg-body'>
                                                <div className='msg-content'>
                                                   <h3 className='title'>
                                                      <i className='la la-user mr-2' /> Edit Profile
                                                   </h3>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a
                                             href='admin-dashboard-orders.html'
                                             className='list-group-item list-group-item-action'>
                                             <div className='msg-body'>
                                                <div className='msg-content'>
                                                   <h3 className='title'>
                                                      <i className='la la-shopping-cart mr-2' />
                                                      Orders
                                                   </h3>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a href='#' className='list-group-item list-group-item-action'>
                                             <div className='msg-body'>
                                                <div className='msg-content'>
                                                   <h3 className='title'>
                                                      <i className='la la-bell mr-2' />
                                                      Messages
                                                   </h3>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <a
                                             href='admin-dashboard-settings.html'
                                             className='list-group-item list-group-item-action'>
                                             <div className='msg-body'>
                                                <div className='msg-content'>
                                                   <h3 className='title'>
                                                      <i className='la la-gear mr-2' />
                                                      Settings
                                                   </h3>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                          <div className='section-block' />
                                          <a href='index.html' className='list-group-item list-group-item-action'>
                                             <div className='msg-body'>
                                                <div className='msg-content'>
                                                   <h3 className='title'>
                                                      <i className='la la-power-off mr-2' />
                                                      Logout
                                                   </h3>
                                                </div>
                                             </div>
                                             {/* end msg-body */}
                                          </a>
                                       </div>
                                    </div>
                                    {/* end dropdown-menu */}
                                 </div>
                              </div>
                              {/* end notification-item */}
                           </div>
                        </div>
                        {/* end nav-btn */}
                     </div>
                     {/* end menu-wrapper */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container-fluid */}
         </div>
         {/* end dashboard-nav */}
      </TopBarStyled>
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
)(TopBar);
