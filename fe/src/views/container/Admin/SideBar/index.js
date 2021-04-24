import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SideBarStyled = styled.div``;

const SideBar = () => {
   return (
      <SideBarStyled>
         <div className='sidebar-nav sidebar--nav'>
            <div className='sidebar-nav-body'>
               <div className='side-menu-close'>
                  <i className='la la-times' />
               </div>
               {/* end menu-toggler */}
               <div className='author-content'>
                  <div className='d-flex align-items-center'>
                     <div className='author-img avatar-sm'>
                        <img src='images/team9.jpg' alt='testimonial image' />
                     </div>
                     <div className='author-bio'>
                        <h4 className='author__title'>Royel travel agency</h4>
                        <span className='author__meta'>Welcome to Admin Page</span>
                     </div>
                  </div>
               </div>
               <div className='sidebar-menu-wrap'>
                  <ul className='sidebar-menu toggle-menu list-items'>
                     <li>
                        <Link to='/admin-dashboard'>
                           <i className='la la-dashboard mr-2 text-color' />
                           Dashboard
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-booking'>
                           <i className='la la-shopping-cart mr-2 text-color-2' />
                           Booking
                        </Link>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <Link to='admin-dashboard-orders.html'>
                           <i className='la la-list mr-2 text-color-3' />
                           Orders
                        </Link>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <Link to='admin-dashboard-orders-details.html'>Order Details</Link>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <Link to='/admin-tour-list'>
                           <i className='la la-list mr-2 text-color-4' />
                           Tour
                        </Link>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <Link to='admin-dashboard-traveler-detail.html'>Traveller Details</Link>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <Link to='admin-dashboard-reviews.html'>
                           <i className='la la-star mr-2 text-color-6' />
                           Reviews
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-wishlist.html'>
                           <i className='la la-heart mr-2 text-color-7' />
                           Wishlist
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-travel-agents.html'>
                           <i className='la la-text-width mr-2' />
                           Travel Agents
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-settings.html'>
                           <i className='la la-cog mr-2 text-color-10' />
                           Settings
                        </Link>
                     </li>
                     <li>
                        <Link to='index.html'>
                           <i className='la la-power-off mr-2 text-color-11' />
                           Logout
                        </Link>
                     </li>
                  </ul>
               </div>
               {/* end sidebar-menu-wrap */}
            </div>
         </div>
      </SideBarStyled>
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
)(SideBar);
