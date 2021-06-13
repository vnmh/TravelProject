import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "antd";
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
                     {!isCreatePost && !currentEdit && (
                        <div className='form-title-wrap'>
                           <h3 className='title'>Danh sách bài viết</h3>
                           <Button
                              type='primary'
                              className='float-right'
                              onClick={() => {
                                 setIsCreatePost(true);
                                 isCreatePost && setIsSubmit(true); // chỉ submit khi isCreateTour
                              }}>
                              Thêm
                           </Button>
                           <p className='font-size-14'>
                              Hiển thị {pagination.page} trong tổng số {Math.ceil(pagination.total / pagination.size)}{" "}
                              trang của {pagination.total} phần tử
                           </p>
                        </div>
                     )}
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
