import React from "react";
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
         <div className='filter-top d-flex align-items-center justify-content-between pb-3'>
            <div>
               <h3 className='title font-size-24'>Hiện có: {props.tourCount} Tours</h3>
               <p className='font-size-14 line-height-20 pt-1'>Tour chọn lọc chất lượng nhất!</p>
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
