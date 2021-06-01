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
   }, []);
   console.log(`ithoangtan -  ~ file: ImpTourDetail.js ~ line 246 ~ {tours.map ~ tour?.images`, tours);

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
                  Hình ảnh
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
                                    Mô tả ngắn
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='itinerary' href='#itinerary' className='scroll-link'>
                                    Hành trình
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='photo' href='#photo' className='scroll-link'>
                                    Chi tiết
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='location-map' href='#location-map' className='scroll-link'>
                                    Bản đồ
                                 </a>
                              </li>
                              <li>
                                 <a data-scroll='reviews' href='#reviews' className='scroll-link'>
                                    Đánh giá
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

                           <ItineraryTourDetail tourDetail={props.tourDetail} />
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
                              <h3 className='title stroke-shape'>Tại sao đặt tour với chúng tôi?</h3>
                              <div className='sidebar-list'>
                                 <ul className='list-items' data-aos='fade-right'>
                                    <li>
                                       <i className='la la-dollar icon-element mr-2' />
                                       Đảm bảo giá tốt nhất không rắc rối
                                    </li>
                                    <li>
                                       <i className='la la-microphone icon-element mr-2' />
                                       Chăm sóc khách hàng có sẵn 24/7
                                    </li>
                                    <li>
                                       <i className='la la-thumbs-up icon-element mr-2' />
                                       Các chuyến tham quan &amp; Hoạt động được chọn lọc thủ công
                                    </li>
                                    <li>
                                       <i className='la la-file-text icon-element mr-2' />
                                       Bảo hiểm du lịch miễn phí
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div className='sidebar-widget single-content-widget'>
                              <h3 className='title stroke-shape'>Nhận một câu hỏi?</h3>
                              <p className='font-size-14 line-height-24'>
                                 Đừng ngần ngại cho chúng tôi một cuộc gọi. Chúng tôi là một đội ngũ chuyên gia và chúng
                                 tôi rất vui được nói chuyện với bạn.
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
                        <h2 className='sec__title'>Có thể bạn cũng thích</h2>
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
                                       Xem chi tiết
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
