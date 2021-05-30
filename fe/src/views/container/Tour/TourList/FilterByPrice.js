import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import qs from "query-string";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Select } from "antd";

const FilterByPriceStyled = styled.div``;

function FilterByPrice(props) {
   const params = qs.parse(window.location.search);
   const [price, setPrice] = useState(+params.price);
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
                     <Select
                        value={price}
                        size='large'
                        onChange={(value) => setPrice(value)}
                        placeholder='Chọn giá'
                        style={{ width: "100%" }}>
                        <Select.Option value={1000000}>0 - 1,000,000</Select.Option>
                        <Select.Option value={5000000}>1,000,001 - 5,000,000</Select.Option>
                        <Select.Option value={10000000}>> 10.000.000</Select.Option>
                     </Select>
                  </div>
                  {/* end price-slider-amount */}
                  <div id='slider-range2' />
                  {/* end slider-range */}
               </div>
               {/* end main-search-input-item */}
               <div className='btn-box pt-4'>
                  <button
                     onClick={() => {
                        props.setPrice(price);
                        // setPrice
                     }}
                     className='theme-btn theme-btn-small theme-btn-transparent'
                     type='button'>
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
