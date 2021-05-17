import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SideBarStyled = styled.div``;

const SideBar = (props) => {
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
                        <h4 className='author__title'>Tour Booking</h4>
                        <span className='author__meta'>Welcome to Admin Page</span>
                     </div>
                  </div>
               </div>
               <div className='sidebar-menu-wrap'>
                  <ul className='sidebar-menu toggle-menu list-items'>
                     <li>
                        <Link to='/admin-dashboard'>
                           <i className='la la-dashboard mr-2 text-color' />
                           Trang chủ
                        </Link>
                     </li>
                     <li>
                        <Link to='/admin-booking'>
                           <i className='la la-shopping-cart mr-2 text-color-2' />
                           Quản lý booking
                        </Link>
                     </li>
                     <li>
                        <Link to='/admin-tour-list'>
                           <i class='la la-plane mr-2 text-color-3' />
                           Danh sách tour
                        </Link>
                     </li>
                     <li>
                        <Link to='/admin-service'>
                           <i className='la la-list mr-2 text-color-4' />
                           Danh sách dịch vụ
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-reviews.html'>
                           <i className='la la-star mr-2 text-color-6' />
                           Đánh giá
                        </Link>
                     </li>
                     <li>
                        <Link to='/admin-blog'>
                           <i className='la la-text-width mr-2' />
                           Danh sách bài viết
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-wishlist.html'>
                           <i className='la la-heart mr-2 text-color-7' />
                           Danh sách yêu thích
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-settings.html'>
                           <i className='la la-cog mr-2 text-color-10' />
                           Cài đặt
                        </Link>
                     </li>
                     <li>
                        <Link to='/' onClick={props.logout}>
                           <i className='la la-power-off mr-2 text-color-11' />
                           Đăng xuất
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
         login: authActions.login,
         logout: authActions.logout
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(SideBar);
