import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const ItineraryTourDetailStyled = styled.div``;

function ItineraryTourDetail(props) {

   return (
      <ItineraryTourDetailStyled>
         <div id='itinerary' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20'>Hành trình</h3>
               <div className='accordion accordion-item padding-top-30px' id='accordionExample'>
                  <div className='card'>
                     <div className='card-header' id='faqHeadingOne'>
                        <h2 className='mb-0'>
                           <button
                              className='btn btn-link d-flex align-items-center justify-content-between font-size-16'
                              type='button'
                              data-toggle='collapse'
                              data-target='#faqCollapseOne'
                              aria-expanded='true'
                              aria-controls='faqCollapseOne'>
                              <span>{props.tourDetail?.title}</span>
                           </button>
                        </h2>
                     </div>
                     <div
                        id='faqCollapseOne'
                        className='collapse show'
                        aria-labelledby='faqHeadingOne'
                        data-parent='#accordionExample'>
                        <div className='card-body d-flex align-items-center'>
                           <div className='flex-shrink-0 mt-2 mr-4'>
                              <img src='images/small-img.jpg' alt='destination-img' />
                           </div>
                           <p>
                              Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae
                              admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit
                              illum euismod facilisis Nullam id dolor id nibh ultricies vehicula ut id elit.
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* end card */}
                  <div className='card'>
                     <div className='card-header' id='faqHeadingTwo'>
                        <h2 className='mb-0'>
                           <button
                              className='btn btn-link d-flex align-items-center justify-content-between font-size-16'
                              type='button'
                              data-toggle='collapse'
                              data-target='#faqCollapseTwo'
                              aria-expanded='true'
                              aria-controls='faqCollapseTwo'>
                              <span>Day 02 - Beijing - Temple of Heaven</span>
                           </button>
                        </h2>
                     </div>
                     <div
                        id='faqCollapseTwo'
                        className='collapse'
                        aria-labelledby='faqHeadingTwo'
                        data-parent='#accordionExample'>
                        <div className='card-body d-flex align-items-center'>
                           <div className='flex-shrink-0 mt-2 mr-4'>
                              <img src='images/small-img2.jpg' alt='destination-img' />
                           </div>
                           <p>
                              Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae
                              admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit
                              illum euismod facilisis Nullam id dolor id nibh ultricies vehicula ut id elit.
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* end card */}
                  <div className='card'>
                     <div className='card-header' id='faqHeadingThree'>
                        <h2 className='mb-0'>
                           <button
                              className='btn btn-link d-flex align-items-center justify-content-between font-size-16'
                              type='button'
                              data-toggle='collapse'
                              data-target='#faqCollapseThree'
                              aria-expanded='true'
                              aria-controls='faqCollapseThree'>
                              <span>Day 03 - Jinan to New york</span>
                           </button>
                        </h2>
                     </div>
                     <div
                        id='faqCollapseThree'
                        className='collapse'
                        aria-labelledby='faqHeadingThree'
                        data-parent='#accordionExample'>
                        <div className='card-body d-flex align-items-center'>
                           <div className='flex-shrink-0 mt-2 mr-4'>
                              <img src='images/small-img3.jpg' alt='destination-img' />
                           </div>
                           <p>
                              Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae
                              admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit
                              illum euismod facilisis Nullam id dolor id nibh ultricies vehicula ut id elit.
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* end card */}
               </div>
            </div>
            {/* end single-content-item */}
            <div className='section-block' />
         </div>
      </ItineraryTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ItineraryTourDetail);
