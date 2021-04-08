import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const SearchListTourStyled = styled.div``;

function SearchListTour(props) {
   return (
      <SearchListTourStyled>
         <div className='sidebar-widget'>
            <h3 className='title stroke-shape'>Where would like to go?</h3>
            <div className='sidebar-widget-item'>
               <div className='contact-form-action'>
                  <form action='#'>
                     <div className='input-box'>
                        <label className='label-text'>Destination</label>
                        <div className='form-group'>
                           <span className='la la-map-marker form-icon' />
                           <input className='form-control' type='text' placeholder='Destination, city, or region' />
                        </div>
                     </div>
                     <div className='input-box'>
                        <label className='label-text'>From</label>
                        <div className='form-group'>
                           <span className='la la-calendar form-icon' />
                           <input className='date-range form-control' type='text' name='daterange-single' readOnly />
                        </div>
                     </div>
                     <div className='input-box'>
                        <label className='label-text'>To</label>
                        <div className='form-group'>
                           <span className='la la-calendar form-icon' />
                           <input className='date-range form-control' type='text' name='daterange-single' readOnly />
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
      </SearchListTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(SearchListTour);
