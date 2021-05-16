import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const PaymentDetailStyled = styled.div``;

function PaymentDetail(props) {
   return (
      <PaymentDetailStyled>
         <div className='card-item card-item-list payment-received-card'>
            <div className='card-img'>
               <img src='images/img1.jpg' alt='hotel-img' />
            </div>
            <div className='card-body'>
               <h3 className='card-title'>1 Room x 2 Nights</h3>
               <div className='card-price pb-3'>
                  <span className='price__from'>From</span>
                  <span className='price__num'>$88.00</span>
                  <span className='price__text'>Per night</span>
               </div>
               <div className='section-block' />
               <p className='card-text pt-3'>Hotel tax 7% not included, Service charge 10% not included</p>
            </div>
         </div>
      </PaymentDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(PaymentDetail);
