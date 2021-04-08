import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const SingleContentTourDetailStyled = styled.div``;

function SingleContentTourDetail(props) {
   return (
      <SingleContentTourDetailStyled>
         <div className='single-content-item pb-4'>
            <h3 className='title font-size-26'>3 Days Tour: the Great Wall of China</h3>
            <div className='d-flex flex-wrap align-items-center pt-2'>
               <p className='mr-2'>Huairou District, China</p>
               <p>
                  <span className='badge badge-warning text-white font-size-16'>4.6</span>
                  <span>(4,209 Reviews)</span>
               </p>
            </div>
         </div>
         {/* end single-content-item */}
         <div className='section-block' />
         <div className='single-content-item py-4'>
            <div className='row'>
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-clock-o' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Duration</h3>
                        <span className='font-size-13'>3 Days</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-users' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Group Size</h3>
                        <span className='font-size-13'>30 People</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-globe' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Tour Type</h3>
                        <span className='font-size-13'>Adventures Tour</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-calendar' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Date</h3>
                        <span className='font-size-13'>Jan 19' - Dec 21'</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-user' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Min Age</h3>
                        <span className='font-size-13'>10+</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
               <div className='col-lg-4 responsive-column'>
                  <div className='single-tour-feature d-flex align-items-center mb-3'>
                     <div className='single-feature-icon icon-element ml-0 flex-shrink-0 mr-3'>
                        <i className='la la-plane' />
                     </div>
                     <div className='single-feature-titles'>
                        <h3 className='title font-size-15 font-weight-medium'>Pickup From</h3>
                        <span className='font-size-13'>Airport</span>
                     </div>
                  </div>
                  {/* end single-tour-feature */}
               </div>
               {/* end col-lg-4 */}
            </div>
            {/* end row */}
         </div>
         {/* end single-content-item */}
      </SingleContentTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(SingleContentTourDetail);
