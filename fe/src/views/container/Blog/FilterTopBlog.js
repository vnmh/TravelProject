import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Button } from "antd";

const FilterTopBlogStyled = styled.div``;

function FilterTopBlog(props) {
   return (
      <FilterTopBlogStyled>
         <div className='filter-top d-flex align-items-center justify-content-between pb-4'>
            {!props.isCreatePost && (
               <div className="inline">
                  <h3 className='title font-size-24'>{props.blogCount} bài viết được tìm thấy</h3>
                  <Button
                     type='primary'
                     className='float-right'
                     size='large'
                     onClick={() => {
                        props.setIsCreatePost(true);
                        props.isCreatePost && props.setIsSubmit(true); // chỉ submit khi isCreateTour
                     }}>
                     Tạo bài viết
                  </Button>
               </div>
            )}
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
