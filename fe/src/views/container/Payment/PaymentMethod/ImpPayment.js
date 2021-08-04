import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import YourInfo from "./YourInfo";
import PaymentMethod from "./PaymentMethod";
import BookingDetail from "./BookingDetail";
import InfoTour from "../../Tour/InfoTour";

const ImpPaymentStyled = styled.div``;

function ImpPayment(props) {
   const [infoTrue, setInfoTrue] = useState(false);
   const [info, setInfo] = useState();
   return (
      <ImpPaymentStyled>
         <section className='booking-area padding-bottom-70px'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-8'>
                     <YourInfo setInfoTrue={setInfoTrue} setInfo={setInfo} payment={props.payment} />
                     <PaymentMethod info={info} infoTrue={infoTrue} payment={props.payment} />
                  </div>
                  <div className='col-lg-4'>
                     <BookingDetail payment={props.payment} />
                  </div>
               </div>
            </div>
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
