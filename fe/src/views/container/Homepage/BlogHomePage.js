import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { Tooltip, Typography } from "antd";

const CarouselProviderWrapper = styled(CarouselProvider)`
   position: relative;
   .arrow-left {
      position: absolute;
      left: -15px;
      top: 200px;
      outline: none;
      border: none;
      border-radius: 50%;
   }
   .arrow-right {
      position: absolute;
      right: -15px;
      top: 200px;
      outline: none;
      border: none;
      border-radius: 50%;
   }
`;

const BlogHomePage = (props) => {
   const [posts, setPosts] = useState([]);
   return (
      <CarouselProviderWrapper
         naturalSlideWidth={100}
         naturalSlideHeight={160}
         totalSlides={posts.length}
         visibleSlides={3}
         step={3}>
         {/* end col-lg-4 */}
         <Slider>
            {posts.map((item, index) => {
               return (
                  <Slide index={index}>
                     <div className='card-item blog-card'>
                        <div className='card-img'>
                           <img src='images/img6.jpg' alt='blog-img' />
                           <div className='post-format icon-element'>
                              <i className='la la-play' />
                           </div>
                           <div className='card-body'>
                              <div className='post-categories'>
                                 <a href='#' className='badge'>
                                    Video
                                 </a>
                              </div>
                              <h3 className='card-title line-height-26'>
                                 <a href='blog-single.html'>Amazing Places to Stay in Norway</a>
                              </h3>
                              <p className='card-meta'>
                                 <span className='post__date'> 1 February, 2020</span>
                                 <span className='post-dot' />
                                 <span className='post__time'>4 Mins read</span>
                              </p>
                           </div>
                        </div>
                        <div className='card-footer d-flex align-items-center justify-content-between'>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/small-team2.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <a href='#' className='author__title'>
                                    Phillip Hunt
                                 </a>
                              </div>
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
                  </Slide>
               );
            })}
         </Slider>
         {/* end card-item */}
      </CarouselProviderWrapper>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         getPosts: appApisActions.getPosts
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogHomePage);
