import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const ImageTourDetailStyled = styled.div``;

function ImageTourDetail(props) {
   return (
      <ImageTourDetailStyled>
         <div id='photo' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20'>Hình ảnh</h3>
               <div className='gallery-carousel carousel-action padding-top-30px'>
                  <div className='card-item mb-0'>
                     <div className='card-img'>
                        <img src='images/destination-img2.jpg' alt='Destination-img' />
                     </div>
                  </div>
                  {/* end card-item */}
                  <div className='card-item mb-0'>
                     <div className='card-img'>
                        <img src='images/destination-img3.jpg' alt='Destination-img' />
                     </div>
                  </div>
                  {/* end card-item */}
                  <div className='card-item mb-0'>
                     <div className='card-img'>
                        <img src='images/destination-img4.jpg' alt='Destination-img' />
                     </div>
                  </div>
                  {/* end card-item */}
               </div>
               {/* end gallery-carousel */}
            </div>
            {/* end single-content-item */}
            <div className='section-block' />
         </div>
      </ImageTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ImageTourDetail);
