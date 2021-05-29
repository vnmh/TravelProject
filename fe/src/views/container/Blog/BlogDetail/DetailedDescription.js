import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import parseHtml from "html-react-parser";

const DetailedDescriptionStyled = styled.div``;

function DetailedDescription(props) {
   return (
      <DetailedDescriptionStyled>
         <h1 className='title font-size-25 mb-4'>Mô tả chi tiết</h1>
         <div className='ck-content'>{parseHtml(props.blogDetail?.contentPost || "")}</div>
      </DetailedDescriptionStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(DetailedDescription);
