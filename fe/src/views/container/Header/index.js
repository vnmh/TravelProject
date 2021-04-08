import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const WrapLoginPage = styled.div``;

const HeaderTop = (props) => {
   // const scrollRef = React.useRef(null);
   // const { x, y } = useScroll(scrollRef);
   return (
      <WrapLoginPage>
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
                                             <Link to='/list-tour'>Tour List</Link>
                                          </li>
                                          <li>
                                             <Link to='/tour-detail'>Tour Detail</Link>
                                          </li>
                                       </ul>
                                    </li>
                                    <li>
                                       <Link to='#'>
                                          Cruise <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='cruises.html'>Cruises</Link>
                                          </li>
                                          <li>
                                             <Link to='cruises-list.html'>Cruise list</Link>
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
                                    <li>
                                       <Link to='#'>
                                          Flight <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='flight-grid.html'>Flight grid</Link>
                                          </li>
                                          <li>
                                             <Link to='flight-list.html'>Flight list</Link>
                                          </li>
                                       </ul>
                                    </li>
                                    <li>
                                       <Link to='#'>
                                          Hotel <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='hotel-grid.html'>Hotel grid</Link>
                                          </li>

                                          <li>
                                             <Link to='#'>
                                                Rooms <i className='la la-plus' />
                                             </Link>
                                             <ul className='sub-menu'>
                                                <li>
                                                   <Link to='room-list.html'>Room List</Link>
                                                </li>
                                                <li>
                                                   <Link to='room-grid.html'>Room Grid</Link>
                                                </li>
                                                <li>
                                                   <Link to='room-search-result.html'>Search Result</Link>
                                                </li>
                                                <li>
                                                   <Link to='room-search-result-list.html'>Search Result list</Link>
                                                </li>
                                                <li>
                                                   <Link to='room-details.html'>Room Details</Link>
                                                </li>
                                             </ul>
                                          </li>
                                       </ul>
                                    </li>
                                    <li>
                                       <Link to='#'>
                                          car <i className='la la-angle-down' />
                                       </Link>
                                       <ul className='dropdown-menu-item'>
                                          <li>
                                             <Link to='car-grid.html'>car grid</Link>
                                          </li>
                                          <li>
                                             <Link to='car-list.html'>car list</Link>
                                          </li>
                                       </ul>
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                           {/* end main-menu-content */}
                           <div className='nav-btn'>
                              <a
                                 href='#'
                                 className='theme-btn theme-btn-small theme-btn-transparent mr-1'
                                 data-toggle='modal'
                                 data-target='#signupPopupForm'>
                                 Sign Up
                              </a>
                              <a
                                 href='#'
                                 className='theme-btn theme-btn-small'
                                 data-toggle='modal'
                                 data-target='#loginPopupForm'>
                                 Login
                              </a>
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
         </header>
      </WrapLoginPage>
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
