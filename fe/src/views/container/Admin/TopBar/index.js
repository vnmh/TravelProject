import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { Avatar, Dropdown, Image, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { firstImage } from "~/views/utilities/helpers/utilObject";

const TopBarStyled = styled.div``;

const TopBar = (props) => {
   const history = useHistory();
   const menu = (
      <Menu>
         <Menu.Item key='0' onClick={() => history.push(PATH.PROFILE)}>
            {" "}
            <i className='fa fa-user mr-1' aria-hidden='true'></i> Thông tin cá nhân
         </Menu.Item>
         <Menu.Divider />
         <Menu.Item key='1' onClick={props.logout}>
            {" "}
            <i className='fa fa-sign-out mr-1' aria-hidden='true'></i>
            Đăng xuất
         </Menu.Item>
      </Menu>
   );
   return (
      <TopBarStyled>
         <div className='dashboard-nav dashboard--nav'>
            <div className='container-fluid'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='menu-wrapper'>
                        <div className='logo mr-5'>
                           <a href='/'>
                              <img src='images/logo2.png' alt='logo' />
                           </a>
                           <div className='menu-toggler'>
                              <i className='la la-bars' />
                              <i className='la la-times' />
                           </div>
                           <div className='user-menu-open'>
                              <i className='la la-user' />
                           </div>
                        </div>
                        <div className='nav-btn ml-auto'>
                           <div className='notification-wrap d-flex align-items-center'>
                              <div className='notification-item'>
                                 <Dropdown overlay={menu} trigger={["click"]}>
                                    <a href='#1'>
                                       {" "}
                                       <Avatar
                                          className='mr-2'
                                          src={
                                             <Image
                                                width={50}
                                                height={50}
                                                preview={false}
                                                src={
                                                   props.user?.avatar ? (
                                                      firstImage("/img/" + props.user?.avatar)
                                                   ) : (
                                                      <UserOutlined />
                                                   )
                                                }
                                             />
                                          }
                                       />
                                       {props.user?.name} <DownOutlined />
                                    </a>
                                 </Dropdown>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
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
         login: authActions.login,
         logout: authActions.logout
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TopBar);
