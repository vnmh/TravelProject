import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const BlogHomePageStyled = styled.div``;

const BlogHomePage = (props) => {
   return (
      <BlogHomePageStyled>
         {/* end col-lg-4 */}
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
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BlogHomePage);
