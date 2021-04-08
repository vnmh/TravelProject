import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterByPriceStyled = styled.div``;

function FilterByPrice(props) {
   return (
      <FilterByPriceStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Filter by Price</h3>
            <div className='sidebar-price-range'>
               <div className='main-search-input-item'>
                  <div className='price-slider-amount padding-bottom-20px'>
                     <label htmlFor='amount2' className='filter__label'>
                        Price:
                     </label>
                     <input type='text' id='amount2' className='amounts' />
                  </div>
                  {/* end price-slider-amount */}
                  <div id='slider-range2' />
                  {/* end slider-range */}
               </div>
               {/* end main-search-input-item */}
               <div className='btn-box pt-4'>
                  <button className='theme-btn theme-btn-small theme-btn-transparent' type='button'>
                     Apply
                  </button>
               </div>
            </div>
         </div>
      </FilterByPriceStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterByPrice);
