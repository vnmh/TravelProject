import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import StatusPayment from "./StatusPayment";
import PaymentDetail from "./PaymentDetail";
import InfoBooking from "./InfoBooking";
import Header from "../Header";

const OrderDetailStyled = styled.div``;

function OrderDetail(props) {
   return (
      <OrderDetailStyled>
         <Header />
         {/* ================================
            START PAYMENT AREA
         ================================= */}
         <section className='payment-area section-bg section-padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='form-box payment-received-wrap mb-0'>
                        <StatusPayment />
                        <div className='form-content'>
                           <div className='row'>
                              <div className='col-lg-6'>
                                 <InfoBooking />
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <PaymentDetail />
                              </div>
                              {/* end col-lg-6 */}
                           </div>
                           {/* end row */}
                           <div className='row'>
                              <div className='col-lg-6'>
                                 <div className='payment-received-list'>
                                    <h3 className='title'>Received</h3>
                                    <p>Thank you. Your order has been received</p>
                                    <div className='table-form table-responsive pt-3 pb-3'>
                                       <table className='table'>
                                          <thead>
                                             <tr>
                                                <th scope='col'>Order</th>
                                                <th scope='col'>Date</th>
                                                <th scope='col'>Total</th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <th scope='row'>#121</th>
                                                <td>
                                                   <div className='table-content'>
                                                      <h3 className='title'>Thu 30 Mar, 2020</h3>
                                                   </div>
                                                </td>
                                                <td>
                                                   <div className='table-content'>
                                                      <h3 className='title'>$88</h3>
                                                   </div>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                    <p>
                                       Make your payment derectly into our bank account. Please ues your Order ID as the
                                       payment reference. Your order wont be shipped until the funds have cleared in our
                                       account
                                    </p>
                                 </div>
                                 {/* end card-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='payment-received-list'>
                                    <h3 className='title'>Payment Detail</h3>
                                    <div className='table-form table-layout-2 table-responsive pt-3'>
                                       <table className='table'>
                                          <thead>
                                             <tr>
                                                <th scope='col'>Room</th>
                                                <th scope='col' className='text-right'>
                                                   Total
                                                </th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <th scope='row'>
                                                   <div className='table-content'>
                                                      <p className='title pb-2'>EnVision Hotel Boston</p>
                                                      <p className='font-size-13 text-gray line-height-20 font-weight-medium'>
                                                         <span className='mr-2 color-text-2'>Start Date:</span>Thu 30
                                                         Mar, 2020
                                                      </p>
                                                      <p className='font-size-13 text-gray line-height-20 font-weight-medium'>
                                                         <span className='mr-2 color-text-2'>End Date:</span>Sat 01 Jun,
                                                         2020
                                                      </p>
                                                   </div>
                                                </th>
                                                <td>
                                                   <div className='table-content text-right'>
                                                      <h3 className='title color-text'>$88</h3>
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr>
                                                <th scope='row'>
                                                   <div className='table-content'>
                                                      <p className='title'>Subtotal</p>
                                                   </div>
                                                </th>
                                                <td>
                                                   <div className='table-content text-right'>
                                                      <h3 className='title color-text'>$88</h3>
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr>
                                                <th scope='row'>
                                                   <div className='table-content'>
                                                      <p className='title'>Order Total</p>
                                                   </div>
                                                </th>
                                                <td>
                                                   <div className='table-content text-right'>
                                                      <h3 className='title color-text'>$88</h3>
                                                   </div>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                                 {/* end card-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-12'>
                                 <div className='section-block mt-3' />
                                 <div className='btn-box text-center pt-4'>
                                    <a href='payment-complete.html' className='theme-btn'>
                                       Book Complete
                                    </a>
                                 </div>
                              </div>
                           </div>
                           {/* end row */}
                        </div>
                     </div>
                     {/* end payment-card */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </section>
         {/* ================================
            END PAYMENT AREA
         ================================= */}
      </OrderDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(OrderDetail);
