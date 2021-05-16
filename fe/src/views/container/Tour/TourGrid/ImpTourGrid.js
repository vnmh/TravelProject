import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import FilterTopTour from "../FilterTopTour";
import FilterOptionTour from "../FilterOptionTour";
import CardItemGridTour from "./CardItemGridTour";
import InfoTour from "../InfoTour";

const ImpTourGridStyled = styled.div``;

function ImpTourGrid(props) {
   return (
      <ImpTourGridStyled>
         {/* ================================
            START CARD AREA
         ================================= */}
         <section className='card-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='filter-wrap margin-bottom-30px'>
                        <FilterTopTour />
                        <FilterOptionTour />
                     </div>
                  </div>
               </div>
               {/* end row */}
               <CardItemGridTour />
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='btn-box mt-3 text-center'>
                        <button type='button' className='theme-btn'>
                           <i className='la la-refresh mr-1' />
                           Load More
                        </button>
                        <p className='font-size-13 pt-2'>Showing 1 - 6 of 2292 Tours</p>
                     </div>
                     {/* end btn-box */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end card-area */}
         {/* ================================
            END CARD AREA
         ================================= */}
         <InfoTour />
      </ImpTourGridStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ImpTourGrid);
