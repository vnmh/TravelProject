import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterByReviewScoreStyled = styled.div``;

function FilterByReviewScore(props) {
   return (
      <FilterByReviewScoreStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Review Score</h3>
            <div className='sidebar-category'>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='r6' />
                  <label htmlFor='r6'>Excellent</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='r7' />
                  <label htmlFor='r7'>Very Good</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='r8' />
                  <label htmlFor='r8'>Average</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='r9' />
                  <label htmlFor='r9'>Poor</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='r10' />
                  <label htmlFor='r10'>Terrible</label>
               </div>
            </div>
         </div>
      </FilterByReviewScoreStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterByReviewScore);
