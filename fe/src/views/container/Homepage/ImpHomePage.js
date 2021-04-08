import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { DatePicker } from "antd";
import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const ImpHomePageStyled = styled.div`
   height: 100vh;
`;

const { RangePicker } = DatePicker;

const ImpHomePage = (props) => {
   return (
      <ImpHomePageStyled>
         {/* ================================
            START HERO-WRAPPER AREA
         ================================= */}
         <section className='hero-wrapper hero-wrapper7'>
            <div className='hero-box'>
               <div id='fullscreen-slide-contain'>
                  <ul className='slides-container'>
                     <li>
                        <img src='images/hero-bg2.jpg' alt='' />
                     </li>
                     <li>
                        <img src='images/hero--bg2.jpg' alt='' />
                     </li>
                     <li>
                        <img src='images/hero--bg3.jpg' alt='' />
                     </li>
                  </ul>
               </div>
               {/* End background slider */}
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='hero-content pb-5 text-center'>
                           <div className='section-heading'>
                              <h2 className='sec__title font-size-70 pb-3'>Are You Ready...</h2>
                              <p className='sec__desc font-size-30 font-weight-medium'>To explore new things?</p>
                           </div>
                        </div>
                        {/* end hero-content */}
                        <div className='search-fields-container'>
                           <div className='contact-form-action'>
                              <form action='#' className='row'>
                                 <div className='col-lg-3 pr-0'>
                                    <div className='input-box'>
                                       <label className='label-text'>Destination</label>
                                       <div className='form-group'>
                                          <span className='la la-map-marker form-icon' />
                                          <input
                                             className='form-control'
                                             type='text'
                                             placeholder='Where are you going?'
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 {/* end col-lg-3 */}
                                 <div className='col-lg-3 pr-0'>
                                    <div className='input-box'>
                                       <label className='label-text'>When</label>
                                       <div className='form-group'>
                                          <span className='la la-calendar form-icon' />
                                          <input
                                             className='date-range form-control'
                                             type='text'
                                             name='daterange'
                                             readOnly
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 {/* end col-lg-3 */}
                                 <div className='col-lg-3 pr-0'>
                                    <div className='input-box'>
                                       <label className='label-text'>Guests</label>
                                       <div className='form-group'>
                                          <div className='dropdown dropdown-contain gty-container'>
                                             <a
                                                className='dropdown-toggle dropdown-btn'
                                                href='#'
                                                role='button'
                                                data-toggle='dropdown'
                                                aria-expanded='false'>
                                                <span className='adult' data-text='Adult' data-text-multi='Adults'>
                                                   0 Adult
                                                </span>
                                                -
                                                <span className='children' data-text='Child' data-text-multi='Children'>
                                                   0 Children
                                                </span>
                                             </a>
                                             <div className='dropdown-menu dropdown-menu-wrap'>
                                                <div className='dropdown-item'>
                                                   <div className='qty-box d-flex align-items-center justify-content-between'>
                                                      <label>Adults</label>
                                                      <div className='qtyBtn d-flex align-items-center'>
                                                         <div className='qtyDec'>
                                                            <i className='la la-minus' />
                                                         </div>
                                                         <input type='text' name='adult_number' defaultValue={0} />
                                                         <div className='qtyInc'>
                                                            <i className='la la-plus' />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className='dropdown-item'>
                                                   <div className='qty-box d-flex align-items-center justify-content-between'>
                                                      <label>Children</label>
                                                      <div className='qtyBtn d-flex align-items-center'>
                                                         <div className='qtyDec'>
                                                            <i className='la la-minus' />
                                                         </div>
                                                         <input type='text' name='child_number' defaultValue={0} />
                                                         <div className='qtyInc'>
                                                            <i className='la la-plus' />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          {/* end dropdown */}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end col-lg-3 */}
                                 <div className='col-lg-3'>
                                    <div className='input-box'>
                                       <label className='label-text'>Price</label>
                                       <div className='form-group'>
                                          <div className='dropdown dropdown-contain'>
                                             <a
                                                className='dropdown-toggle dropdown-btn'
                                                href='#'
                                                role='button'
                                                data-toggle='dropdown'
                                                aria-expanded='false'>
                                                <div className='price-slider-amount'>
                                                   <input type='text' id='amount' className='amounts py-0' readOnly />
                                                </div>
                                                {/* end price-slider-amount */}
                                             </a>
                                             <div className='dropdown-menu dropdown-menu-wrap py-4'>
                                                <div className='dropdown-item py-0'>
                                                   <label className='filter__label mb-2'>Filter Price</label>
                                                   <div id='slider-range' />
                                                   {/* end slider-range */}
                                                </div>
                                             </div>
                                          </div>
                                          {/* end panel-dropdown */}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end col-lg-3 */}
                              </form>
                              <div className='btn-box pt-2'>
                                 <a href='activity-search-result.html' className='theme-btn'>
                                    Search Now
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
               </div>
               {/* end container */}
            </div>
         </section>
         {/* end hero-wrapper */}
         {/* ================================
            END HERO-WRAPPER AREA
         ================================= */}

         {/* ================================
            START TRENDING AREA
         ================================= */}
         <section className='trending-area position-relative section-bg padding-top-100px padding-bottom-200px '>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Popular tour in the month
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
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img9.jpg' alt='Destination-img' />
                              </Link>
                              <span className='badge'>Bestseller</span>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Empire State Building Admission</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />5 Days
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$124.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img10.jpg' alt='Destination-img' />
                              </Link>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Hut on Blue Water Beach Tour</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />7 Hours
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$100.00</span>
                                    <span className='price__num before-price color-text-3'>$124.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img11.jpg' alt='Destination-img' />
                              </Link>
                              <span className='badge'>Featured</span>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Golden Gate Seaplane Tour</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />6 Days
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$124.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img12.jpg' alt='Destination-img' />
                              </Link>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Two Hours Guided Horseback Tour</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />
                                    10 Days
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$224.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img13.jpg' alt='Destination-img' />
                              </Link>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Scuba Diving in Boyton Beach</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />
                                    2-4 Hours
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$124.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
                        <div className='card-item trending-card mb-0'>
                           <div className='card-img'>
                              <Link to='/tour-detail' className='d-block'>
                                 <img src='images/img14.jpg' alt='Destination-img' />
                              </Link>
                              <span className='badge'>Featured</span>
                           </div>
                           <div className='card-body'>
                              <h3 className='card-title mb-0'>
                                 <Link to='/tour-detail'>Mangrove Tunnel Kayak Eco Tour</Link>
                              </h3>
                              <div className='card-rating'>
                                 <span className='badge text-white'>4.4/5</span>
                                 <span className='rating__text'>30 Reviews</span>
                              </div>
                              <div className='card-price d-flex align-items-center justify-content-between'>
                                 <span>
                                    <i className='la la-clock mr-1' />
                                    10 Days
                                 </span>
                                 <p>
                                    <span className='price__from'>from</span>
                                    <span className='price__num'>$224.00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* end card-item */}
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
         <section className='testimonial-area section-padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading mb-0'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Customers Testimonial
                        </h2>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row  */}
               <div className='row padding-top-50px'>
                  <div className='col-lg-12'>
                     <div className='testimonial-carousel carousel-action'>
                        <div className='testimonial-card'>
                           <div className='testi-desc-box'>
                              <p className='testi__desc'>
                                 Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit
                                 anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident des.
                              </p>
                           </div>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/team8.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <h4 className='author__title'>Leroy Bell</h4>
                                 <span className='author__meta'>United States</span>
                                 <span className='ratings d-flex align-items-center'>
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* end testimonial-card */}
                        <div className='testimonial-card'>
                           <div className='testi-desc-box'>
                              <p className='testi__desc'>
                                 Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit
                                 anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident des.
                              </p>
                           </div>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/team9.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <h4 className='author__title'>Richard Pam</h4>
                                 <span className='author__meta'>Canada</span>
                                 <span className='ratings d-flex align-items-center'>
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* end testimonial-card */}
                        <div className='testimonial-card'>
                           <div className='testi-desc-box'>
                              <p className='testi__desc'>
                                 Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit
                                 anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident des.
                              </p>
                           </div>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/team10.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <h4 className='author__title'>Luke Jacobs</h4>
                                 <span className='author__meta'>Australia</span>
                                 <span className='ratings d-flex align-items-center'>
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* end testimonial-card */}
                        <div className='testimonial-card'>
                           <div className='testi-desc-box'>
                              <p className='testi__desc'>
                                 Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit
                                 anim laborum sint occaecat cupidatat non proident. Occaecat cupidatat non proident des.
                              </p>
                           </div>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/team8.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <h4 className='author__title'>Chulbul Panday</h4>
                                 <span className='author__meta'>Italy</span>
                                 <span className='ratings d-flex align-items-center'>
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                    <i className='la la-star' />
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* end testimonial-card */}
                     </div>
                     {/* end testimonial-carousel */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end testimonial-area */}
         {/* ================================
            START TESTIMONIAL AREA
         ================================= */}

         {/* ================================
            START BLOG AREA
         ================================= */}
         <section className='blog-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-heading'>
                        <h2 className='sec__title curve-shape padding-bottom-30px' data-text='curvs'>
                           Recent Articles
                        </h2>
                     </div>
                     {/* end section-heading */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
               <div className='row padding-top-50px'>
                  <div className='col-lg-4 responsive-column'>
                     <div className='card-item blog-card'>
                        <div className='card-img'>
                           <img src='images/img5.jpg' alt='blog-img' />
                           <div className='post-format icon-element'>
                              <i className='la la-photo' />
                           </div>
                           <div className='card-body'>
                              <div className='post-categories'>
                                 <a href='#' className='badge'>
                                    Travel
                                 </a>
                                 <a href='#' className='badge'>
                                    lifestyle
                                 </a>
                              </div>
                              <h3 className='card-title line-height-26'>
                                 <a href='blog-single.html'>Best Scandinavian Accommodation – Treat Yourself</a>
                              </h3>
                              <p className='card-meta'>
                                 <span className='post__date'> 1 January, 2020</span>
                                 <span className='post-dot' />
                                 <span className='post__time'>5 Mins read</span>
                              </p>
                           </div>
                        </div>
                        <div className='card-footer d-flex align-items-center justify-content-between'>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/small-team1.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <a href='#' className='author__title'>
                                    Leroy Bell
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
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-4 responsive-column'>
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
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-4 responsive-column'>
                     <div className='card-item blog-card'>
                        <div className='card-img'>
                           <img src='images/img7.jpg' alt='blog-img' />
                           <div className='post-format icon-element'>
                              <i className='la la-music' />
                           </div>
                           <div className='card-body'>
                              <div className='post-categories'>
                                 <a href='#' className='badge'>
                                    audio
                                 </a>
                              </div>
                              <h3 className='card-title line-height-26'>
                                 <a href='blog-single.html'>Feel Like Home on Your Business Trip</a>
                              </h3>
                              <p className='card-meta'>
                                 <span className='post__date'> 1 March, 2020</span>
                                 <span className='post-dot' />
                                 <span className='post__time'>3 Mins read</span>
                              </p>
                           </div>
                        </div>
                        <div className='card-footer d-flex align-items-center justify-content-between'>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-img'>
                                 <img src='images/small-team3.jpg' alt='testimonial image' />
                              </div>
                              <div className='author-bio'>
                                 <a href='#' className='author__title'>
                                    Luke Jacobs
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
                  </div>
                  {/* end col-lg-4 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* end blog-area */}
         {/* ================================
            START BLOG AREA
         ================================= */}
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
