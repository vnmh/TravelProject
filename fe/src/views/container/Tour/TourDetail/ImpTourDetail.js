import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { Button, Image, Typography } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import SingleContentTourDetail from "./SingleContentTourDetail.js";
import DescriptionTourDetail from "./DescriptionTourDetail.js";
import ItineraryTourDetail from "./ItineraryTourDetail.js";
import ScheduleTourDetail from "./ScheduleTourDetail.js";
import LocationTourDetail from "./LocationTourDetail.js";
import EvaluateTourDetail from "./EvaluateTourDetail.js";
import ReviewTourDetail from "./ReviewTourDetail.js";
import CommentTourDetail from "./CommentTourDetail.js";
import BookingFormTourDetail from "./BookingFormTourDetail.js";
import { firstImage } from "~/views/utilities/helpers/utilObject.js";
import VideoComponent from "./VideoComponent.js";
import ImageComponent from "./ImageComponent.js";
import * as PATH from "~/configs/routesConfig";
import qs from "query-string";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { Link, useParams } from "react-router-dom";
const ImpTourDetailStyled = styled.div`
   .style-image {
      max-height: 300px;
      width: 100%;
      object-fit: cover;
   }
   .ant-image {
      width: 100%;
   }
`;

function ImpTourDetail(props) {
   const [tours, setTours] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isModalVisibleImage, setIsModalVisibleImage] = useState(false);
   const params = useParams();
   console.log("hiendev ~ file: ImpTourDetail.js ~ line 41 ~ ImpTourDetail ~ params", params);

   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            props
               .getAllImagesTour()
               .then((resImg) => {
                  const tourWithImage = res.map((tour) => {
                     return {
                        ...tour,
                        images: resImg.res
                           .filter((image) => {
                              return tour.idTour === image.idTour;
                           })
                           .map((im) => im.url)
                           .join("|")
                     };
                  });
                  tourWithImage.length = 6;
                  setTours(
                     tourWithImage.filter((o) => {
                        return o.idTour + "" !== params.id + "";
                     })
                  );
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, [params?.id]);

   return (
      <ImpTourDetailStyled>
         <section className='py-0 position-relative'>
            <Image
               className='style-image '
               src={firstImage(_.head(props.tourDetail?.images)?.url || "")}
               width='100%'
               height='100%'
            />
            <div className='position-absolute ' style={{ bottom: 32, left: 32 }}>
               <Button className='btn-image mx-2' onClick={() => setIsModalVisibleImage(true)}>
                  H??nh ???nh
               </Button>
               <Button className='btn-video mx-2' onClick={() => setIsModalVisible(true)}>
                  Video
               </Button>
               <VideoComponent
                  isModalVisible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  urlVideo={props.tourDetail?.video}
               />
               <ImageComponent
                  isModalVisibleImage={isModalVisibleImage}
                  onCancel={() => setIsModalVisibleImage(false)}
                  urlImage={props.tourDetail?.images}
               />
            </div>
            <div>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'></div>
                  </div>
               </div>
            </div>
         </section>

         <section className='tour-detail-area padding-bottom-90px'>
            <div className='single-content-navbar-wrap menu section-bg' id='single-content-navbar'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='single-content-nav' id='single-content-nav'>
                           <ul>
                              <li>
                                 <a data-scroll='description' href='#description' className='scroll-link active'>
                                    M?? t??? ng???n
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='itinerary' href='#itinerary' className='scroll-link'>
                                    H??nh tr??nh
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='photo' href='#photo' className='scroll-link'>
                                    Chi ti???t
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='location-map' href='#location-map' className='scroll-link'>
                                    B???n ?????
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='reviews' href='#reviews' className='scroll-link'>
                                    ????nh gi??
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='single-content-box'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-8'>
                        <div className='single-content-wrap padding-top-60px'>
                           <div data-aos='fade-up' id='description' className='page-scroll'>
                              <SingleContentTourDetail tourDetail={props.tourDetail} />
                              <div className='section-block' />
                              <div className='single-content-item padding-top-40px padding-bottom-40px'>
                                 <DescriptionTourDetail tourDetail={props.tourDetail} />
                              </div>
                           </div>
                           <div data-aos='fade-up' id='itinerary' className='page-scroll'>
                              <ItineraryTourDetail tourDetail={props.tourDetail} />
                           </div>
                           <ScheduleTourDetail tourDetail={props.tourDetail} />
                           <LocationTourDetail />
                           <EvaluateTourDetail />
                           <div className='review-box' data-aos='fade-up'>
                              <div className='single-content-item padding-top-40px' data-aos='fade-right'>
                                 <ReviewTourDetail />
                                 <CommentTourDetail />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='col-lg-4'>
                        <div className='sidebar single-content-sidebar mb-0'>
                           <BookingFormTourDetail tourDetail={props.tourDetail} />
                           <br></br>
                           {/* <EnquiryFormTourDetail /> */}
                           <br></br>
                           <div className='sidebar-widget single-content-widget' data-aos='fade-up'>
                              <h3 className='title stroke-shape'>T???i sao ?????t tour v???i ch??ng t??i?</h3>
                              <div className='sidebar-list'>
                                 <ul className='list-items' data-aos='fade-right'>
                                    <li>
                                       <i className='la la-dollar icon-element mr-2' />
                                       ?????m b???o gi?? t???t nh???t kh??ng r???c r???i
                                    </li>
                                    <li>
                                       <i className='la la-microphone icon-element mr-2' />
                                       Ch??m s??c kh??ch h??ng c?? s???n 24/7
                                    </li>
                                    <li>
                                       <i className='la la-thumbs-up icon-element mr-2' />
                                       C??c chuy???n tham quan &amp; Ho???t ?????ng ???????c ch???n l???c th??? c??ng
                                    </li>
                                    <li>
                                       <i className='la la-file-text icon-element mr-2' />
                                       B???o hi???m du l???ch mi???n ph??
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div className='sidebar-widget single-content-widget'>
                              <h3 className='title stroke-shape'>Nh???n m???t c??u h???i?</h3>
                              <p className='font-size-14 line-height-24'>
                                 ?????ng ng???n ng???i cho ch??ng t??i m???t cu???c g???i. Ch??ng t??i l?? m???t ?????i ng?? chuy??n gia v?? ch??ng
                                 t??i r???t vui ???????c n??i chuy???n v???i b???n.
                              </p>
                              <div className='sidebar-list pt-3'>
                                 <ul className='list-items'>
                                    <li>
                                       <i className='la la-phone icon-element mr-2' />
                                       <a href='#'>+ 61 23 8093 3400</a>
                                    </li>
                                    <li>
                                       <i className='la la-envelope icon-element mr-2' />
                                       <a href='mailto:info@trizen.com'>travelproject@gmail.com</a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className='related-tour-area section--padding'>
            <div className='container'>
               <div className='row' data-aos='fade-right'>
                  <div className='col-lg-12'>
                     <div className='section-heading text-center'>
                        <h2 className='sec__title'>C?? th??? b???n c??ng th??ch</h2>
                     </div>
                  </div>
               </div>
               <div className='row padding-top-50px' data-aos='fade-up'>
                  {tours.map((tour) => {
                     return (
                        <div key={tour.idTour} className='col-lg-4 responsive-column'>
                           <div className='card-item trending-card'>
                              <div className='card-img' data-aos='fade-right'>
                                 <Link to={PATH.TOUR_DETAIL.replace(":id", tour.idTour)} className='d-block'>
                                    <img src={firstImage(tour?.images)} alt='Destination-img' />
                                 </Link>
                              </div>
                              <div className='card-body'>
                                 <h3 className='card-title' data-aos='fade-right'>
                                    <Typography.Title level={5} ellipsis={{ rows: 3 }}>
                                       <Link to={PATH.TOUR_DETAIL.replace(":id", tour.idTour)}>{tour.titleTour}</Link>
                                    </Typography.Title>
                                 </h3>
                                 <p className='card-meta'>{tour.address}</p>
                                 <div className='card-rating' data-aos='fade-right'>
                                    <span className='badge text-white'>4.4/5</span>
                                    <span className='review__text'>{tour.type}</span>
                                    <span className='rating__text'>(30 Reviews)</span>
                                 </div>
                                 <div className='card-price d-flex align-items-center justify-content-between'>
                                    <p>
                                       <span className='price__num'>{currencyFormat(tour.price)}</span>
                                    </p>
                                    <Link to={PATH.TOUR_DETAIL.replace(":id", tour.idTour)} className='btn-text'>
                                       Xem chi ti???t
                                       <i className='la la-angle-right' />
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>
      </ImpTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours,
      getAllImagesTour: appApisActions.getAllImagesTour,
      postTour: appApisActions.postTour,
      putTour: appApisActions.putTour
   }
)(ImpTourDetail);
