import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";

const InfoTourStyled = styled.div``;

function InfoTour(props) {
   return (
      <InfoTourStyled>
         <section className='info-area info-bg padding-top-90px padding-bottom-70px'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb text-color-2'>
                           <i className='la la-phone' />
                        </div>
                        <div className='info-content'>
                           <h4 className='info__title'>Need Help? Contact us</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                     </a>
                  </div>
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb-2 text-color-3'>
                           <i className='la la-money' />
                        </div>
                        <div className='info-content'>
                           <h4 className='info__title'>Payments</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                     </a>
                  </div>
                  <div className='col-lg-4 responsive-column'>
                     <a href='#' className='icon-box icon-layout-2 d-flex'>
                        <div className='info-icon flex-shrink-0 bg-rgb-3 text-color-4'>
                           <i className='la la-times' />
                        </div>
                        <div className='info-content'>
                           <h4 className='info__title'>Cancel Policy</h4>
                           <p className='info__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
                        </div>
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </InfoTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(InfoTour);
