import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const PaymentMethodStyled = styled.div``;

function PaymentMethod(props) {
   return (
      <PaymentMethodStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <h3 className='title'>Select Payment Method</h3>
            </div>
            {/* form-title-wrap */}
            <div className='form-content'>
               <div className='section-tab check-mark-tab text-center pb-4'>
                  <ul className='nav nav-tabs justify-content-center' id='myTab' role='tablist'>
                     <li className='nav-item'>
                        <a
                           className='nav-link active'
                           id='credit-card-tab'
                           data-toggle='tab'
                           href='#credit-card'
                           role='tab'
                           aria-controls='credit-card'
                           aria-selected='false'>
                           <i className='la la-check icon-element' />
                           <img src='images/payment-img.png' alt='' />
                           <span className='d-block pt-2'>Payment with credit card</span>
                        </a>
                     </li>
                     <li className='nav-item'>
                        <a
                           className='nav-link'
                           id='paypal-tab'
                           data-toggle='tab'
                           href='#paypal'
                           role='tab'
                           aria-controls='paypal'
                           aria-selected='true'>
                           <i className='la la-check icon-element' />
                           <img src='images/paypal.png' alt='' />
                           <span className='d-block pt-2'>Payment with PayPal</span>
                        </a>
                     </li>
                     <li className='nav-item'>
                        <a
                           className='nav-link'
                           id='payoneer-tab'
                           data-toggle='tab'
                           href='#payoneer'
                           role='tab'
                           aria-controls='payoneer'
                           aria-selected='true'>
                           <i className='la la-check icon-element' />
                           <img src='images/payoneer.png' alt='' />
                           <span className='d-block pt-2'>Payment with payoneer</span>
                        </a>
                     </li>
                  </ul>
               </div>
               {/* end section-tab */}
               <div className='tab-content'>
                  <div
                     className='tab-pane fade show active'
                     id='credit-card'
                     role='tabpanel'
                     aria-labelledby='credit-card-tab'>
                     <div className='contact-form-action'>
                        <form method='post'>
                           <div className='row'>
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Card Holder Name</label>
                                    <div className='form-group'>
                                       <span className='la la-credit-card form-icon' />
                                       <input
                                          className='form-control'
                                          type='text'
                                          name='text'
                                          placeholder='Card holder name'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Card Number</label>
                                    <div className='form-group'>
                                       <span className='la la-credit-card form-icon' />
                                       <input
                                          className='form-control'
                                          type='text'
                                          name='text'
                                          placeholder='Card number'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='row'>
                                    <div className='col-lg-6 responsive-column'>
                                       <div className='input-box'>
                                          <label className='label-text'>Expiry Month</label>
                                          <div className='form-group'>
                                             <span className='la la-credit-card form-icon' />
                                             <input className='form-control' type='text' name='text' placeholder='MM' />
                                          </div>
                                       </div>
                                    </div>
                                    <div className='col-lg-6 responsive-column'>
                                       <div className='input-box'>
                                          <label className='label-text'>Expiry Year</label>
                                          <div className='form-group'>
                                             <span className='la la-credit-card form-icon' />
                                             <input className='form-control' type='text' name='text' placeholder='YY' />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='input-box'>
                                    <label className='label-text'>CVV</label>
                                    <div className='form-group'>
                                       <span className='la la-pencil form-icon' />
                                       <input className='form-control' type='text' name='text' placeholder='CVV' />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-12'>
                                 <div className='input-box'>
                                    <div className='form-group'>
                                       <div className='custom-checkbox'>
                                          <input type='checkbox' id='agreechb' />
                                          <label htmlFor='agreechb'>
                                             By continuing, you agree to the <a href='#'>Terms and Conditions</a>.
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-12 */}
                              <div className='col-lg-12'>
                                 <div className='btn-box'>
                                    <button className='theme-btn' type='submit'>
                                       Confirm Booking
                                    </button>
                                 </div>
                              </div>
                              {/* end col-lg-12 */}
                           </div>
                        </form>
                     </div>
                     {/* end contact-form-action */}
                  </div>
                  {/* end tab-pane*/}
                  <div className='tab-pane fade' id='paypal' role='tabpanel' aria-labelledby='paypal-tab'>
                     <div className='contact-form-action'>
                        <form method='post'>
                           <div className='row'>
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Email Address</label>
                                    <div className='form-group'>
                                       <span className='la la-envelope form-icon' />
                                       <input
                                          className='form-control'
                                          type='email'
                                          name='email'
                                          placeholder='Enter email address'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Password</label>
                                    <div className='form-group'>
                                       <span className='la la-lock form-icon' />
                                       <input
                                          className='form-control'
                                          type='text'
                                          name='text'
                                          placeholder='Enter password'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-12'>
                                 <div className='btn-box'>
                                    <button className='theme-btn' type='submit'>
                                       Login Account
                                    </button>
                                 </div>
                              </div>
                              {/* end col-lg-12 */}
                           </div>
                        </form>
                     </div>
                     {/* end contact-form-action */}
                  </div>
                  {/* end tab-pane*/}
                  <div className='tab-pane fade' id='payoneer' role='tabpanel' aria-labelledby='payoneer-tab'>
                     <div className='contact-form-action'>
                        <form method='post'>
                           <div className='row'>
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Email Address</label>
                                    <div className='form-group'>
                                       <span className='la la-envelope form-icon' />
                                       <input
                                          className='form-control'
                                          type='email'
                                          name='email'
                                          placeholder='Enter email address'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6 responsive-column'>
                                 <div className='input-box'>
                                    <label className='label-text'>Password</label>
                                    <div className='form-group'>
                                       <span className='la la-lock form-icon' />
                                       <input
                                          className='form-control'
                                          type='text'
                                          name='text'
                                          placeholder='Enter password'
                                       />
                                    </div>
                                 </div>
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-12'>
                                 <div className='btn-box'>
                                    <button className='theme-btn' type='submit'>
                                       Login Account
                                    </button>
                                 </div>
                              </div>
                              {/* end col-lg-12 */}
                           </div>
                        </form>
                     </div>
                     {/* end contact-form-action */}
                  </div>
                  {/* end tab-pane*/}
               </div>
               {/* end tab-content */}
            </div>
            {/* end form-content */}
         </div>
      </PaymentMethodStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(PaymentMethod);
