import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Table, Tag, Space, Button, Image } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import BlogTableListAdminPage from "./BlogTableListAdminPage";

const BlogListAdminPageStyled = styled.div``;

const BlogListAdminPage = (props) => {
   const [isCreatePost, setIsCreatePost] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });
   const [currentEdit, setCurrentEdit] = useState();
   return (
      <BlogListAdminPageStyled>
         <div>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='form-box'>
                     <div className='form-title-wrap'>
                        <h3 className='title'>Danh sách bài viết</h3>
                        {!isCreatePost && !currentEdit && (
                        <Button
                           type='primary'
                           className='float-right'
                           onClick={() => {
                              setIsCreatePost(true);
                              isCreatePost && setIsSubmit(true); // chỉ submit khi isCreateTour
                           }}>
                           Thêm
                        </Button>
                          )}
                        <p className='font-size-14'>
                           Showing {pagination.page} to {Math.ceil(pagination.total / pagination.size)} of{" "}
                           {pagination.total} entries
                        </p>
                     </div>
                     <div className='form-content'>
                        <div className='table-form table-responsive'>
                           <BlogTableListAdminPage
                              isCreatePost={isCreatePost}
                              setIsCreatePost={setIsCreatePost}
                              currentEdit={currentEdit}
                              setCurrentEdit={setCurrentEdit}
                              pagination={pagination}
                              setPagination={setPagination}
                           />
                        </div>
                     </div>
                  </div>
                  {/* end form-box */}
               </div>
               {/* end col-lg-12 */}
            </div>
            {/* end row */}
         </div>
      </BlogListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => BlogTableListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getPosts: appApisActions.getPosts,
         getAllImagesPost: appApisActions.getAllImagesPost
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogListAdminPage);
