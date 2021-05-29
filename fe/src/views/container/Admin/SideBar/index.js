import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SideBarStyled = styled.div`
   .text-shadow {
      color: #444444;
      font-size: 35px;
      text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc, 1px 2px 1px #eeeeee,
         3px 2px 1px #cccccc, 2px 3px 1px #eeeeee, 4px 3px 1px #cccccc, 3px 4px 1px #eeeeee, 5px 4px 1px #cccccc,
         4px 5px 1px #eeeeee, 6px 5px 1px #cccccc, 5px 6px 1px #eeeeee, 7px 6px 1px #cccccc;
   }
`;

const SideBar = (props) => {
   return (
      <SideBarStyled>
         <div className='sidebar-nav sidebar--nav'>
            <div className='sidebar-nav-body'>
               <div className='side-menu-close'>
                  <i className='la la-times' />
               </div>
               <div className='author-content'>
                  <div className='d-flex justify-content-center align-items-center'>
                     <div className='author-bio'>
                        <h4 className='text-shadow'>Trang Quản lý</h4>
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
                        <Link to='/admin-blog'>
                           <i className='la la-text-width mr-2' />
                           Danh sách bài viết
                        </Link>
                     </li>
                     <li>
                        <Link to='admin-dashboard-reviews.html'>
                           <i className='la la-star mr-2 text-color-6' />
                           Đánh giá
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
                  </ul>
               </div>
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
