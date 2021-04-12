import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

import { Button } from "antd";
import LoginModal from "~/views/container/Header/LoginModal";

const HeaderTopStyled = styled.div``;

const HeaderTop = () => {
   const [isModalVisibleLogin, setIsModalVisibleLogin] = useState(false);

   return (
      <HeaderTopStyled>
         <header className='header-area'>
            <div className='header-menu-wrapper padding-right-100px padding-left-100px'>
               <div className='container-fluid'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='menu-wrapper justify-content-between'>
                           <Link to='#' className='down-button'>
                              <i className='la la-angle-down' />
                           </Link>
                           <div className='logo'>
                              <Link to={PATH.HOME_PAGE}>
                                 <img src='images/logo.png' alt='logo' />
                              </Link>
                              <div className='menu-toggler'>
                                 <i className='la la-bars' />
                                 <i className='la la-times' />
                              </div>
                              {/* end menu-toggler */}
                           </div>
                           {/* end logo */}
                           <div className='main-menu-content pr-0 ml-0'>
                              <nav>
                                 <ul>
                                    <li>
                                       <Link to='#'>
                                          Tour <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='/tour-grid'>Tour Grid</Link>
                                          </li>
                                          <li>
                                             <Link to='/tour-list'>Tour List</Link>
                                          </li>
                                          <li>
                                             <Link to='/tour-detail'>Tour Detail</Link>
                                          </li>
                                       </ul>
                                    </li>
                                    <li>
                                       <Link to='#'>
                                          Blog <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='/blog-grid'>Blog Grid</Link>
                                          </li>
                                          <li>
                                             <Link to='/blog-sidebar'>Blog Sidebar</Link>
                                          </li>
                                          <li>
                                             <Link to='/blog-detail'>Blog Detail</Link>
                                          </li>
                                       </ul>
                                    </li>
                                    <li>
                                       <Link to='#'>
                                          Pages <i className='la la-angle-down' />
                                       </Link>
                                       <div className='dropdown-menu-item mega-menu'>
                                          <ul className='row no-gutters'>
                                             <li className='col-lg-3 mega-menu-item'>
                                                <ul>
                                                   <li>
                                                      <Link to='add-hotel.html'>add hotel </Link>
                                                   </li>
                                                   <li>
                                                      <Link to='add-flight.html'>add flight </Link>
                                                   </li>

                                                   <li>
                                                      <Link to='career.html'>
                                                         career <span className='badge bg-2 text-white'>New</span>
                                                      </Link>
                                                   </li>
                                                </ul>
                                             </li>
                                             <li className='col-lg-3 mega-menu-item'>
                                                <ul>
                                                   <li>
                                                      <Link to='career-details.html'>
                                                         career details
                                                         <span className='badge bg-2 text-white'>New</span>
                                                      </Link>
                                                   </li>
                                                   <li>
                                                      <Link to='user-profile.html'>User profile</Link>
                                                   </li>
                                                </ul>
                                             </li>
                                             <li className='col-lg-3 mega-menu-item'>
                                                <ul>
                                                   <li>
                                                      <Link to='payment-complete.html'>payment complete</Link>
                                                   </li>
                                                   <li>
                                                      <Link to='destinations.html'>Destinations</Link>
                                                   </li>
                                                </ul>
                                             </li>
                                             <li className='col-lg-3 mega-menu-item'>
                                                <ul>
                                                   <li>
                                                      <Link to='add-new-post.html'>add new post</Link>
                                                   </li>
                                                   <li>
                                                      <Link to='blog-full-width.html'>blog full width</Link>
                                                   </li>
                                                </ul>
                                             </li>
                                          </ul>
                                       </div>
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                           {/* end main-menu-content */}
                           <div className='nav-btn'>
                              {/* <Button
                                 className='theme-btn theme-btn-small theme-btn-transparent mr-1'
                                 onClick={() => setSmShow(true)}>
                                 Đăng ký
                              </Button> */}
                              <Button type='primary' onClick={() => setIsModalVisibleLogin(true)}>
                                 Đăng nhập
                              </Button>
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
            {/* end header-menu-wrapper */}

            {/* Login modal */}
            <LoginModal onCancel={() => setIsModalVisibleLogin(false)} isModalVisible={isModalVisibleLogin} />
            {/* Login modal */}

            {/* Register modal */}
            {/* Register modal */}
         </header>
      </HeaderTopStyled>
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
)(HeaderTop);