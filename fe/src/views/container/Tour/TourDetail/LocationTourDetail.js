import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const LocationTourDetailStyled = styled.div``;

function LocationTourDetail(props) {
   return (
      <LocationTourDetailStyled>
         <div id='location-map' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20'>Bản đồ</h3>
               <div className='gmaps padding-top-30px'>
                  <iframe
                     src='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3220582.101712651!2d111.72032468736893!3d37.974802328116944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e4!4m5!1s0x3676dd556edbe6e9%3A0x12fdd98581592320!2sLinfen%2C%20Shanxi%2C%20China!3m2!1d36.088004999999995!2d111.518975!4m5!1s0x35f05296e7142cb9%3A0xb9625620af0fa98a!2sBeijing%2C%20China!3m2!1d39.904199899999995!2d116.40739629999999!5e0!3m2!1sen!2sin!4v1589443024919!5m2!1sen!2sin'
                     allowFullScreen
                     aria-hidden='false'
                     tabIndex={0}
                  />
               </div>
            </div>
            {/* end single-content-item */}
            <div className='section-block' />
         </div>
      </LocationTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(LocationTourDetail);
