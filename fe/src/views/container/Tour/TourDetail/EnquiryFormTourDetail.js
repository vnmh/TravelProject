import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const EnquiryFormTourDetailStyled = styled.div``;

function EnquiryFormTourDetail(props) {
   return (
      <EnquiryFormTourDetailStyled>
         <div className='sidebar-widget single-content-widget'>
            <h3 className='title stroke-shape'>Enquiry Form</h3>
            <div className='enquiry-forum'>
               <div className='form-box'>
                  <div className='form-content'>
                     <div className='contact-form-action'>
                        <form method='post'>
                           <div className='input-box'>
                              <label className='label-text'>Your Name</label>
                              <div className='form-group'>
                                 <span className='la la-user form-icon' />
                                 <input className='form-control' type='text' name='text' placeholder='Your name' />
                              </div>
                           </div>
                           <div className='input-box'>
                              <label className='label-text'>Your Email</label>
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
                           <div className='input-box'>
                              <div className='form-group'>
                                 <div className='custom-checkbox mb-0'>
                                    <input type='checkbox' id='agreeChb' />
                                    <label htmlFor='agreeChb'>
                                       I agree with <a href='#'>Terms of Service</a> and
                                       <a href='#'>Privacy Statement</a>
                                    </label>
                                 </div>
                              </div>
                           </div>
                           <div className='btn-box'>
                              <button type='button' className='theme-btn'>
                                 Submit Enquiry
                              </button>
                           </div>
                        </form>
                     </div>
                     {/* end contact-form-action */}
                  </div>
                  {/* end form-content */}
               </div>
               {/* end form-box */}
            </div>
            {/* end enquiry-forum */}
         </div>
      </EnquiryFormTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(EnquiryFormTourDetail);
