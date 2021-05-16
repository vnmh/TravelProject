import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import queryString from "query-string";
import { message } from "antd";
import * as PATH from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";
import { useHistory } from "react-router";

const PaymentMethodStyled = styled.div``;

function PaymentMethod(props) {
   const params = queryString.parse(window.location.search);
   const [linkMomo, setLinkMomo] = useState("");
   const history = useHistory();
   const [PIN, setPIN] = useState(Date.now());
   useEffect(() => {
      if (props.payment?.price > 0) {
         const body = {
            order: {
               PIN,
               numberPeople: params.numberPeople,
               email: props.user?.email
            },
            tour: {
               price: props.payment?.price,
               sale: props.payment?.sale
            }
         };
         props
            .getLinkMoMo(body)
            .then(({ res }) => {
               setLinkMomo(res);
            })

            .catch((err) => {});
      }
   }, [props.payment?.price]);

   const [paymentMethod, setPaymentMethod] = useState("");

   const submitTransfer = () => {
      const body = {
         PIN,
         status: "new",
         paymentMethod,
         totalPrice:
            props.payment?.price * params.numberPeople -
            props.payment?.price * props.payment?.sale * 0.01 * params.numberPeople,
         numberPeople: params.numberPeople,
         address: props.user?.address,
         phone: props.user?.phone,
         email: props.user?.email,
         notes: "",
         idAccount: props.user?.idAccount,
         buyer: props.user?.name,
         idTour: props.payment?.idTour
      };
      props
         .createOrder(body)
         .then(({ res }) => {
            message.success("Tạo đơn hàng thành công");
            history.push(PATH.ORDER_DETAIL + parseObjToQuery({ idOrder: res.insertId, idTour: props.payment?.idTour }));
            setPIN(Date.now());
         })
         .catch((err) => {
            message.error("Tạo đơn hàng thất bại");
         });
   };

   const renderPaymentMethod = () => {
      switch (paymentMethod) {
         case "MOMO":
            return (
               <div
                  className='tab-pane fade show active'
                  id='credit-card'
                  role='tabpanel'
                  aria-labelledby='credit-card-tab'>
                  <div className='contact-form-action'>
                     <form method='post'>
                        <div className='row'>
                           {/* end col-lg-6 */}
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <a
                                    className='theme-btn'
                                    type='submit'
                                    href={linkMomo?.data?.payUrl}
                                    onClick={submitTransfer}>
                                    Thanh toán ngay
                                 </a>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                        </div>
                     </form>
                  </div>
                  {/* end contact-form-action */}
               </div>
            );
         case "Cash":
            return (
               <div
                  className='tab-pane fade show active'
                  id='credit-card'
                  role='tabpanel'
                  aria-labelledby='credit-card-tab'>
                  <div className='contact-form-action'>
                     <div className='row'>
                        {/* end col-lg-6 */}
                        <div className='col-lg-12 responsive-column mb-4'>Bạn sẽ thanh toán tại với đại lý du lịch</div>
                        <div className='col-lg-12'>
                           <div className='btn-box'>
                              <button className='theme-btn' type='submit'>
                                 Hoàn tất
                              </button>
                           </div>
                        </div>
                        {/* end col-lg-12 */}
                     </div>
                  </div>
                  {/* end contact-form-action */}
               </div>
            );
         case "Transfer":
            return (
               <div
                  className='tab-pane fade show active'
                  id='credit-card'
                  role='tabpanel'
                  aria-labelledby='credit-card-tab'>
                  <div className='contact-form-action'>
                     <div>
                        <div className='row'>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Ngân hàng</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>VIETCOMBANK</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Tên tài khoản</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>Travel Project</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Số tài khoản</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>123 456 7894 123</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Tại ngân hàng</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>
                                       Ngân hàng TMCP Ngoại thương Việt Nam, Sở giao dịch
                                    </span>
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-6 */}
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button className='theme-btn' onClick={submitTransfer}>
                                    Hoàn tất
                                 </button>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                        </div>
                     </div>
                  </div>
                  {/* end contact-form-action */}
               </div>
            );
         default:
            break;
      }
   };

   return (
      <PaymentMethodStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <h3 className='title'>Chọn phương thức thanh toán</h3>
            </div>
            {/* form-title-wrap */}
            <div className='form-content'>
               <div className='section-tab check-mark-tab text-center pb-4'>
                  <ul className='nav nav-tabs justify-content-center' id='myTab' role='tablist'>
                     <li className='nav-item' onClick={() => setPaymentMethod("MOMO")}>
                        <a
                           className={`nav-link ${paymentMethod === "MOMO" ? "active" : ""} `}
                           id='credit-card-tab'
                           data-toggle='tab'
                           href='#1'
                           role='tab'
                           aria-controls='credit-card'
                           aria-selected='false'>
                           <i className='la la-check icon-element' />
                           <img src='/images/MoMo_Logo.png' width='100px' height='100px' alt='' />
                           <span className='d-block pt-2'>MOMO</span>
                        </a>
                     </li>
                     <li className='nav-item' onClick={() => setPaymentMethod("Transfer")}>
                        <a
                           className={`nav-link ${paymentMethod === "Transfer" ? "active" : ""} `}
                           id='paypal-tab'
                           data-toggle='tab'
                           href='#1'
                           role='tab'
                           aria-controls='paypal'
                           aria-selected='true'>
                           <i className='la la-check icon-element' />
                           <img width='100px' height='100px' src='/images/transfer-logo.jpg' alt='' />
                           <span className='d-block pt-2'>Chuyển khoản</span>
                        </a>
                     </li>
                     <li className='nav-item' onClick={() => setPaymentMethod("Cash")}>
                        <a
                           className={`nav-link ${paymentMethod === "Cash" ? "active" : ""} `}
                           id='payoneer-tab'
                           data-toggle='tab'
                           href='#1'
                           role='tab'
                           aria-controls='payoneer'
                           aria-selected='true'>
                           <i className='la la-check icon-element' />
                           <img alt='' src='/images/cash-logo.jpg' width='100px' height='100px' />
                           <span className='d-block pt-2'>Tiền mặt</span>
                        </a>
                     </li>
                  </ul>
               </div>
               {/* end section-tab */}
               <div className='tab-content'>{renderPaymentMethod()}</div>
               {/* end tab-content */}
            </div>
            {/* end form-content */}
         </div>
      </PaymentMethodStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours,
      getLinkMoMo: appApisActions.getLinkMoMo,
      createOrder: appApisActions.createOrder
   }
)(PaymentMethod);
