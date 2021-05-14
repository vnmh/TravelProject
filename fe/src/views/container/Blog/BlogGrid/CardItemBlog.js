import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { Card, Tooltip, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import * as PATH from "~/configs/routesConfig";

const CardItemGridBlogStyled = styled.div``;

const gridStyle = {
   width: "30%",
   textAlign: "center"
};

const CardItemGridBlog = (props) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      props
         .getPosts()
         .then(({ res }) => {
            props
               .getAllImagesPost()
               .then((resImg) => {
                  // setImages(res);
                  const postWithImage = res.map((post) => {
                     return {
                        ...post,
                        images: resImg.res.filter((image) => {
                           return post.idPost === image.idPost;
                        })
                     };
                  });
                  setPosts(postWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
               });
         })
         .catch((err) => {
            console.log("🚀 ~ file: BlogHomePage.js ~ line 40 ~ useEffect ~ err", err);
         });
   }, []);
   return (
      <CardItemGridBlogStyled>
         <div className='row'>
            {posts.map((item, index) => {
               return (
                  <div className='col-lg-4 responsive-column'>
                     <div className='card-item'>
                        <div className='card-img'>
                           <Link to={PATH.BLOG_DETAIL.replace(":id", item?.idPost)} className='d-block'>
                              <img
                                 src={
                                    _.get(_.head(item.images), "url")
                                       ? firstImage(_.get(_.head(item.images), "url", ""))
                                       : "images/destination-img7.jpg"
                                 }
                                 alt='Destination-img'
                              />
                           </Link>
                           <div
                              className='add-to-wishlist icon-element'
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Save for Later'>
                              <i className='la la-heart-o' />
                           </div>
                        </div>
                        <div className='card-body'>
                           <h3 className='card-title'>
                              <Tooltip title={item.titlePost}>
                                 <Link to={PATH.BLOG_DETAIL.replace(":id", item?.idPost)}>
                                    <Typography.Paragraph className='text-link' ellipsis={{ rows: 2 }}>
                                       {item.titlePost}
                                    </Typography.Paragraph>
                                 </Link>
                              </Tooltip>
                           </h3>
                           <p className='card-meta'>{item.describe}</p>
                           <div className='card-rating'>
                              <span className='badge text-white'>4.4/5</span>{" "}
                              <span className='rating__text'>30 Reviews</span>
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </CardItemGridBlogStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts,
      getAllImagesPost: appApisActions.getAllImagesPost
   }
)(CardItemGridBlog);
