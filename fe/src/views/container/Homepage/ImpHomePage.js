import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { DatePicker } from "antd";
import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SearchTour from "./SearchTour";
import SliderHomePage from "./SliderHomePage";
import CardItemHomePage from "./CardItemHomePage";
import ReviewHomePage from "./ReviewHomePage";
import BlogHomePage from "./BlogHomePage";
import FamousPlaceHomePage from "./FamousPlaceHomePage";
import Footer from "../Footer";
import TitleTourHomePage from "./TitleTourHomePage";

const ImpHomePageStyled = styled.div`
   height: 100vh;
   .container-search-tour {
      position: relative;
   }
   .search-tour {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
   }
`;

const ImpHomePage = (props) => {
   return (
      <ImpHomePageStyled>
         {/* ================================
            START HERO-WRAPPER AREA
         ================================= */}
         <section className='hero-wrapper container-search-tour'>
            <SliderHomePage />
            <div className='search-tour'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <TitleTourHomePage />
                        <SearchTour />
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* end hero-wrapper */}
         {/* ================================
            END HERO-WRAPPER AREA
         ================================= */}

         {/* ================================
            START TRENDING AREA
         ================================= */}
         <section className='trending-area position-relative section-bg padding-top-100px pb-0'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Tour nổi bật
                        </h2>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
               <div className='row padding-top-50px'>
                  <div className='col-lg-12'>
                     <div className='trending-carousel carousel-action'>
                        <CardItemHomePage />
                     </div>
                     {/* end car-carousel */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
            <svg
               className='hero-svg'
               xmlns='http://www.w3.org/2000/svg'
               viewBox='0 0 100 10'
               preserveAspectRatio='none'>
               <path d='M0 10 0 0 A 90 59, 0, 0, 0, 100 0 L 100 10 Z' />
            </svg>
         </section>
         {/* end trending-area */}
         {/* ================================
            END TRENDING AREA
         ================================= */}

         {/* ================================
            START TESTIMONIAL AREA
         ================================= */}
         <section className='testimonial-area section-padding pt-5'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading mb-0'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Đánh giá Tour
                        </h2>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row  */}
               <div className='row padding-top-50px'>
                  <ReviewHomePage />
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end testimonial-area */}
         {/* ================================
            START TESTIMONIAL AREA
         ================================= */}
         <div>
            <div className='section-block' />
            {/* ================================
 START TOP ACTIVITY AREA
================================= */}
            <section className='top-activity-area section--padding'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='section-heading'>
                           <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                              Địa danh nổi tiếng
                           </h2>
                        </div>
                        {/* end section-heading */}
                     </div>
                     {/* end col-lg-12 */}
                  </div>
                  {/* end row */}

                  <FamousPlaceHomePage />
               </div>

               {/* end row */}
               {/* end container */}
            </section>
            {/* end top-activity-area */}
            {/* ================================
 START TOP ACTIVITY AREA
================================= */}
         </div>

         {/* ================================
    START CTA AREA
================================= */}
         <section className='cta-area cta-bg bg-fixed section-padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading'>
                        <h2 className='sec__title text-white font-size-50 line-height-60'>
                           Tận hưởng kỳ nghỉ <br /> của bạn với giảm giá 50%
                        </h2>
                        <p className='sec__desc text-white pt-3'>
                           Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                        </p>
                     </div>
                     {/* end section-heading */}
                     <div className='btn-box padding-top-35px'>
                        <a href='#' className='theme-btn border-0'>
                           Explore Now <i className='la la-arrow-right ml-1' />
                        </a>
                     </div>
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end cta-area */}
         {/* ================================
    END CTA AREA
================================= */}

         {/* ================================
            START BLOG AREA
         ================================= */}
         <section className='blog-area section--padding'>
            <div class='container'>
               {/* end row */}
               {/* end col-lg-4 */}
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Cẩm nang du lịch
                        </h2>
                     </div>
                  </div>
               </div>

               <BlogHomePage />
               {/* end col-lg-4 */}
               {/* end row */}
            </div>
         </section>
         {/* end container */}
         {/* end blog-area */}
         <Footer />
      </ImpHomePageStyled>
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
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(ImpHomePage);
