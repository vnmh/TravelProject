import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterTopTourStyled = styled.div``;

function FilterTopTour(props) {
   return (
      <FilterTopTourStyled>
         <div className='filter-top d-flex align-items-center justify-content-between pb-4'>
            <div>
               <h3 className='title font-size-24'>{props.tourCount} chuyến tham quan được tìm thấy</h3>
            </div>
            <div className='layout-view d-flex align-items-center'>
               <Link to='/tour-grid' data-toggle='tooltip' data-placement='top' title='Grid View'>
                  <i className='la la-th-large' />
               </Link>
               <Link to='/tour-list' data-toggle='tooltip' data-placement='top' title='List View' className='active'>
                  <i className='la la-th-list' />
               </Link>
            </div>
         </div>
      </FilterTopTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterTopTour);
