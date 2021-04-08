import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const CardItemListTourStyled = styled.div``;

function CardItemListTour(props) {
   return (
      <CardItemListTourStyled>
         <div className='card-item card-item-list '>
            <div className='card-img'>
               <Link to='/tour-detail' className='d-block'>
                  <img src='images/img9.jpg' alt='Destination-img' />
               </Link>
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
                  <Link to='/tour-detail'>Empire State Building Admission</Link>
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
      </CardItemListTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(CardItemListTour);
