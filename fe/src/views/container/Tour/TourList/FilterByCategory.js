import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterByCategoryStyled = styled.div``;

function FilterByCategory(props) {
   return (
      <FilterByCategoryStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Categories</h3>
            <div className='sidebar-category'>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c1' />
                  <label htmlFor='c1'>
                     All <span className='font-size-13 ml-1'>(1809)</span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c2' />
                  <label htmlFor='c2'>
                     Active Adventure Tours <span className='font-size-13 ml-1'>(809)</span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c3' />
                  <label htmlFor='c3'>
                     Ecotourism <span className='font-size-13 ml-1'>(504)</span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c4' />
                  <label htmlFor='c4'>
                     Escorted Tours <span className='font-size-13 ml-1'>(401)</span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c5' />
                  <label htmlFor='c5'>
                     Group Tours <span className='font-size-13 ml-1'>(277)</span>
                  </label>
               </div>
               <div className='custom-checkbox'>
                  <input type='checkbox' id='c6' />
                  <label htmlFor='c6'>
                     Ligula <span className='font-size-13 ml-1'>(87)</span>
                  </label>
               </div>
               <div className='collapse' id='categoryMenu'>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='c7' />
                     <label htmlFor='c7'>
                        Family Tours <span className='font-size-13 ml-1'>(100)</span>
                     </label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='c8' />
                     <label htmlFor='c8'>
                        City Trips <span className='font-size-13 ml-1'>(58)</span>
                     </label>
                  </div>
                  <div className='custom-checkbox'>
                     <input type='checkbox' id='c9' />
                     <label htmlFor='c9'>
                        National Parks Tours <span className='font-size-13 ml-1'>(33)</span>
                     </label>
                  </div>
               </div>
               {/* end collapse */}
               <a
                  className='btn-text'
                  data-toggle='collapse'
                  href='#categoryMenu'
                  role='button'
                  aria-expanded='false'
                  aria-controls='categoryMenu'>
                  <span className='show-more'>
                     Show More <i className='la la-angle-down' />
                  </span>
                  <span className='show-less'>
                     Show Less <i className='la la-angle-up' />
                  </span>
               </a>
            </div>
         </div>
      </FilterByCategoryStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterByCategory);
