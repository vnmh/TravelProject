import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Select } from "antd";

const { Option } = Select;

const FilterOptionTourStyled = styled.div``;

function FilterOptionTour(props) {
   const handleChange = (value) => {
      props.setSortType(value);
      console.log(`selected ${value}`);
   };
   return (
      <FilterOptionTourStyled>
         <div className='filter-bar d-flex align-items-center justify-content-between'>
            <div className='filter-bar-filter d-flex flex-wrap align-items-center'>
               <div className='filter-option'>
                  <h3 className='title font-size-16'>Filter by:</h3>
               </div>
               <div className='filter-option'>
                  <div className='dropdown dropdown-contain'>
                     <a
                        className='dropdown-toggle dropdown-btn dropdown--btn'
                        href='#'
                        role='button'
                        data-toggle='dropdown'>
                        Filter Price
                     </a>
                     <div className='dropdown-menu dropdown-menu-wrap'>
                        <div className='dropdown-item'>
                           <div className='slider-range-wrap'>
                              <div className='price-slider-amount padding-bottom-20px'>
                                 <label htmlFor='amount' className='filter__label'>
                                    Price:
                                 </label>
                                 <input type='text' id='amount' className='amounts' />
                              </div>
                              {/* end price-slider-amount */}
                              <div id='slider-range' />
                              {/* end slider-range */}
                           </div>
                           {/* end slider-range-wrap */}
                           <div className='btn-box pt-4'>
                              <button className='theme-btn theme-btn-small theme-btn-transparent' type='button'>
                                 Apply
                              </button>
                           </div>
                        </div>
                        {/* end dropdown-item */}
                     </div>
                     {/* end dropdown-menu */}
                  </div>
                  {/* end dropdown */}
               </div>
               <div className='filter-option'>
                  <div className='dropdown dropdown-contain'>
                     <a
                        className='dropdown-toggle dropdown-btn dropdown--btn'
                        href='#'
                        role='button'
                        data-toggle='dropdown'>
                        Review Score
                     </a>
                     <div className='dropdown-menu dropdown-menu-wrap'>
                        <div className='dropdown-item'>
                           <div className='checkbox-wrap'>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='r1' />
                                 <label htmlFor='r1'>
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
                                 <input type='checkbox' id='r2' />
                                 <label htmlFor='r2'>
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
                                 <input type='checkbox' id='r3' />
                                 <label htmlFor='r3'>
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
                                 <input type='checkbox' id='r4' />
                                 <label htmlFor='r4'>
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
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='r5' />
                                 <label htmlFor='r5'>
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
                        {/* end dropdown-item */}
                     </div>
                     {/* end dropdown-menu */}
                  </div>
                  {/* end dropdown */}
               </div>
               <div className='filter-option'>
                  <div className='dropdown dropdown-contain'>
                     <a
                        className='dropdown-toggle dropdown-btn dropdown--btn'
                        href='#'
                        role='button'
                        data-toggle='dropdown'>
                        Categories
                     </a>
                     <div className='dropdown-menu dropdown-menu-wrap'>
                        <div className='dropdown-item'>
                           <div className='checkbox-wrap'>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb1' />
                                 <label htmlFor='catChb1'>Active Adventures Tours</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb2' />
                                 <label htmlFor='catChb2'>Ecotourism</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb3' />
                                 <label htmlFor='catChb3'>Group Tours</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb4' />
                                 <label htmlFor='catChb4'>Ligula</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb5' />
                                 <label htmlFor='catChb5'>Family Tours</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb6' />
                                 <label htmlFor='catChb6'>City Tour</label>
                              </div>
                              <div className='custom-checkbox'>
                                 <input type='checkbox' id='catChb7' />
                                 <label htmlFor='catChb7'>National Park Tours</label>
                              </div>
                           </div>
                        </div>
                        {/* end dropdown-item */}
                     </div>
                     {/* end dropdown-menu */}
                  </div>
                  {/* end dropdown */}
               </div>
            </div>
            {/* end filter-bar-filter */}
            {/* <div className='select-contain'>
               <Select defaultValue='Mặc định' style={{ width: 200 }} onChange={handleChange}>
                  <Option value='filter-default'>Mặc định</Option>
                  <Option value='new-tour'>Tour mới</Option>
                  <Option value='price-low-to-high'>Giá: thấp đến cao</Option>
                  <Option value='price-high-to-low'>Giá: cao đến thấp</Option>
                  <Option value='a-to-z'>A đến Z</Option>
               </Select>
            </div> */}
            {/* end select-contain */}
         </div>
         {/* end filter-bar */}
      </FilterOptionTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterOptionTour);
