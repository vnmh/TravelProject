import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const ReviewTourDetailStyled = styled.div``;

function ReviewTourDetail(props) {
   return (
      <ReviewTourDetailStyled>
         <h3 className='title font-size-20'>Showing 3 guest reviews</h3>
         <div className='comments-list padding-top-50px'>
            <div className='comment'>
               <div className='comment-avatar'>
                  <img className='avatar__img' alt='' src='images/team8.jpg' />
               </div>
               <div className='comment-body'>
                  <div className='meta-data'>
                     <h3 className='comment__author'>Jenny Doe</h3>
                     <div className='meta-data-inner d-flex'>
                        <span className='ratings d-flex align-items-center mr-1'>
                           <i className='la la-star' />
                           <i className='la la-star' />
                           <i className='la la-star' />
                           <i className='la la-star' />
                           <i className='la la-star' />
                        </span>
                        <p className='comment__date'>April 5, 2019</p>
                     </div>
                  </div>
                  <p className='comment-content'>
                     Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei,
                     amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                  </p>
                  <div className='comment-reply d-flex align-items-center justify-content-between'>
                     <a className='theme-btn' href='#' data-toggle='modal' data-target='#replayPopupForm'>
                        <span className='la la-mail-reply mr-1' />
                        Reply
                     </a>
                     <div className='reviews-reaction'>
                        <a href='#' className='comment-like'>
                           <i className='la la-thumbs-up' /> 13
                        </a>
                        <a href='#' className='comment-dislike'>
                           <i className='la la-thumbs-down' /> 2
                        </a>
                        <a href='#' className='comment-love'>
                           <i className='la la-heart-o' /> 5
                        </a>
                     </div>
                  </div>
               </div>
            </div>
            {/* end comments */}
            <div className='btn-box load-more text-center'>
               <button className='theme-btn theme-btn-small theme-btn-transparent' type='button'>
                  Load More Review
               </button>
            </div>
         </div>
      </ReviewTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ReviewTourDetail);
