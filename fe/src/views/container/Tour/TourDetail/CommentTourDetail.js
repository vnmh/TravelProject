import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const CommentTourDetailStyled = styled.div``;

function CommentTourDetail(props) {
   return (
      <CommentTourDetailStyled>
         <div className='comment-forum padding-top-40px'>
            <div className='form-box'>
               <div className='form-title-wrap'>
                  <h3 className='title'>Write a Review</h3>
               </div>
               {/* form-title-wrap */}
               <div className='form-content'>
                  <div className='rate-option p-2'>
                     <div className='row'>
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Service</label>
                              <div className='rate-stars-option'>
                                 <input type='checkbox' id='lst1' defaultValue={1} />
                                 <label htmlFor='lst1' />
                                 <input type='checkbox' id='lst2' defaultValue={2} />
                                 <label htmlFor='lst2' />
                                 <input type='checkbox' id='lst3' defaultValue={3} />
                                 <label htmlFor='lst3' />
                                 <input type='checkbox' id='lst4' defaultValue={4} />
                                 <label htmlFor='lst4' />
                                 <input type='checkbox' id='lst5' defaultValue={5} />
                                 <label htmlFor='lst5' />
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Location</label>
                              <div className='rate-stars-option'>
                                 <input type='checkbox' id='l1' defaultValue={1} />
                                 <label htmlFor='l1' />
                                 <input type='checkbox' id='l2' defaultValue={2} />
                                 <label htmlFor='l2' />
                                 <input type='checkbox' id='l3' defaultValue={3} />
                                 <label htmlFor='l3' />
                                 <input type='checkbox' id='l4' defaultValue={4} />
                                 <label htmlFor='l4' />
                                 <input type='checkbox' id='l5' defaultValue={5} />
                                 <label htmlFor='l5' />
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Value for Money</label>
                              <div className='rate-stars-option'>
                                 <input type='checkbox' id='vm1' defaultValue={1} />
                                 <label htmlFor='vm1' />
                                 <input type='checkbox' id='vm2' defaultValue={2} />
                                 <label htmlFor='vm2' />
                                 <input type='checkbox' id='vm3' defaultValue={3} />
                                 <label htmlFor='vm3' />
                                 <input type='checkbox' id='vm4' defaultValue={4} />
                                 <label htmlFor='vm4' />
                                 <input type='checkbox' id='vm5' defaultValue={5} />
                                 <label htmlFor='vm5' />
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Cleanliness</label>
                              <div className='rate-stars-option'>
                                 <input type='checkbox' id='cln1' defaultValue={1} />
                                 <label htmlFor='cln1' />
                                 <input type='checkbox' id='cln2' defaultValue={2} />
                                 <label htmlFor='cln2' />
                                 <input type='checkbox' id='cln3' defaultValue={3} />
                                 <label htmlFor='cln3' />
                                 <input type='checkbox' id='cln4' defaultValue={4} />
                                 <label htmlFor='cln4' />
                                 <input type='checkbox' id='cln5' defaultValue={5} />
                                 <label htmlFor='cln5' />
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Facilities</label>
                              <div className='rate-stars-option'>
                                 <input type='checkbox' id='f1' defaultValue={1} />
                                 <label htmlFor='f1' />
                                 <input type='checkbox' id='f2' defaultValue={2} />
                                 <label htmlFor='f2' />
                                 <input type='checkbox' id='f3' defaultValue={3} />
                                 <label htmlFor='f3' />
                                 <input type='checkbox' id='f4' defaultValue={4} />
                                 <label htmlFor='f4' />
                                 <input type='checkbox' id='f5' defaultValue={5} />
                                 <label htmlFor='f5' />
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                     </div>
                     {/* end row */}
                  </div>
                  {/* end rate-option */}
                  <div className='contact-form-action'>
                     <form method='post'>
                        <div className='row'>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Name</label>
                                 <div className='form-group'>
                                    <span className='la la-user form-icon' />
                                    <input className='form-control' type='text' name='text' placeholder='Your name' />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope-o form-icon' />
                                    <input
                                       className='form-control'
                                       type='email'
                                       name='email'
                                       placeholder='Email address'
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12'>
                              <div className='input-box'>
                                 <label className='label-text'>Message</label>
                                 <div className='form-group'>
                                    <span className='la la-pencil form-icon' />
                                    <textarea
                                       className='message-control form-control'
                                       name='message'
                                       placeholder='Write message'
                                       defaultValue={""}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button type='button' className='theme-btn'>
                                    Leave a Review
                                 </button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
                  {/* end contact-form-action */}
               </div>
               {/* end form-content */}
            </div>
            {/* end form-box */}
         </div>
      </CommentTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(CommentTourDetail);
