import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Table, Space, Button, Image, Popconfirm, message } from "antd";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import CRUDBlogAdminContainer from "./CRUDBlogAdminContainer";

const BlogTableListAdminPageStyled = styled.div``;

const BlogTableListAdminPage = (props) => {
   const [deleteBlog, setDeleteBlog] = useState(false);

   const onDeletePost = (blog) => {
      props
         .deletePost(blog.idPost)
         .then((res)=> {
            setDeleteBlog(true);
            message.success("Xóa thành công!");
         })
         .catch((err) => {
            message.error("Xóa thất bại!");
         });
   }
   const columns = [
      {
         title: "Hình ảnh",
         dataIndex: "images",
         key: "images",
         render: (images, record) => {
            return (images || []).length > 0 ? (
               <Image.PreviewGroup>
                  {(images || []).map((image, index) => {
                     return (
                        <Image
                           width={100}
                           style={{ display: index !== 0 ? "none" : "unset" }}
                           src={
                              _.get(image, "url") ? firstImage(_.get(image, "url", "")) : "images/destination-img7.jpg"
                           }
                           alt='Destination-img'
                        />
                     );
                  })}
               </Image.PreviewGroup>
            ) : (
               <Image
                  width={100}
                  src={
                     _.get(_.head(images), "url")
                        ? firstImage(_.get(_.head(images), "url", ""))
                        : "images/destination-img7.jpg"
                  }
                  alt='Destination-img'
               />
            );
         }
      },
      {
         title: "Tiêu đề",
         dataIndex: "titlePost",
         key: "titlePost",
         ellipsis: true
      },
      {
         title: "Mô tả",
         dataIndex: "describe",
         key: "describe",
         ellipsis: true
      },
      {
         title: "Trạng thái",
         dataIndex: "action",
         key: "action",
         fixed: "right",
         width: 100,
         render: (text, record) => (
            <Space size='middle'>
               <Button  
                  className='btn-primary'
                  icon={<i className='fa fa-pencil-square-o' aria-hidden='true'></i>}
                  onClick={() => {
                     props.setCurrentEdit(record);
                  }}></Button>
               <Popconfirm
                  placement='topRight'
                  title={"Bạn có muốn xóa bài viết này?"}
                  onConfirm={() => onDeletePost(record)}
                  okText='Có'
                  cancelText='Không'>
                  <Button
                     className='btn-danger'
                     type='dashed'
                     icon={<i class='fa fa-trash-o' aria-hidden='true'></i>}></Button>
               </Popconfirm>
            </Space>
         ),
         width: 130
      }
   ];
   const handleChangeTable = (pagination, filters, sorter, extra) => {
      props.setPagination({
         ...props.pagination,
         page: pagination?.current,
         size: pagination?.pageSize
      });
   };

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      props
         .getPosts()
         .then(({ res }) => {
            props
               .getAllImagesPost()
               .then((resImg) => {
                  const postWithImage = res.map((post) => {
                     return {
                        ...post,
                        images: resImg.res.filter((image) => {
                           return post.idPost === image.idPost;
                        })
                     };
                  });
                  props.setPagination({
                     page: 1,
                     size: 10,
                     total: postWithImage.length
                  });
                  setPosts(postWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, [props.currentEdit, props.isCreatePost, deleteBlog]);


   return (
      <BlogTableListAdminPageStyled>
         {(props.currentEdit || props.isCreatePost) && (
            <CRUDBlogAdminContainer
               setCurrentEdit={props.setCurrentEdit}
               currentEdit={props.currentEdit}
               setIsCreatePost={props.setIsCreatePost}
            />
         )}
         {!props.currentEdit && !props.isCreatePost && (
            <Table
               onChange={handleChangeTable}
               columns={columns}
               dataSource={posts}
               scroll={{ scrollToFirstRowOnChange: true, x: 1200 }}
            />
         )}
      </BlogTableListAdminPageStyled>
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
         getAllImagesPost: appApisActions.getAllImagesPost,
         deletePost: appApisActions.deletePost
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogTableListAdminPage);
