import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterByDurationStyled = styled.div``;

function FilterByDuration(props) {
   return (
      <FilterByDurationStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Tour Duration</h3>
            <div className='sidebar-category'>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='all' />
                  <label htmlFor='all'>All</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='full-day' />
                  <label htmlFor='full-day'>Full Day</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='days-10' />
                  <label htmlFor='days-10'>10 Days</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='days-7' />
                  <label htmlFor='days-7'>7 Days</label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='days-5' />
                  <label htmlFor='days-5'>5 Days</label>
               </div>
               <div className='collapse' id='tourDurationMenu'>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='days-3' />
                     <label htmlFor='days-3'>3 Days</label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='days-2' />
                     <label htmlFor='days-2'>2 Days</label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='hours-8' />
                     <label htmlFor='hours-8'>8 Hours</label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='hours-3-5' />
                     <label htmlFor='hours-3-5'>3-5 Hours</label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='hours-3' />
                     <label htmlFor='hours-3'>3 Hours</label>
                  </div>
               </div>
               {/* end collapse */}
               <a
                  className='btn-text'
                  data-toggle='collapse'
                  href='#tourDurationMenu'
                  role='button'
                  aria-expanded='false'
                  aria-controls='tourDurationMenu'>
                  <span className='show-more'>
                     Show More <i className='la la-angle-down' />
                  </span>
                  <span className='show-less'>
                     Show Less <i className='la la-angle-up' />
                  </span>
               </a>
            </div>
         </div>
         {/* end sidebar-widget */}
      </FilterByDurationStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterByDuration);
