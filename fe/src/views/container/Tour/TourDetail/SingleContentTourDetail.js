import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { TYPE_TOUR } from "~/configs/const";

const SingleContentTourDetailStyled = styled.div``;

function SingleContentTourDetail(props) {
   return (
      <SingleContentTourDetailStyled>
         <div className='single-content-item pb-4'>
            <h3 className='title font-size-26'>{props.tourDetail?.titleTour}</h3>
            <div className='d-flex flex-wrap align-items-center pt-2'>
               <p className='mr-2'>{props.tourDetail?.address}</p>
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
                        <span className='font-size-13'>{props.tourDetail?.vocationTime} ngày</span>
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
                        <h3 className='title font-size-15 font-weight-medium'>Số lượng</h3>
                        <span className='font-size-13'>{props.tourDetail?.groupSize}</span>
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
                        <span className='font-size-13'>{TYPE_TOUR[props.tourDetail?.type] || ""}</span>
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
                        <span className='font-size-13'> {UtilDate.toDateLocal(props.tourDetail?.departureDay)}</span>
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
                        <h3 className='title font-size-15 font-weight-medium'>Độ tuổi nhỏ nhất</h3>
                        <span className='font-size-13'>{props.tourDetail?.minAge}</span>
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
                        <h3 className='title font-size-15 font-weight-medium'>Địa điểm khởi hành</h3>
                        <span className='font-size-13'>{props.tourDetail?.departureAddress}</span>
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
