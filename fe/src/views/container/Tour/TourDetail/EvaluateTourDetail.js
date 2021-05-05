import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const EvaluateTourDetailStyled = styled.div``;

function EvaluateTourDetail(props) {
   return (
      <EvaluateTourDetailStyled>
         <div id='reviews' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20'>Đánh giá</h3>
               <div className='review-container padding-top-30px'>
                  <div className='row align-items-center'>
                     <div className='col-lg-4'>
                        <div className='review-summary'>
                           <h2>
                              4.5<span>/5</span>
                           </h2>
                           <p>Excellent</p>
                           <span>Based on 4 reviews</span>
                        </div>
                     </div>
                     {/* end col-lg-4 */}
                     <div className='col-lg-8'>
                        <div className='review-bars'>
                           <div className='row'>
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Service</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <div className='progressbar-line' data-percent='70%'>
                                             <div className='progressbar-line-item bar-bg-1' />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                       </div>
                                       <div className='bar-percent'>4.6</div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Location</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <div className='progressbar-line' data-percent='55%'>
                                             <div className='progressbar-line-item bar-bg-2' />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                       </div>
                                       <div className='bar-percent'>4.7</div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Value for Money</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <div className='progressbar-line' data-percent='40%'>
                                             <div className='progressbar-line-item bar-bg-3' />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                       </div>
                                       <div className='bar-percent'>2.6</div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Cleanliness</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <div className='progressbar-line' data-percent='60%'>
                                             <div className='progressbar-line-item bar-bg-4' />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                       </div>
                                       <div className='bar-percent'>3.6</div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Facilities</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <div className='progressbar-line' data-percent='50%'>
                                             <div className='progressbar-line-item bar-bg-5' />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                       </div>
                                       <div className='bar-percent'>2.6</div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                           </div>
                           {/* end row */}
                        </div>
                     </div>
                     {/* end col-lg-8 */}
                  </div>
               </div>
            </div>
            {/* end single-content-item */}
            <div className='section-block' />
         </div>
      </EvaluateTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(EvaluateTourDetail);
