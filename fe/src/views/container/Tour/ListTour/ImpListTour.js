import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const ImpListTourStyled = styled.div``;

function ImpListTour(props) {
   return (
      <ImpListTourStyled>
         {/* ================================
            START CARD AREA
         ================================= */}
         <section className='card-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='filter-wrap margin-bottom-30px'>
                        <div className='filter-top d-flex align-items-center justify-content-between pb-4'>
                           <div>
                              <h3 className='title font-size-24'>2292 Tours found</h3>
                              <p className='font-size-14 line-height-20 pt-1'>
                                 Book with confidence: No tour booking fees
                              </p>
                           </div>
                           <div className='layout-view d-flex align-items-center'>
                              <a href='tour-grid.html' data-toggle='tooltip' data-placement='top' title='Grid View'>
                                 <i className='la la-th-large' />
                              </a>
                              <a
                                 href='tour-list.html'
                                 data-toggle='tooltip'
                                 data-placement='top'
                                 title='List View'
                                 className='active'>
                                 <i className='la la-th-list' />
                              </a>
                           </div>
                        </div>
                        {/* end filter-top */}
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
                                             <button
                                                className='theme-btn theme-btn-small theme-btn-transparent'
                                                type='button'>
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
                           <div className='select-contain'>
                              <select className='select-contain-select'>
                                 <option value={1}>Short by default</option>
                                 <option value={2}>New Tour</option>
                                 <option value={3}>Price: low to high</option>
                                 <option value={4}>Price: high to low</option>
                                 <option value={5}>A to Z</option>
                              </select>
                           </div>
                           {/* end select-contain */}
                        </div>
                        {/* end filter-bar */}
                     </div>
                     {/* end filter-wrap */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}

               <div className='row'>
                  <div className='col-lg-4'>
                     <div className='sidebar mt-0'>
                        <div className='sidebar-widget'>
                           <h3 className='title stroke-shape'>Where would like to go?</h3>
                           <div className='sidebar-widget-item'>
                              <div className='contact-form-action'>
                                 <form action='#'>
                                    <div className='input-box'>
                                       <label className='label-text'>Destination</label>
                                       <div className='form-group'>
                                          <span className='la la-map-marker form-icon' />
                                          <input
                                             className='form-control'
                                             type='text'
                                             placeholder='Destination, city, or region'
                                          />
                                       </div>
                                    </div>
                                    <div className='input-box'>
                                       <label className='label-text'>From</label>
                                       <div className='form-group'>
                                          <span className='la la-calendar form-icon' />
                                          <input
                                             className='date-range form-control'
                                             type='text'
                                             name='daterange-single'
                                             readOnly
                                          />
                                       </div>
                                    </div>
                                    <div className='input-box'>
                                       <label className='label-text'>To</label>
                                       <div className='form-group'>
                                          <span className='la la-calendar form-icon' />
                                          <input
                                             className='date-range form-control'
                                             type='text'
                                             name='daterange-single'
                                             readOnly
                                          />
                                       </div>
                                    </div>
                                    <div className='input-box'>
                                       <label className='label-text'>Trip Type</label>
                                       <div className='form-group'>
                                          <div className='select-contain select-contain-shadow w-auto'>
                                             <select className='select-contain-select'>
                                                <option value={1}>City Tour</option>
                                                <option value={2}>Village Tour</option>
                                                <option value={3}>Holiday Tour</option>
                                                <option value={4}>Honeymoon Tour</option>
                                                <option value={5}>Family Tour</option>
                                             </select>
                                          </div>
                                          {/* end select-contain */}
                                       </div>
                                    </div>
                                 </form>
                              </div>
                           </div>
                           {/* end sidebar-widget-item */}
                           <div className='btn-box pt-2'>
                              <a href='tour-search-result.html' className='theme-btn'>
                                 Search Now
                              </a>
                           </div>
                        </div>
                        {/* end sidebar-widget */}
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
                        {/* end sidebar-widget */}
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
                        {/* end sidebar-widget */}
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
                        {/* end sidebar-widget */}
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
                        {/* end sidebar-widget */}
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
                     </div>
                     {/* end sidebar */}
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-8'>
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img9.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Empire State Building Admission</a>
                           </h3>
                           <p className='card-meta'>124 E Huron St, New york</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />
                                 Full day
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img10.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                           <span className='badge'>Bestseller</span>
                           <span className='badge badge-ribbon'>24% Save</span>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Hut on Blue Water Beach Tour</a>
                           </h3>
                           <p className='card-meta'>124 Nevada, Las Vegas</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$100.00</span>
                                 <span className='price__num before-price color-text-3'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />7 days
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img9.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Empire State Building Admission</a>
                           </h3>
                           <p className='card-meta'>124 E Huron St, New york</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />
                                 Full day
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img10.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                           <span className='badge'>Bestseller</span>
                           <span className='badge badge-ribbon'>24% Save</span>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Hut on Blue Water Beach Tour</a>
                           </h3>
                           <p className='card-meta'>124 Nevada, Las Vegas</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$100.00</span>
                                 <span className='price__num before-price color-text-3'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />7 days
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img11.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Golden Gate Seaplane Tour</a>
                           </h3>
                           <p className='card-meta'>124 E Huron St, New york</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />8 Hours
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img12.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                           <span className='badge'>Featured</span>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Two Hours Guided Horseback Tour</a>
                           </h3>
                           <p className='card-meta'>124 E Huron St, New york</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />3 days
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img13.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Scuba Diving in Boyton Beach</a>
                           </h3>
                           <p className='card-meta'>124 Nevada, New Jersey</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />
                                 3-5 hours
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                     <div className='card-item card-item-list '>
                        <div className='card-img'>
                           <a href='tour-details.html' className='d-block'>
                              <img src='images/img14.jpg' alt='Destination-img' />
                           </a>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                           <span className='badge'>Featured</span>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <a href='tour-details.html'>Mangrove Tunnel Kayak Eco Tour</a>
                           </h3>
                           <p className='card-meta'>212 Colin road, Canada</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>
                              <span className='review__text'>Average</span>
                              <span className='rating__text'>(30 Reviews)</span>
                           </div>
                           <div className='card-price d-flex align-items-center justify-content-between'>
                              <p>
                                 <span className='price__from'>From</span>
                                 <span className='price__num'>$124.00</span>
                              </p>
                              <span className='tour-hour'>
                                 <i className='la la-clock-o mr-1' />1 day
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* end card-item */}
                  </div>
                  {/* end col-lg-8 */}
               </div>
               {/* end row */}

               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='btn-box mt-3 text-center'>
                        <button type='button' className='theme-btn'>
                           <i className='la la-refresh mr-1' />
                           Load More
                        </button>
                        <p className='font-size-13 pt-2'>Showing 1 - 8 of 2292 Tours</p>
                     </div>
                     {/* end btn-box */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/*end container*/}
         </section>
         {/*end card-area*/}
         {/* ================================
            END CARD AREA
         ================================= */}

         {/* ================================
            START INFO AREA
         ================================= */}
         <section className='info-area info-bg padding-top-90px padding-bottom-70px'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb text-color-2'>
                           <i className='la la-phone' />
                        </div>
                        {/* end info-icon*/}
                        <div className='info-content'>
                           <h4 className='info__title'>Need Help? Contact us</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                        {/* end info-content */}
                     </a>
                     {/* end icon-box */}
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb-2 text-color-3'>
                           <i className='la la-money' />
                        </div>
                        {/* end info-icon*/}
                        <div className='info-content'>
                           <h4 className='info__title'>Payments</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                        {/* end info-content */}
                     </a>
                     {/* end icon-box */}
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb-3 text-color-4'>
                           <i className='la la-times' />
                        </div>
                        {/* end info-icon*/}
                        <div className='info-content'>
                           <h4 className='info__title'>Cancel Policy</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                        {/* end info-content */}
                     </a>
                     {/* end icon-box */}
                  </div>
                  {/* end col-lg-4 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end info-area */}
         {/* ================================
            END INFO AREA
         ================================= */}
      </ImpListTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ImpListTour);
