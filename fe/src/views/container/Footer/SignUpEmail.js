import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SignUpEmailStyled = styled.div``;

const SignUpEmail = (props) => {
   return (
      <SignUpEmailStyled>
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
      </SignUpEmailStyled>
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
)(SignUpEmail);
