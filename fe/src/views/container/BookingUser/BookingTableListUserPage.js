import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components";
import { appApisActions } from "~/state/ducks/appApis";
import { renderStatusOrder } from "~/configs/status";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import moment from "moment";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import _ from "lodash";
import { ORDER_STATUS } from "~/configs/status";
import { Button, Divider, message, Popconfirm, Tooltip, Typography } from "antd";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import * as PATH from "~/configs/routesConfig";
import { parseObjToQuery } from "~/views/utilities/helpers";

const BookingTableListUserPageStyled = styled.div``;

const BookingTableListUserPage = (props) => {
   const [bookingDetail, setBookingDetail] = useState([]);

   useEffect(() => {
      if (props.bookingDetail?.idTour > 0 && props.needLoading)
         props
            .getTourAll(props.bookingDetail?.idTour)
            .then(({ res }) => {
               props.getAllImagesTour().then((resImg) => {
                  const tourWithImage = {
                     ...res,
                     images: resImg.res.filter((image) => {
                        return res.idTour === image.idTour;
                     })
                  };
                  props.setNeedLoading(false);
                  setBookingDetail(tourWithImage);
               });
            })
            .catch((err) => {
               props.setNeedLoading(false);
               console.log("maidev ~ file: BookingTableListUserPage.js ~ line 34 ~ useEffect ~ err", err);
            });
   }, [props.bookingDetail?.idTour, props.bookingDetail?.status, props.needLoading]);

   useEffect(() => {
      props.setNeedLoading(true);
   }, [_.first(props.tourBookingFilter || [])?.idTour, _.last(props.tourBookingFilter || [])?.idTour]);

   return (
      <BookingTableListUserPageStyled>
         <div class='row '>
            <div className='card-item card-item-list card-item--list col-12 px-0 '>
               <div className='card-img' style={{ maxWidth: 250 }}>
                  <img
                     style={{ width: "100%", height: "auto" }}
                     src={
                        bookingDetail?.images?.length > 0
                           ? firstImage(_.head(bookingDetail?.images)?.url || "")
                           : "images/destination-img7.jpg"
                     }
                     alt='Destination-img'
                  />
                  <div className='text-center mt-3'>
                     PIN: <strong>{props.bookingDetail?.PIN}</strong>
                  </div>
               </div>
               <div className='card-body' style={{ position: "relative" }}>
                  <div style={{ position: "absolute", right: 25, top: 25 }}>
                     {renderStatusOrder(props.bookingDetail?.status)}
                  </div>
                  <div className='d-flex align-items-center'>
                     <h3 className='card-title'>
                        <Tooltip title={bookingDetail?.titleTour}>
                           <Link
                              to={
                                 PATH.ORDER_DETAIL +
                                 parseObjToQuery({
                                    idOrder: props.bookingDetail?.idOrder,
                                    idTour: props.bookingDetail?.idTour
                                 })
                              }>
                              <Typography.Paragraph name='title' classname='text-link' ellipsis={{ rows: 2 }}>
                                 {bookingDetail?.titleTour}
                              </Typography.Paragraph>
                           </Link>
                        </Tooltip>
                     </h3>
                  </div>
                  <div className='d-flex'>
                     <ul className='list-items list-items-2 col-6 px-0'>
                        <li>
                           <span>Ng??y kh???i h??nh:</span>
                           {UtilDate.toDateLocal(moment(props.bookingDetail?.departureDay))}
                        </li>
                        <li>
                           <span>Thanh to??n:</span>
                           {`${currencyFormat(props.bookingDetail?.totalPrice)} - ${
                              props.bookingDetail?.paymentMethod
                           }`}
                        </li>
                        <li>
                           <span>T??n kh??ch h??ng:</span>
                           {props.bookingDetail?.buyer} {`(${props.bookingDetail?.phone})`}
                        </li>
                     </ul>
                     <ul className='list-items list-items-2 col-6 px-0'>
                        <li>
                           <span>Ng??y k???t th??c:</span>
                           {UtilDate.toDateLocal(
                              moment(props.bookingDetail?.departureDay).add(bookingDetail?.vocationTime, "days")
                           )}
                        </li>
                        <li>
                           <span>?????a ??i???m k.h??nh:</span>
                           {props.bookingDetail?.departureAddress}
                        </li>
                        <li>
                           <span>S??? kh??ch ??i:</span>
                           {`${props.bookingDetail?.numberPeople} /${props.bookingDetail?.groupSize}`} ng?????i
                        </li>
                     </ul>
                  </div>
                  <div className='d-flex row justify-content-between'>
                     <div>
                        {props.bookingDetail?.status === ORDER_STATUS.Destroy && (
                           <>
                              <span>Ph?? h???y ph???i tr???: </span>
                              <b>{currencyFormat(props.bookingDetail?.destroyFee)}</b>
                           </>
                        )}
                     </div>
                     <div className='d-flex'>
                        {moment(props.bookingDetail?.departureDay).unix() - moment().unix() > 0 && (
                           <Popconfirm
                              placement='topRight'
                              title={"B???n mu???n x??a ????n h??ng n??y?"}
                              onConfirm={() => {
                                 const bodyUpdate = {
                                    PIN: props.bookingDetail?.PIN,
                                    status: ORDER_STATUS.Destroy
                                 };
                                 props
                                    .orderUpdateStatus(bodyUpdate)
                                    .then((res) => {
                                       message.success("Y??u c???u h???y th??nh c??ng!");
                                    })
                                    .catch((err) => {
                                       message.error("Th???t b???i");
                                    });
                              }}
                              okText='X??a'
                              cancelText='Kh??ng'>
                              <Button danger>H???y</Button>
                           </Popconfirm>
                        )}

                        {props.bookingDetail?.status === ORDER_STATUS.Cancel && (
                           <>
                              <Divider type='vertical'></Divider>
                              <Button
                                 type='dashed'
                                 onClick={() => {
                                    props
                                       .deleteOrder(props.bookingDetail?.idOrder)
                                       .then((res) => {
                                          message.success("X??a th??nh c??ng!");
                                       })
                                       .catch((err) => {
                                          message.error("X??a th???t b???i");
                                       });
                                 }}>
                                 X??a
                              </Button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </BookingTableListUserPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
      }),
      {
         login: authActions.login,
         getTour: appApisActions.getTour,
         getTourAll: appApisActions.getTourAll,
         getAllImagesTour: appApisActions.getAllImagesTour,
         orderUpdateStatus: appApisActions.orderUpdateStatus,
         deleteOrder: appApisActions.deleteOrder
      }
   ),
   withRouter
)(BookingTableListUserPage);
