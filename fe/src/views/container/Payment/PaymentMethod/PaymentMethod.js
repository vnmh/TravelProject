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
import { ORDER_STATUS } from "~/configs/status";
import { LoadingOutlined } from "@ant-design/icons";

const PaymentMethodStyled = styled.div``;

function PaymentMethod(props) {
   const params = queryString.parse(window.location.search);
   const [linkMomo, setLinkMomo] = useState("");
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const [PIN, setPIN] = useState(Date.now());
   useEffect(() => {
      if (props.user?.email && props.payment?.price > 0) {
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
         status: ORDER_STATUS.New,
         paymentMethod,
         totalPrice:
            props.payment?.price * params.numberPeople -
            props.payment?.price * props.payment?.sale * 0.01 * params.numberPeople,
         numberPeople: params.numberPeople,
         email: props.info.email ? props.info.email : props.user?.email,
         phone: props.info.phone ? props.info.phone : props.user?.phone,
         buyer: props.info.name ? props.info.name : props.user?.name,
         address: props.info.address ? props.info.address : props.user?.address,
         notes: "",
         idAccount: props.user?.idAccount,
         idTour: props.payment?.idTour
      };
      setLoading(true);
      props
         .createOrder(body)
         .then(({ res }) => {
            message.success(
               props.user?.email
                  ? "Tạo đơn hàng thành công"
                  : "Thông tin đơn hàng đã được gửi tới mail của bạn!" + props.info?.email
            );
            history.push(PATH.ORDER_DETAIL + parseObjToQuery({ idOrder: res.insertId, idTour: props.payment?.idTour }));
            setPIN(Date.now()); // Cần tạo mã PIN mới cho lần thanh toán tiếp theo
            setLoading(false);
         })
         .catch((err) => {
            setLoading(false);
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
                        </div>
                     </form>
                  </div>
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
                        <div className='col-lg-12 responsive-column mb-4'>Bạn sẽ thanh toán tại với đại lý du lịch</div>
                        <div className='col-lg-12'>
                           <div className='btn-box'>
                              <button disabled={loading} className='theme-btn' onClick={submitTransfer}>
                                 {loading && <LoadingOutlined />} Hoàn tất
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
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
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button disabled={loading} className='theme-btn' onClick={submitTransfer}>
                                    {loading && <LoadingOutlined />} Hoàn tất
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
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
            <div className='form-content'>
               <div className='section-tab check-mark-tab text-center pb-4'>
                  <ul className='nav nav-tabs justify-content-center' id='myTab' role='tablist'>
                     <li
                        className='nav-item'
                        onClick={() => {
                           if (props.infoTrue) {
                              // Gọi API lấy link momo
                              const body = {
                                 order: {
                                    PIN,
                                    numberPeople: params.numberPeople,
                                    email: props.info.email
                                 },
                                 tour: {
                                    price: props.payment?.price,
                                    sale: props.payment?.sale
                                 }
                              };
                              setLoading(true);
                              props
                                 .getLinkMoMo(body)
                                 .then(({ res }) => {
                                    setLinkMomo(res);
                                    setLoading(false);
                                    setPaymentMethod("MOMO");
                                 })

                                 .catch((err) => {
                                    setLoading(false);
                                 });
                           } else message.error("Vui lòng điền thông tin thanh toán");
                        }}>
                        <a
                           className={`nav-link ${paymentMethod === "MOMO" ? "active" : ""} `}
                           id='credit-card-tab'
                           data-toggle='tab'
                           role='tab'
                           aria-controls='credit-card'
                           aria-selected='false'>
                           <i className='la la-check icon-element' />
                           <img src='/images/MoMo_Logo.png' width='100px' height='100px' alt='' />
                           <span className='d-block pt-2'>MOMO</span>
                        </a>
                     </li>
                     <li
                        className='nav-item'
                        onClick={() => {
                           if (props.infoTrue) setPaymentMethod("Transfer");
                           else message.error("Vui lòng điền thông tin thanh toán");
                        }}>
                        <a
                           className={`nav-link ${paymentMethod === "Transfer" ? "active" : ""} `}
                           id='paypal-tab'
                           data-toggle='tab'
                           role='tab'
                           aria-controls='paypal'
                           aria-selected='true'>
                           <i className='la la-check icon-element' />
                           <img width='100px' height='100px' src='/images/transfer-logo.jpg' alt='' />
                           <span className='d-block pt-2'>Chuyển khoản</span>
                        </a>
                     </li>
                     <li
                        className='nav-item'
                        onClick={() => {
                           if (props.infoTrue) setPaymentMethod("Cash");
                           else message.error("Vui lòng điền thông tin thanh toán");
                        }}>
                        <a
                           className={`nav-link ${paymentMethod === "Cash" ? "active" : ""} `}
                           id='payoneer-tab'
                           data-toggle='tab'
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
               <div className='tab-content'>
                  {loading && <LoadingOutlined />}
                  {renderPaymentMethod()}
               </div>
            </div>
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
