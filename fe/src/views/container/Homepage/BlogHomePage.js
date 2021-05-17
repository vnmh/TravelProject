import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { authActions } from "~/state/ducks/authUser";
import { firstImage } from "~/views/utilities/helpers/utilObject";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { Tooltip, Typography, Switch } from "antd";
import * as PATH from "~/configs/routesConfig";
const { Paragraph, Text } = Typography;

const BlogHomePageStyled = styled(CarouselProvider)``;

const BlogHomePage = (props) => {
   const [posts, setPosts] = useState([]);
   const [ellipsis, setEllipsis] = useState(true);
   const colors = ["blue"];

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
      <BlogHomePageStyled
         naturalSlideWidth={100}
         naturalSlideHeight={160}
         totalSlides={posts.length}
         visibleSlides={3.2}
         step={3}>
         {/* end col-lg-4 */}
         <Slider>
            {posts.map((item, index) => {
               return (
                  <Slide index={index}>
                     <div className='row padding-top-50px mx-1'>
                        <div className='col-lg-12 responsive-column'>
                           <div className='card-item blog-card'>
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
                                 <div className='card-body'>
                                    <Tooltip title={item.titlePost}>
                                       <Link to={PATH.BLOG_DETAIL.replace(":id", item?.idPost)}>
                                          <Typography.Paragraph ellipsis={{ rows: 2 }} className='card-title'>
                                             {item.titlePost}
                                          </Typography.Paragraph>
                                       </Link>
                                    </Tooltip>

                                    {/* <span className='post__date'> 1 February, 2020</span>
                                       <span className='post-dot' />
                                       <span className='post__time'>4 Mins read</span> */}
                                    <Text
                                       className='card-meta'
                                       style={
                                          ellipsis
                                             ? {
                                                  width: 200
                                               }
                                             : undefined
                                       }
                                       ellipsis={
                                          ellipsis
                                             ? {
                                                  tooltip: item.describe
                                               }
                                             : false
                                       }>
                                       {item.describe}
                                    </Text>
                                 </div>
                              </div>
                              <div className='card-footer d-flex align-items-center justify-content-between'>
                                 <div className='author-bio'>
                                    <span className='author__meta'>Đánh giá</span>
                                    <span className='ratings d-flex align-items-center'>
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                       <i className='la la-star' />
                                    </span>
                                 </div>
                                 <div className='post-share'>
                                    <ul>
                                       <li>
                                          <i className='la la-share icon-element' />
                                          <ul className='post-share-dropdown d-flex align-items-center'>
                                             <li>
                                                <a href='#'>
                                                   <i className='lab la-facebook-f' />
                                                </a>
                                             </li>
                                             <li>
                                                <a href='#'>
                                                   <i className='lab la-twitter' />
                                                </a>
                                             </li>
                                             <li>
                                                <a href='#'>
                                                   <i className='lab la-instagram' />
                                                </a>
                                             </li>
                                          </ul>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Slide>
               );
            })}
         </Slider>

         {/* end card-item */}
      </BlogHomePageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         getPosts: appApisActions.getPosts,
         getAllImagesPost: appApisActions.getAllImagesPost
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogHomePage);
