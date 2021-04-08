import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const DescriptionTourDetailStyled = styled.div``;

function DescriptionTourDetail(props) {
   return (
      <DescriptionTourDetailStyled>
         <h3 className='title font-size-20'>Description</h3>
         <p className='py-3'>
            Per consequat adolescens ex, cu nibh commune temporibus vim, ad sumo viris eloquentiam sed. Mea appareat
            omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae admodum id est, ei timeam inimicus
            sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate
            pertinacia eum at.
         </p>
         <p className='pb-4'>
            Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint blandit efficiendi.
            Atomorum explicari eu qui, est enim quaerendum te. Quo harum viris id. Per ne quando dolore evertitur, pro
            ad cibo commune.
         </p>
         <h3 className='title font-size-15 font-weight-medium pb-3'>Highlights</h3>
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
         {/* end row */}
         <div className='row'>
            <div className='col-lg-6 responsive-column'>
               <h3 className='title font-size-15 font-weight-medium pb-3'>Included</h3>
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
               <h3 className='title font-size-15 font-weight-medium pb-3'>Not Included</h3>
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
         {/* end row */}
      </DescriptionTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(DescriptionTourDetail);
