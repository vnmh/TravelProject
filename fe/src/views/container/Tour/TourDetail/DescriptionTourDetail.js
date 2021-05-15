import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const DescriptionTourDetailStyled = styled.div``;

const DescriptionTourDetail = (props) => {
   return (
      <DescriptionTourDetailStyled>
         <div>
            <h3 className='title font-size-20' name='titleTour'>
               Mô tả ngắn
            </h3>
            <p className='py-3'>
               {props.tourDetail?.describe}
            </p>
            <h3 className='title font-size-15 font-weight-medium pb-3'>Điểm nổi bật</h3>
            <div className='row'>
               <div className='col-lg-6 responsive-column'>
                  <ul className='list-items pb-3'>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Dolorem mediocritatem
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Mea appareat
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Prima causae
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Singulis indoctum
                     </li>
                  </ul>
               </div>
               <div className='col-lg-6 responsive-column'>
                  <ul className='list-items pb-3'>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Timeam inimicus
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Oportere democritum
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Cetero inermis
                     </li>
                     <li>
                        <i className='la la-dot-circle text-color mr-2' />
                        Pertinacia eum
                     </li>
                  </ul>
               </div>
            </div>
            <div className='row'>
               <div className='col-lg-6 responsive-column'>
                  <h3 className='title font-size-15 font-weight-medium pb-3'>Đã bao gồm</h3>
                  <ul className='list-items'>
                     <li>
                        <i className='la la-check text-success mr-2' />
                        Airfare
                     </li>
                     <li>
                        <i className='la la-check text-success mr-2' />
                        Local Transportation
                     </li>
                     <li>
                        <i className='la la-check text-success mr-2' />
                        Accommodation
                     </li>
                     <li>
                        <i className='la la-check text-success mr-2' />
                        Tour Guide
                     </li>
                  </ul>
               </div>
               <div className='col-lg-6 responsive-column'>
                  <h3 className='title font-size-15 font-weight-medium pb-3'>Không bao gồm</h3>
                  <ul className='list-items'>
                     <li>
                        <i className='la la-times text-danger mr-2' />
                        Entrance Fees
                     </li>
                     <li>
                        <i className='la la-times text-danger mr-2' />
                        Guide Gratuity
                     </li>
                     <li>
                        <i className='la la-times text-danger mr-2' />
                        Lunch
                     </li>
                     <li>
                        <i className='la la-times text-danger mr-2' />
                        Dinner
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </DescriptionTourDetailStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour
   }
)(DescriptionTourDetail);
