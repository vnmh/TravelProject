import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterByRatingStyled = styled.div``;

function FilterByRating(props) {
   return (
      <FilterByRatingStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Filter by Rating</h3>
            <div className='sidebar-review'>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='s1' />
                  <label htmlFor='s1'>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <span className='color-text-3 font-size-13 ml-1'>(55.590)</span>
                     </span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='s2' />
                  <label htmlFor='s2'>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star-o' />
                        <span className='color-text-3 font-size-13 ml-1'>(40.590)</span>
                     </span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='s3' />
                  <label htmlFor='s3'>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <span className='color-text-3 font-size-13 ml-1'>(23.590)</span>
                     </span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='s4' />
                  <label htmlFor='s4'>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <span className='color-text-3 font-size-13 ml-1'>(12.590)</span>
                     </span>
                  </label>
               </div>
               <div className='custom-checkbox mb-0'>
                  <input type='checkbox' id='s5' />
                  <label htmlFor='s5'>
                     <span className='ratings d-flex align-items-center'>
                        <i className='la la-star' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <i className='la la-star-o' />
                        <span className='color-text-3 font-size-13 ml-1'>(590)</span>
                     </span>
                  </label>
               </div>
            </div>
         </div>
      </FilterByRatingStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterByRating);
