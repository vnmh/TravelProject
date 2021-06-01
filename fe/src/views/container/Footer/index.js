import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SignUpEmail from "./SignUpEmail";
import logo from "~/static/images/logo.png";
import HOC from "~/HOC";

const FooterStyled = styled.div``;

const Footer = (props) => {
   return (
      <FooterStyled>
         <HOC>
            <SignUpEmail />
            <section className='footer-area section-bg padding-top-100px padding-bottom-30px' data-aos="fade-down">
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-3 responsive-column'>
                        <div className='footer-item'>
                           <div className='footer-logo padding-bottom-30px'>
                              <a href='index.html' className='foot__logo'>
                                 <img src={logo} alt='logo' />
                              </a>
                           </div>
                           <ul className='list-items pt-3'>
                              <li>
                                 Số 1 Võ Văn Ngân,
                                 <br /> Thủ Đức, Thành Phố Hồ Chí Minh
                              </li>
                              <li>+123-456-789</li>
                              <li>
                                 <a href='#'>travelproject@gmail.com</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     {/* end col-lg-3 */}
                     <div className='col-lg-3 responsive-column'>
                        <div className='footer-item'>
                           <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                              Trang web
                           </h4>
                           <ul className='list-items list--items'>
                              <li>
                                 <a href='about.html'>Tour</a>
                              </li>
                              <li>
                                 <a href='#'>Blog</a>
                              </li>
                              <li>
                                 <a href='services.html'>Dịch vụ</a>
                              </li>
                              <li>
                                 <a href='blog-grid.html'>About us</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className='col-lg-3 responsive-column'>
                        <div className='footer-item'>
                           <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                              Chính sách & Quy định
                           </h4>
                           <ul className='list-items list--items'>
                              <li>
                                 <a href='#'>Chính sách và quy định chung</a>
                              </li>
                              <li>
                                 <a href='#'>Quy định về thanh toán</a>
                              </li>
                              <li>
                                 <a href='#'>Quy định về xác nhận thông tin đặt tour</a>
                              </li>
                              <li>
                                 <a href='#'>Chính sách bảo mật thông tin</a>
                              </li>
                              <li>
                                 <a href='#'>Quy chế hoạt động</a>
                              </li>
                              <li>
                                 <a href='#'>Chính sách bảo mật</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className='col-lg-3 responsive-column'>
                        <div className='footer-item'>
                           <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                              Khách hàng và đối tác
                           </h4>
                           <ul className='list-items list--items'>
                              <li>
                                 <a href='#'>Đăng nhập</a>
                              </li>
                              <li>
                                 <a href='#'>Tuyển dụng</a>
                              </li>
                              <li>
                                 <a href='#'>Liên hệ</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className='row align-items-center'>
                     <div className='col-lg-8'>
                        <div className='term-box footer-item'>
                           <ul className='list-items list--items d-flex align-items-center'>
                              <li>
                                 <a href='#'>Chính sách &amp; Điều kiện</a>
                              </li>
                              <li>
                                 <a href='#'>Chính sách bảo mật</a>
                              </li>
                              <li>
                                 <a href='#'>Trung tâm trợ giúp</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className='col-lg-4'>
                        <div className='footer-social-box text-right'>
                           <ul className='social-profile'>
                              <li>
                                 <a href='#'>
                                    <i className='lab la-facebook-f' />
                                 </a>
                              </li>
                              <li>
                                 <a href='#'>
                                    <i className='lab la-twitter' />
                                 </a>
                              </li>
                              <li>
                                 <a href='#'>
                                    <i className='lab la-instagram' />
                                 </a>
                              </li>
                              <li>
                                 <a href='#'>
                                    <i className='lab la-linkedin-in' />
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='section-block mt-4' />
               <div className='container'>
                  <div className='row align-items-center'>
                     <div className='col-lg-7'>
                        <div className='copy-right padding-top-30px'>
                           <p className='copy__desc'>
                              © Copyright Trizen 2020. Made with
                              <span className='la la-heart' /> by{" "}
                              <a href='https://themeforest.net/user/techydevs/portfolio'>TechyDevs</a>
                           </p>
                        </div>
                     </div>
                     <div className='col-lg-5'>
                        <div className='copy-right-content d-flex align-items-center justify-content-end padding-top-30px'>
                           <h3 className='title font-size-15 pr-2'>We Accept</h3>
                           <img src='images/payment-img.png' alt='' />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </HOC>
      </FooterStyled>
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
)(Footer);
