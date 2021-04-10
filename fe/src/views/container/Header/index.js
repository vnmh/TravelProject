import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import { Button, Modal } from "react-bootstrap";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import Form from "antd/lib/form/Form";

const HeaderTopStyled = styled.div``;

const HeaderTop = (props) => {
   // const scrollRef = React.useRef(null);
   // const { x, y } = useScroll(scrollRef);
   const [smShow, setSmShow] = useState(false);
   const [lgShow, setLgShow] = useState(false);

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
                              {/* <a
                                 href='#'
                                 className='theme-btn theme-btn-small theme-btn-transparent mr-1'
                                 data-toggle='modal'
                                 data-target='#signupPopupForm'>
                                 Sign Up
                              </a> */}
                              <Button
                                 className='theme-btn theme-btn-small theme-btn-transparent mr-1'
                                 onClick={() => setSmShow(true)}>
                                 Đăng ký
                              </Button>
                              {/* <a
                                 href='#'
                                 className='theme-btn theme-btn-small'
                                 data-toggle='modal'
                                 data-target='#loginPopupForm'>
                                 Login
                              </a> */}
                              <Button className='theme-btn theme-btn-small' onClick={() => setLgShow(true)}>
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

            <Modal className='modal-popup' show={lgShow} onHide={() => setLgShow(false)}>
               {/* <div className="modal fade" role="dialog" aria-hidden="true"> */}
               {/* <div className="modal-dialog modal-dialog-centered" role="document"> */}
               <div className='modal-content'>
                  <Modal.Header className='modal-header' closeButton>
                     <div>
                        <h5 className='modal-title title' id='exampleModalLongTitle2'>
                           Đăng nhập
                        </h5>
                        {/* <p className='font-size-14'>Hello! Welcome to your account</p> */}
                     </div>
                     {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="la la-close" />
               </button> */}
                  </Modal.Header>
                  <Modal.Body className='modal-body'>
                     <div className='contact-form-action'>
                        <Form method='post'>
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Tên đăng nhập</Modal.Title>
                              <div className='form-group'>
                                 <span className='la la-user form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    name='text'
                                    placeholder='Nhập tên đăng nhập của bạn'
                                 />
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Mật khẩu</Modal.Title>
                              <div className='form-group mb-2'>
                                 <span className='la la-lock form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    name='text'
                                    placeholder='Type your password'
                                 />
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                 <div className='custom-checkbox mb-0'>
                                    <input type='checkbox' id='rememberchb' />
                                    <label htmlFor='rememberchb'>Nhớ mật khẩu</label>
                                 </div>
                                 <p className='forgot-password'>
                                    <a href='recover.html'>Quên mật khẩu?</a>
                                 </p>
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='btn-box pt-3 pb-4'>
                              <Button type='button' className='theme-btn w-100'>
                                 Đăng nhập
                              </Button>
                           </div>
                           <div className='action-box text-center'>
                              <p className='font-size-14'>Hoặc</p>
                              <ul className='social-profile py-3'>
                                 <li>
                                    <a href='#' className='bg-5 text-white'>
                                       <i className='lab la-facebook-f' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-6 text-white'>
                                       <i className='lab la-twitter' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-7 text-white'>
                                       <i className='lab la-instagram' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-5 text-white'>
                                       <i className='lab la-linkedin-in' />
                                    </a>
                                 </li>
                              </ul>
                           </div>
                        </Form>
                     </div>
                     {/* end contact-form-action */}
                  </Modal.Body>
               </div>
               {/* </div> */}
               {/* </div> */}
            </Modal>
            {/* end modal-popup */}

            <Modal className='modal-popup' show={smShow} onHide={() => setSmShow(false)}>
               {/* <div className="modal fade" id="signupPopupForm" tabIndex={-1} role="dialog" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered" role="document"> */}
               <div className='modal-content'>
                  <Modal.Header className='modal-header' closeButton>
                     <div>
                        <h5 className='modal-title title' id='exampleModalLongTitle'>
                           Sign Up
                        </h5>
                        <p className='font-size-14'>Hello! Welcome Create a New Account</p>
                     </div>
                     {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true" className="la la-close" />
                     </button> */}
                  </Modal.Header>
                  <Modal.Body className='modal-body'>
                     <div className='contact-form-action'>
                        <Form method='post'>
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Username</Modal.Title>
                              <div className='form-group'>
                                 <span className='la la-user form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    name='text'
                                    placeholder='Type your username'
                                 />
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Email Address</Modal.Title>
                              <div className='form-group'>
                                 <span className='la la-envelope form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    name='text'
                                    placeholder='Type your email'
                                 />
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Password</Modal.Title>
                              <div className='form-group'>
                                 <span className='la la-lock form-icon' />
                                 <input className='form-control' type='text' name='text' placeholder='Type password' />
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='input-box'>
                              <Modal.Title className='label-text'>Repeat Password</Modal.Title>
                              <div className='form-group'>
                                 <span className='la la-lock form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    name='text'
                                    placeholder='Type again password'
                                 />
                              </div>
                           </div>
                           {/* end input-box */}
                           <div className='btn-box pt-3 pb-4'>
                              <Button type='button' className='theme-btn w-100'>
                                 Register Account
                              </Button>
                           </div>
                           <div className='action-box text-center'>
                              <p className='font-size-14'>Or Sign up Using</p>
                              <ul className='social-profile py-3'>
                                 <li>
                                    <a href='#' className='bg-5 text-white'>
                                       <i className='lab la-facebook-f' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-6 text-white'>
                                       <i className='lab la-twitter' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-7 text-white'>
                                       <i className='lab la-instagram' />
                                    </a>
                                 </li>
                                 <li>
                                    <a href='#' className='bg-5 text-white'>
                                       <i className='lab la-linkedin-in' />
                                    </a>
                                 </li>
                              </ul>
                           </div>
                        </Form>
                     </div>
                     {/* end contact-form-action */}
                  </Modal.Body>
               </div>
               {/* </div>
               </div> */}
            </Modal>
            {/* end modal-popup */}
         </header>
      </HeaderTopStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(HeaderTop);
