import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const SearchTourPageStyled = styled.div`
   height: 100vh;
`;

const SearchTour = (props) => {
   return (
      <SearchTourPageStyled>
         {/* End background slider */}
         <div className='container'>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='hero-content pb-5 text-center'>
                     <div className='section-heading'>
                        <h2 className='sec__title font-size-70 pb-3'>Are You Ready...</h2>
                        <p className='sec__desc font-size-30 font-weight-medium'>To explore new things?</p>
                     </div>
                  </div>
                  {/* end hero-content */}
                  <div className='search-fields-container'>
                     <div className='contact-form-action'>
                        <form action='#' className='row'>
                           <div className='col-lg-3 pr-0'>
                              <div className='input-box'>
                                 <label className='label-text'>Destination</label>
                                 <div className='form-group'>
                                    <span className='la la-map-marker form-icon' />
                                    <input className='form-control' type='text' placeholder='Where are you going?' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-3 */}
                           <div className='col-lg-3 pr-0'>
                              <div className='input-box'>
                                 <label className='label-text'>When</label>
                                 <div className='form-group'>
                                    <span className='la la-calendar form-icon' />
                                    <input className='date-range form-control' type='text' name='daterange' readOnly />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-3 */}
                           <div className='col-lg-3 pr-0'>
                              <div className='input-box'>
                                 <label className='label-text'>Guests</label>
                                 <div className='form-group'>
                                    <div className='dropdown dropdown-contain gty-container'>
                                       <a
                                          className='dropdown-toggle dropdown-btn'
                                          href='#'
                                          role='button'
                                          data-toggle='dropdown'
                                          aria-expanded='false'>
                                          <span className='adult' data-text='Adult' data-text-multi='Adults'>
                                             0 Adult
                                          </span>
                                          -
                                          <span className='children' data-text='Child' data-text-multi='Children'>
                                             0 Children
                                          </span>
                                       </a>
                                       <div className='dropdown-menu dropdown-menu-wrap'>
                                          <div className='dropdown-item'>
                                             <div className='qty-box d-flex align-items-center justify-content-between'>
                                                <label>Adults</label>
                                                <div className='qtyBtn d-flex align-items-center'>
                                                   <div className='qtyDec'>
                                                      <i className='la la-minus' />
                                                   </div>
                                                   <input type='text' name='adult_number' defaultValue={0} />
                                                   <div className='qtyInc'>
                                                      <i className='la la-plus' />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className='dropdown-item'>
                                             <div className='qty-box d-flex align-items-center justify-content-between'>
                                                <label>Children</label>
                                                <div className='qtyBtn d-flex align-items-center'>
                                                   <div className='qtyDec'>
                                                      <i className='la la-minus' />
                                                   </div>
                                                   <input type='text' name='child_number' defaultValue={0} />
                                                   <div className='qtyInc'>
                                                      <i className='la la-plus' />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    {/* end dropdown */}
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-3 */}
                           <div className='col-lg-3'>
                              <div className='input-box'>
                                 <label className='label-text'>Price</label>
                                 <div className='form-group'>
                                    <div className='dropdown dropdown-contain'>
                                       <a
                                          className='dropdown-toggle dropdown-btn'
                                          href='#'
                                          role='button'
                                          data-toggle='dropdown'
                                          aria-expanded='false'>
                                          <div className='price-slider-amount'>
                                             <input type='text' id='amount' className='amounts py-0' readOnly />
                                          </div>
                                          {/* end price-slider-amount */}
                                       </a>
                                       <div className='dropdown-menu dropdown-menu-wrap py-4'>
                                          <div className='dropdown-item py-0'>
                                             <label className='filter__label mb-2'>Filter Price</label>
                                             <div id='slider-range' />
                                             {/* end slider-range */}
                                          </div>
                                       </div>
                                    </div>
                                    {/* end panel-dropdown */}
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-3 */}
                        </form>
                        <div className='btn-box pt-2'>
                           <a href='activity-search-result.html' className='theme-btn'>
                              Search Now
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
               {/* end col-lg-12 */}
            </div>
            {/* end row */}
         </div>
         {/* end container */}
      </SearchTourPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(SearchTour);
