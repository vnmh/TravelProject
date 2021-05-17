import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import InfoTour from "../Tour/InfoTour";
import YourInfo from "./YourInfo";
import PaymentMethod from "./PaymentMethod";
import BookingDetail from "./BookingDetail";

const ImpPaymentStyled = styled.div``;

function ImpPayment(props) {
   return (
      <ImpPaymentStyled>
         <section className='booking-area padding-top-100px padding-bottom-70px'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-8'>
                     <YourInfo payment={props.payment}/>
                     <PaymentMethod payment={props.payment}/>
                  </div>
                  {/* end col-lg-8 */}
                  <div className='col-lg-4'>
                     <BookingDetail payment={props.payment}/>
                  </div>
                  {/* end col-lg-4 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         <InfoTour />
      </ImpPaymentStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ImpPayment);
