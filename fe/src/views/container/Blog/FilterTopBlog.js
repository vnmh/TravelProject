import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const FilterTopBlogStyled = styled.div``;

function FilterTopBlog(props) {
   return (
      <FilterTopBlogStyled>
         <div className='filter-top d-flex align-items-center justify-content-between pb-4'>
            <div>
               <h3 className='title font-size-24'>{props.blogCount} bài viết được tìm thấy</h3>
            </div>
         </div>
      </FilterTopBlogStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   }
)(FilterTopBlog);
