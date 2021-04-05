import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import _ from "lodash";
import "pure-react-carousel/dist/react-carousel.es.css";

export default class Sliders extends React.Component {
   render() {
      return (
         <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            step={3}
            // visibleSlides={3}
            >
            <Slider>
               <Slide index={0}>
                  <div className='card-item trending-card mb-0'>
                     <div className='card-img'>
                        <a href='tour-details.html' className='d-block'>
                           <img src='images/img9.jpg' alt='Destination-img' />
                        </a>
                        <span className='badge'>Bestseller</span>
                     </div>
                     <div className='card-body'>
                        <h3 className='card-title mb-0'>
                           <a href='tour-details.html'>Empire State Building Admission</a>
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
               </Slide>
               <Slide index={1}>
                  <div className='card-item trending-card mb-0'>
                     <div className='card-img'>
                        <a href='tour-details.html' className='d-block'>
                           <img src='images/img9.jpg' alt='Destination-img' />
                        </a>
                        <span className='badge'>Bestseller</span>
                     </div>
                     <div className='card-body'>
                        <h3 className='card-title mb-0'>
                           <a href='tour-details.html'>Empire State Building Admission</a>
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
               </Slide>
               <Slide index={2}>
                  <div className='card-item trending-card mb-0'>
                     <div className='card-img'>
                        <a href='tour-details.html' className='d-block'>
                           <img src='images/img9.jpg' alt='Destination-img' />
                        </a>
                        <span className='badge'>Bestseller</span>
                     </div>
                     <div className='card-body'>
                        <h3 className='card-title mb-0'>
                           <a href='tour-details.html'>Empire State Building Admission</a>
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
               </Slide>
               <Slide index={3}>
                  <div className='card-item trending-card mb-0'>
                     <div className='card-img'>
                        <a href='tour-details.html' className='d-block'>
                           <img src='images/img9.jpg' alt='Destination-img' />
                        </a>
                        <span className='badge'>Bestseller</span>
                     </div>
                     <div className='card-body'>
                        <h3 className='card-title mb-0'>
                           <a href='tour-details.html'>Empire State Building Admission</a>
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
               </Slide>
               <Slide index={4}>
                  <div className='card-item trending-card mb-0'>
                     <div className='card-img'>
                        <a href='tour-details.html' className='d-block'>
                           <img src='images/img9.jpg' alt='Destination-img' />
                        </a>
                        <span className='badge'>Bestseller</span>
                     </div>
                     <div className='card-body'>
                        <h3 className='card-title mb-0'>
                           <a href='tour-details.html'>Empire State Building Admission</a>
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
               </Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
         </CarouselProvider>
      );
   }
}
