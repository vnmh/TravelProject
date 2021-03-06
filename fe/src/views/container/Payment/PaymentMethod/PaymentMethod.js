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
         // props
         //    .getLinkMoMo(body)
         //    .then(({ res }) => {
         //       setLinkMomo(res);
         //    })

         //    .catch((err) => {});
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
         departureDay: params.departureDay,
         vocationTime: +props.payment?.vocationTime,
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
            console.log(`ithoangtan -  ~ file: PaymentMethod.js ~ line 209 ~ .then ~ res`, res);

            message.success(
               props.user?.email
                  ? "T???o ????n h??ng th??nh c??ng"
                  : "Th??ng tin ????n h??ng ???? ???????c g???i t???i mail c???a b???n!" + props.info?.email
            );
            res.insertId &&
               history.push(
                  PATH.ORDER_DETAIL + parseObjToQuery({ idOrder: res.insertId, idTour: props.payment?.idTour })
               );
            setPIN(Date.now()); // C???n t???o m?? PIN m???i cho l???n thanh to??n ti???p theo
            setLoading(false);
         })
         .catch((err) => {
            setLoading(false);
            message.error("T???o ????n h??ng th???t b???i");
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
                                    Thanh to??n ngay
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
                        <div className='col-lg-12 responsive-column mb-4'>B???n s??? thanh to??n v???i ?????i l?? du l???ch</div>
                        <div className='col-lg-12'>
                           <div className='btn-box'>
                              <button disabled={loading} className='theme-btn' onClick={submitTransfer}>
                                 {loading && <LoadingOutlined />} Ho??n t???t
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
                                 <label className='label-text'>Ng??n h??ng</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>VIETCOMBANK</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>T??n t??i kho???n</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>Travel Project</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>S??? t??i kho???n</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>123 456 7894 123</span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>T???i ng??n h??ng</label>
                                 <div className='form-group'>
                                    <span style={{ fontWeight: 700 }}>
                                       Ng??n h??ng TMCP Ngo???i th????ng Vi???t Nam, S??? giao d???ch
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button disabled={loading} className='theme-btn' onClick={submitTransfer}>
                                    {loading && <LoadingOutlined />} Ho??n t???t
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
               <h3 className='title'>Ch???n ph????ng th???c thanh to??n</h3>
            </div>
            <div className='form-content'>
               <div className='section-tab check-mark-tab text-center pb-4'>
                  <ul className='nav nav-tabs justify-content-center' id='myTab' role='tablist'>
                     <li
                        className='nav-item'
                        onClick={() => {
                           if (props.infoTrue) {
                              // G???i API l???y link momo
                              const body = {
                                 order: {
                                    PIN,
                                    numberPeople: params.numberPeople,
                                    email: props.info.email
                                 },
                                 tour: {
                                    price: props.payment?.price,
                                    sale: props.payment?.sale,
                                    idTour: props.payment?.idTour
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
                           } else message.error("Vui l??ng ??i???n th??ng tin thanh to??n");
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
                           else message.error("Vui l??ng ??i???n th??ng tin thanh to??n");
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
                           <span className='d-block pt-2'>Chuy???n kho???n</span>
                        </a>
                     </li>
                     <li
                        className='nav-item'
                        onClick={() => {
                           if (props.infoTrue) setPaymentMethod("Cash");
                           else message.error("Vui l??ng ??i???n th??ng tin thanh to??n");
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
                           <span className='d-block pt-2'>Ti???n m???t</span>
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
