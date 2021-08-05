import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import StatusPayment from "./StatusPayment";
import PaymentDetail from "./PaymentDetail";
import InfoBooking from "./InfoBooking";
import Header from "../../Header";
import { Button, message } from "antd";
import { appApisActions } from "~/state/ducks/appApis";
import queryString from "query-string";
import { ORDER_STATUS } from "~/configs/status";
import ScrollToTop from "~/ScrollToTop";
import { Link, useHistory } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";
import ModalDestroyTour from "./ModalDestroyTour";
import { APP_DEFAULT_PATH, USER_BOOKING, TOUR_DETAIL } from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";

const OrderDetailStyled = styled.div``;

function OrderDetail(props) {
   const [orderDetail, setOrderDetail] = useState();
   const params = queryString.parse(window.location.search);
   const history = useHistory();
   const [isDestroy, setIsDestroy] = useState(false);

   useEffect(() => {
      // if (params.errorCode) {
      //    history.push(TOUR_DETAIL.replace(":id", params.extraData) + parseObjToQuery(params));
      //    return;
      // }

      let tourDetail = {};
      if (params.orderId) {
         props
            .orderUpdateStatus({
               PIN: params.orderId,
               status: params?.message === "Success" ? ORDER_STATUS.Paid : ORDER_STATUS.New
            })
            .then(({ res }) => {
               props
                  .getOrder({ idOrder: params.idOrder, PIN: params.orderId })
                  .then(({ res }) => {
                     tourDetail = Object.assign(tourDetail, { order: res });
                     props.getTour(res.idTour).then(({ res }) => {
                        props.getAllImagesTour().then((resImg) => {
                           tourDetail = Object.assign(tourDetail, {
                              ...res,
                              images: resImg.res.filter((image) => {
                                 return res.idTour === image.idTour;
                              })
                           });
                           setOrderDetail(tourDetail);
                        });
                     });
                  })
                  .catch((err) => {
                     message.error("Lỗi load dữ liệu tour rồi nha");
                  });
            })
            .catch((err) => {
               message.error("Lỗi load dữ liệu tour rồi nha");
            });
      } else
         props
            .getOrder({ idOrder: params.idOrder, PIN: params.orderId })
            .then(({ res }) => {
               tourDetail = Object.assign(tourDetail, { order: res });
               props.getTour(res.idTour).then(({ res }) => {
                  props.getAllImagesTour().then((resImg) => {
                     tourDetail = Object.assign(tourDetail, {
                        ...res,
                        images: resImg.res.filter((image) => {
                           return res.idTour === image.idTour;
                        })
                     });
                     setOrderDetail(tourDetail);
                  });
               });
            })
            .catch((err) => {
               message.error("Lỗi load dữ liệu tour rồi nha");
            });
   }, []);

   // --------------------
   // FOR ORDER DETAIL
   // --------------------
   const [visibleModalDestroy, setVisibleModalDestroy] = useState(false);
   // --------------------
   // FOR ORDER DETAIL
   // --------------------

   return (
      <ScrollToTop>
         <OrderDetailStyled>
            <Header />
            <section className='payment-area section-bg section-padding'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-12'>
                        <div className='form-box payment-received-wrap mb-0'>
                           <StatusPayment isDestroy={isDestroy} />
                           <div className='form-content'>
                              <div className='row'>
                                 <div className='col-lg-12'>
                                    <InfoBooking orderDetail={orderDetail} />
                                 </div>
                              </div>
                              <div className='section-block' />
                              <PaymentDetail orderDetail={orderDetail} />
                              {!isDestroy && (
                                 <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                                    <Button
                                       size='large'
                                       className='mr-4'
                                       type='dashed'
                                       onClick={() => setVisibleModalDestroy(true)}>
                                       Hủy tour
                                    </Button>
                                    <Button type='primary' size='large' onClick={() => history.push(USER_BOOKING)}>
                                       Hoàn tất
                                    </Button>
                                 </div>
                              )}
                              {isDestroy && (
                                 <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                                    <span>Đã hủy</span>
                                    <Button
                                       type='primary'
                                       className='ml-4'
                                       size='large'
                                       onClick={() => history.push(APP_DEFAULT_PATH)}>
                                       Đặt tour khác
                                    </Button>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </OrderDetailStyled>
         <Modal
            width='800px'
            title='Hủy tour'
            visible={visibleModalDestroy}
            onCancel={() => setVisibleModalDestroy(false)}
            footer={[]}>
            <ModalDestroyTour
               setIsDestroy={setIsDestroy}
               visibleModalDestroy={visibleModalDestroy}
               setVisibleModalDestroy={setVisibleModalDestroy}
               orderDetail={orderDetail}
            />
         </Modal>
      </ScrollToTop>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour,
      getOrder: appApisActions.getOrder,
      orderUpdateStatus: appApisActions.orderUpdateStatus
   }
)(OrderDetail);
