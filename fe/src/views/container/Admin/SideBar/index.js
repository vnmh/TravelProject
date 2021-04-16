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
                        <span className='author__meta'>Welcome to Admin Panel</span>
                     </div>
                  </div>
               </div>
               <div className='sidebar-menu-wrap'>
                  <ul className='sidebar-menu toggle-menu list-items'>
                     <li>
                        <a href='admin-dashboard'>
                           <i className='la la-dashboard mr-2 text-color' />
                           Dashboard
                        </a>
                     </li>
                     <li>
                        <a href='admin-booking'>
                           <i className='la la-shopping-cart mr-2 text-color-2' />
                           Booking
                        </a>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <a href='admin-dashboard-orders.html'>
                           <i className='la la-list mr-2 text-color-3' />
                           Orders
                        </a>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <a href='admin-dashboard-orders-details.html'>Order Details</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <a href='/admin-tour'>
                           <i className='la la-list mr-2 text-color-4' />
                           Tour
                        </a>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <a href='admin-dashboard-traveler-detail.html'>Traveller Details</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a href='admin-dashboard-visa.html'>
                           <i className='la la-plane mr-2 text-color-5' />
                           Visa Application
                        </a>
                     </li>
                     <li>
                        <a href='admin-dashboard-reviews.html'>
                           <i className='la la-star mr-2 text-color-6' />
                           Reviews
                        </a>
                     </li>
                     <li>
                        <a href='admin-dashboard-wishlist.html'>
                           <i className='la la-heart mr-2 text-color-7' />
                           Wishlist
                        </a>
                     </li>
                     <li className='page-active'>
                        <a href='admin-dashboard-travel-agents.html'>
                           <i className='la la-text-width mr-2' />
                           Travel Agents
                        </a>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <a href='#'>
                           <i className='la la-area-chart mr-2 text-color-8' />
                           Finance
                        </a>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <a href='admin-invoice.html'>Invoice</a>
                           </li>
                           <li>
                              <a href='admin-payments.html'>Payments</a>
                           </li>
                           <li>
                              <a href='admin-currency-list.html'>Currency List</a>
                           </li>
                           <li>
                              <a href='admin-dashboard-subscribers.html'>Subscribers</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <span className='side-menu-icon toggle-menu-icon'>
                           <i className='la la-angle-down' />
                        </span>
                        <a href='#'>
                           <i className='la la-map-signs mr-2 text-color-9' />
                           Locations
                        </a>
                        <ul className='toggle-drop-menu'>
                           <li>
                              <a href='admin-countries.html'>Countries</a>
                           </li>
                           <li>
                              <a href='admin-airlines.html'>Airlines</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a href='admin-dashboard-settings.html'>
                           <i className='la la-cog mr-2 text-color-10' />
                           Settings
                        </a>
                     </li>
                     <li>
                        <a href='index.html'>
                           <i className='la la-power-off mr-2 text-color-11' />
                           Logout
                        </a>
                     </li>
                  </ul>
               </div>
               {/* end sidebar-menu-wrap */}
            </div>
         </div>
         {/* end sidebar-nav */}
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
