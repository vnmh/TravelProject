import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import * as PATH from "~/configs/routesConfig";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import ScrollToTop from "~/ScrollToTop";

const ForgetPasswordStyled = styled.div`
container h-100
`;

const ForgetPassword = (props) => {
   const history = useHistory();
   return (
      <ScrollToTop>
         <ForgetPasswordStyled>
            <section className='h-100'>
               <div className='container h-100'>
                  <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                     <div className='form-box'>
                        <div className='form-title-wrap'>
                           <h3 className='font-size-50px'>Đổi mật khẩu</h3>
                        </div>
                        <div className='form-content'>
                           <div className='contact-form-action'>
                              <form action='#'>
                                 <div className='row'>
                                    <div className='col-lg-12 responsive-column'>
                                       <div className='input-box'>
                                          <label className='label-text'>Mật khẩu hiện tại</label>
                                          <div className='form-group'>
                                             <span className='la la-lock form-icon' />
                                             <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Mật khẩu hiện tại'
                                             />
                                          </div>
                                       </div>
                                    </div>{" "}
                                    <div className='col-lg-12 responsive-column'>
                                       <div className='input-box'>
                                          <label className='label-text'>Mật khẩu mới</label>
                                          <div className='form-group'>
                                             <span className='la la-envelope form-icon' />
                                             <input className='form-control' type='text' placeholder='Mật khẩu mới' />
                                          </div>
                                       </div>
                                    </div>
                                    <div className='col-lg-12 responsive-column'>
                                       <div className='input-box'>
                                          <label className='label-text'>Xác nhận mật khẩu</label>
                                          <div className='form-group'>
                                             <span className='la la-envelope form-icon' />
                                             <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Xác nhận mật khẩu'
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <div className='col-lg-12'>
                                       <div className='btn-box'>
                                          <button className='theme-btn mr-2' type='button'>
                                             Đổi mật khẩu
                                          </button>
                                          <button
                                             className='theme-btn btn-danger'
                                             type='button'
                                             onClick={() => history.push(PATH.HOME_PAGE)}>
                                             Đóng
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </ForgetPasswordStyled>
      </ScrollToTop>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         getPosts: appApisActions.getPosts,
         getAllImagesPost: appApisActions.getAllImagesPost
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ForgetPassword);
