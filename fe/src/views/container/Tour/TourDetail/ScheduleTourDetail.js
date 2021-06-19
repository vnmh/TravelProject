import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import parseHtml from "html-react-parser";

const ScheduleTourDetailStyled = styled.div``;

function ScheduleTourDetail(props) {
   return (
      <ScheduleTourDetailStyled data-aos='fade-up'>
         <div id='photo' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20 mb-4'>Mô tả chi tiết</h3>
               <div className='ck-content'>{parseHtml(props.tourDetail?.scheduleTour?.data || "")}</div>
            </div>
            <div className='section-block' />
         </div>
      </ScheduleTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ScheduleTourDetail);
