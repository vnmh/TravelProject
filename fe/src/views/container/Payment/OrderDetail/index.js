import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import StatusPayment from "./StatusPayment";
import PaymentDetail from "./PaymentDetail";
import InfoBooking from "./InfoBooking";
import Header from "../../Header";
import { message } from "antd";
import { appApisActions } from "~/state/ducks/appApis";
import queryString from 'query-string'

const OrderDetailStyled = styled.div``;

function OrderDetail(props) {
   const [orderDetail, setOrderDetail] = useState();
   const params = queryString.parse(window.location.search);

   useEffect(() => {
      let tourDetail = {};
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
   return (
      <OrderDetailStyled>
         <Header />
         <section className='payment-area section-bg section-padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='form-box payment-received-wrap mb-0'>
                        <StatusPayment />
                        <div className='form-content'>
                           <div className='row'>
                              <div className='col-lg-12'>
                                 <InfoBooking orderDetail={orderDetail}/>
                              </div>
                           </div>
                           <div className='section-block' />
                           <PaymentDetail orderDetail={orderDetail} />
                           <div className='col-lg-12'>
                              <div className='btn-box text-center pt-2'>
                                 <a href='payment-complete.html' className='theme-btn'>
                                    Thanh toán thành công
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </OrderDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour,
      getOrder: appApisActions.getOrder
   }
)(OrderDetail);
