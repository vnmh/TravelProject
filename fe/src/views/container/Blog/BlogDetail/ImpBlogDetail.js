import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import DescriptionBlogDetail from "./DescriptionBlogDetail.js";
import SingleContentBlogDetail from "./SingleContentBlogDetail.js";
import DetailedDescription from "./DetailedDescription.js";
import EvaluateBlogDetail from "./EvaluateBlogDetail.js";
import ReviewBlogDetail from "./ReviewBlogDetail.js";
import CommentBlogDetail from "./CommentBlogDetail.js";

const ImpBlogDetailStyled = styled.div``;

function ImpBlogDetail(props) {
   return (
      <ImpBlogDetailStyled>
         <section className='breadcrumb-area bread-bg-2 py-0'>
            <div className='breadcrumb-wrap'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='breadcrumb-btn'>
                           <a
                              className='d-none'
                              data-fancybox='gallery'
                              data-src='images/destination-img2.jpg'
                              data-caption='Showing image - 02'
                              data-speed={700}
                           />
                           <a
                              className='d-none'
                              data-fancybox='gallery'
                              data-src='images/destination-img3.jpg'
                              data-caption='Showing image - 03'
                              data-speed={700}
                           />
                           <a
                              className='d-none'
                              data-fancybox='gallery'
                              data-src='images/destination-img4.jpg'
                              data-caption='Showing image - 04'
                              data-speed={700}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className='tour-detail-area padding-bottom-90px'>
            <div className='single-content-box'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='single-content-wrap padding-top-60px'>
                           <div id='description' className='page-scroll'>
                              <SingleContentBlogDetail blogDetail={props.blogDetail} />
                              <div className='single-content-item'>
                                 <DescriptionBlogDetail blogDetail={props.blogDetail} />
                              </div>
                           </div>
                           <div className='single-content-item'>
                              <DetailedDescription blogDetail={props.blogDetail} />
                           </div>
                           <EvaluateBlogDetail />
                           <div className='review-box'>
                              <div className='single-content-item padding-top-40px'>
                                 <ReviewBlogDetail />
                                 <CommentBlogDetail />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* end row */}
               </div>
               {/* end container */}
            </div>
         </section>
      </ImpBlogDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   }
)(ImpBlogDetail);
