import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const SingleContentBlogDetailStyled = styled.div``;

function SingleContentBlogDetail(props) {
   return (
      <SingleContentBlogDetailStyled>
         <div className='single-content-item'>
            <h3 className='title font-size-35'>{props.blogDetail?.titlePost}</h3>
            <div className='d-flex flex-wrap align-items-center pt-2'>
               <p>
                  <span className='badge badge-warning text-white font-size-16'>4.6</span>
                  <span>(4,209 Reviews)</span>
               </p>
            </div>
         </div>
      </SingleContentBlogDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   } 
)(SingleContentBlogDetail);
