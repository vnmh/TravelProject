import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const FooterStyled = styled.div``;

const Footer = (props) => {
   return (
      <FooterStyled>
         {/* ================================
            START CTA AREA
         ================================= */}
         <section className='cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px'>
            <div className='container'>
               <div className='row align-items-center'>
                  <div className='col-lg-7'>
                     <div className='section-heading'>
                        <h2 className='sec__title font-size-30 text-white'>Subscribe to see Secret Deals</h2>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-7 */}
                  <div className='col-lg-5'>
                     <div className='subscriber-box'>
                        <div className='contact-form-action'>
                           <form action='#'>
                              <div className='input-box'>
                                 <label className='label-text text-white'>Enter email address</label>
                                 <div className='form-group mb-0'>
                                    <span className='la la-envelope form-icon' />
                                    <input
                                       className='form-control'
                                       type='email'
                                       name='email'
                                       placeholder='Email address'
                                    />
                                    <button className='theme-btn theme-btn-small submit-btn' type='submit'>
                                       Subscribe
                                    </button>
                                    <span className='font-size-14 pt-1 text-white-50'>
                                       <i className='la la-lock mr-1' />
                                       Don't worry your information is safe with us.
                                    </span>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-5 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end cta-area */}
         {/* ================================
            END CTA AREA
         ================================= */}

         {/* ================================
            START FOOTER AREA
         ================================= */}
         <section className='footer-area section-bg padding-top-100px padding-bottom-30px'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-3 responsive-column'>
                     <div className='footer-item'>
                        <div className='footer-logo padding-bottom-30px'>
                           <a href='index.html' className='foot__logo'>
                              <img src='images/logo.png' alt='logo' />
                           </a>
                        </div>
                        {/* end logo */}
                        <p className='footer__desc'>Morbi convallis bibendum urna ut viverra. Maecenas consequat</p>
                        <ul className='list-items pt-3'>
                           <li>
                              3015 Grand Ave, Coconut Grove,
                              <br /> Cerrick Way, FL 12345
                           </li>
                           <li>+123-456-789</li>
                           <li>
                              <a href='#'>trizen@yourwebsite.com</a>
                           </li>
                        </ul>
                     </div>
                     {/* end footer-item */}
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column'>
                     <div className='footer-item'>
                        <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                           Company
                        </h4>
                        <ul className='list-items list--items'>
                           <li>
                              <a href='about.html'>About us</a>
                           </li>
                           <li>
                              <a href='services.html'>Services</a>
                           </li>
                           <li>
                              <a href='#'>Jobs</a>
                           </li>
                           <li>
                              <a href='blog-grid.html'>News</a>
                           </li>
                           <li>
                              <a href='contact.html'>Support</a>
                           </li>
                           <li>
                              <a href='#'>Advertising</a>
                           </li>
                        </ul>
                     </div>
                     {/* end footer-item */}
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column'>
                     <div className='footer-item'>
                        <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                           Other Services
                        </h4>
                        <ul className='list-items list--items'>
                           <li>
                              <a href='#'>Investor Relations</a>
                           </li>
                           <li>
                              <a href='#'>Trizen.com Rewards</a>
                           </li>
                           <li>
                              <a href='#'>Partners</a>
                           </li>
                           <li>
                              <a href='#'>List My Hotel</a>
                           </li>
                           <li>
                              <a href='#'>All Hotels</a>
                           </li>
                           <li>
                              <a href='#'>TV Ads</a>
                           </li>
                        </ul>
                     </div>
                     {/* end footer-item */}
                  </div>
                  {/* end col-lg-3 */}
                  <div className='col-lg-3 responsive-column'>
                     <div className='footer-item'>
                        <h4 className='title curve-shape pb-3 margin-bottom-20px' data-text='curvs'>
                           Other Links
                        </h4>
                        <ul className='list-items list--items'>
                           <li>
                              <a href='#'>USA Vacation Packages</a>
                           </li>
                           <li>
                              <a href='#'>USA Flights</a>
                           </li>
                           <li>
                              <a href='#'>USA Hotels</a>
                           </li>
                           <li>
                              <a href='#'>USA Car Hire</a>
                           </li>
                           <li>
                              <a href='#'>Create an Account</a>
                           </li>
                           <li>
                              <a href='#'>Trizen Reviews</a>
                           </li>
                        </ul>
                     </div>
                     {/* end footer-item */}
                  </div>
                  {/* end col-lg-3 */}
               </div>
               {/* end row */}
               <div className='row align-items-center'>
                  <div className='col-lg-8'>
                     <div className='term-box footer-item'>
                        <ul className='list-items list--items d-flex align-items-center'>
                           <li>
                              <a href='#'>Terms &amp; Conditions</a>
                           </li>
                           <li>
                              <a href='#'>Privacy Policy</a>
                           </li>
                           <li>
                              <a href='#'>Help Center</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  {/* end col-lg-8 */}
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
                  {/* end col-lg-4 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
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
                     {/* end copy-right */}
                  </div>
                  {/* end col-lg-7 */}
                  <div className='col-lg-5'>
                     <div className='copy-right-content d-flex align-items-center justify-content-end padding-top-30px'>
                        <h3 className='title font-size-15 pr-2'>We Accept</h3>
                        <img src='images/payment-img.png' alt='' />
                     </div>
                     {/* end copy-right-content */}
                  </div>
                  {/* end col-lg-5 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end footer-area */}
         {/* ================================
            START FOOTER AREA
         ================================= */}
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
