import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SearchTour from "./SearchTour";
import SliderHomePage from "./SliderHomePage";
import CardItemHomePage from "./CardItemHomePage";
import ReviewHomePage from "./ReviewHomePage";
import BlogHomePage from "./BlogHomePage";
import FamousPlaceHomePage from "./FamousPlaceHomePage";
import Footer from "../Footer";
import HOC from "~/HOC";

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
      <HOC>
         <ImpHomePageStyled>
            <section className='hero-wrapper container-search-tour'>
               <SliderHomePage />
               <div className='search-tour' data-aos='fade-down' style={{ marginTop: 270 }}>
                  <div className='container'>
                     <div className='row'>
                        <div className='col-lg-12'>
                           {/* <TitleTourHomePage /> */}
                           <SearchTour />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className='trending-area position-relative section-bg padding-top-100px pb-0'>
               <div className='container'>
                  <div className='row' data-aos='fade-up'>
                     <div className='col-lg-12'>
                        <div className='section-heading'>
                           <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                              Tour nổi bật
                           </h2>
                        </div>
                     </div>
                  </div>
                  <div className='row padding-top-50px' data-aos='fade-left'>
                     <div className='col-lg-12'>
                        <div className='trending-carousel carousel-action'>
                           <CardItemHomePage />
                        </div>
                     </div>
                  </div>
               </div>
               <svg
                  className='hero-svg'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 100 10'
                  preserveAspectRatio='none'>
                  <path d='M0 10 0 0 A 90 59, 0, 0, 0, 100 0 L 100 10 Z' />
               </svg>
            </section>
            <section className='testimonial-area py-5'>
               <div className='container'>
                  <div className='row' data-aos='fade-right'>
                     <div className='col-lg-12'>
                        <div className='section-heading mb-0'>
                           <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                              Đánh giá Tour
                           </h2>
                        </div>
                     </div>
                  </div>
                  <div className='row padding-top-50px' data-aos='zoom-in'>
                     <ReviewHomePage />
                  </div>
               </div>
            </section>
            <div>
               <div className='section-block' />
               <section className='top-activity-area padding-top-50px padding-bottom-90px' id='location'>
                  <div className='container'>
                     <div className='row' data-aos='fade-up'>
                        <div className='col-lg-12'>
                           <div className='section-heading'>
                              <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                                 Địa danh nổi tiếng
                              </h2>
                           </div>
                        </div>
                     </div>
                     <FamousPlaceHomePage />
                  </div>
               </section>
            </div>
            <section className='cta-area cta-bg bg-fixed section-padding'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12' data-aos='fade-up'>
                        <div className='section-heading'>
                           <h2 className='sec__title text-white font-size-50 line-height-60'>
                              Tận hưởng kỳ nghỉ <br /> của bạn với giảm giá 50%
                           </h2>
                           <p className='sec__desc text-white pt-3'>
                              Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                           </p>
                        </div>
                        <div className='btn-box padding-top-35px' data-aos='fade-up'>
                           <a href='#' className='theme-btn border-0'>
                              Explore Now <i className='la la-arrow-right ml-1' />
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className='blog-area section--padding'>
               <div class='container'>
                  <div className='row' data-aos='fade-up'>
                     <div className='col-lg-12'>
                        <div className='section-heading'>
                           <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                              Cẩm nang du lịch
                           </h2>
                        </div>
                     </div>
                  </div>
                  <BlogHomePage />
               </div>
            </section>
            <Footer />
         </ImpHomePageStyled>
      </HOC>
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
