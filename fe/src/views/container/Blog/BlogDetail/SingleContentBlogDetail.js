import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const SingleContentBlogDetailStyled = styled.div``;

function SingleContentBlogDetail(props) {
   return (
      <SingleContentBlogDetailStyled>
         <div className='single-content-item pb-4'>
            <h3 className='title font-size-26'>{props.blogDetail?.titlePost}</h3>
            <div className='d-flex flex-wrap align-items-center pt-2'>
               {/* <p className='mr-2'>{props.tourDetail?.address}</p> */}
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
                        <h3 className='title font-size-15 font-weight-medium'>Khoảng thời gian</h3>
                        {/* <span className='font-size-13'>{props.tourDetail?.vocationTime} ngày</span> */}
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
                        <h3 className='title font-size-15 font-weight-medium'>Loại tour</h3>
                        {/* <span className='font-size-13'>{props.tourDetail?.type}</span> */}
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
                        <h3 className='title font-size-15 font-weight-medium'>Ngày khởi hành</h3>
                        <span className='font-size-13'></span>
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
      </SingleContentBlogDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   } 
)(SingleContentBlogDetail);
