import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
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
import { message } from "antd";

const BookingTableListUserPageStyled = styled.div``;

const BookingTableListUserPage = (props) => {
   const [bookingDetail, setBookingDetail] = useState([]);

   const onSubmit = () => {
      const bodyUpdate = {
         PIN: props.bookingDetail?.PIN,
         status: props.bookingDetail?.status === ORDER_STATUS.New ? ORDER_STATUS.Waiting : ORDER_STATUS.Done
      };
      props
         .orderUpdateStatus(bodyUpdate)
         .then((res) => {
            message.success("Đã cập nhật");
            props.setNeedLoading(true);
         })
         .catch((err) => {
            props.setNeedLoading(false);
            message.error("Cập nhật thất bại");
            console.log("maidev ~ file: BookingTableListUserPage.js ~ line 26 ~ onFinsh ~ err", err);
         });
   };

   const onCancel = () => {
      const bodyUpdate = {
         PIN: props.bookingDetail?.PIN,
         status: ORDER_STATUS.Cancel
      };
      props
         .orderUpdateStatus(bodyUpdate)
         .then((res) => {
            message.success("Đã cập nhật");
            props.setNeedLoading(true);
         })
         .catch((err) => {
            props.setNeedLoading(false);
            message.error("Cập nhật thất bại");
            console.log("maidev ~ file: BookingTableListUserPage.js ~ line 26 ~ onFinsh ~ err", err);
         });
   };

   useEffect(() => {
      if (props.bookingDetail?.idTour > 0 && props.needLoading)
         props
            .getTour(props.bookingDetail?.idTour)
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
   }, [props.bookingDetail?.idTour, props.needLoading]);

   useEffect(() => {
      props.setNeedLoading(true);
   }, [_.first(props.tourBookingFilter || [])?.idTour, _.last(props.tourBookingFilter || [])?.idTour]);

   return (
      <BookingTableListUserPageStyled>
         <div class='row'>
            <div class='col-lg-12'>
               <div className='form-box'>
                  <div className='form-content pb-2'>
                     <div className='card-item card-item-list card-item--list'>
                        <div className='card-img'>
                           <img
                              style={{ width: "100%" }}
                              src={
                                 bookingDetail?.images?.length > 0
                                    ? firstImage(_.head(bookingDetail?.images)?.url || "")
                                    : "images/destination-img7.jpg"
                              }
                              alt='Destination-img'
                           />
                        </div>
                        <div className='card-body'>
                           <div className='d-flex align-items-center'>
                              <h3 className='card-title'>{bookingDetail?.titleTour}</h3>
                           </div>
                           <ul className='list-items list-items-2 pt-2 pb-3'>
                              <li>
                                 <span>Trạng thái:</span>
                                 {renderStatusOrder(props.bookingDetail?.status)}
                              </li>
                              <li>
                                 <span>Ngày khởi hành:</span>
                                 {UtilDate.toDateLocal(bookingDetail?.departureDay)}
                              </li>
                              <li>
                                 <span>Ngày kết thúc:</span>
                                 {UtilDate.toDateLocal(
                                    moment(bookingDetail?.departureDay).add(bookingDetail?.vocationTime, "days")
                                 )}
                              </li>
                              <li>
                                 <span>Số người:</span>
                                 {props.bookingDetail?.numberPeople} người
                              </li>
                              <li>
                                 <span>Tên khách hàng:</span>
                                 {props.bookingDetail?.buyer}
                              </li>
                           </ul>
                        </div>
                        {props.bookingDetail?.status !== ORDER_STATUS.Done && (
                           <div className='action-btns position-relative'>
                              <button
                                 className='d-flex justify-content-center align-items-center theme-btn theme-btn-small mr-4 position-absolute'
                                 style={{ bottom: 47, right: 124, width: 130 }}
                                 onClick={onSubmit}>
                                 <i className='la la-check-circle mr-1' />
                                 {props.bookingDetail?.status === "New" ? "Phê duyệt" : "Hoàn thành"}
                              </button>
                              <button
                                 className='d-flex justify-content-center align-items-center theme-btn theme-btn-small position-absolute'
                                 style={{ bottom: 47, right: 24, width: 120 }}
                                 onClick={onCancel}>
                                 <i className='la la-times mr-1' />
                                 Hủy bỏ
                              </button>
                           </div>
                        )}
                     </div>
                     {/* end card-item */}
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
         getAllImagesTour: appApisActions.getAllImagesTour,
         orderUpdateStatus: appApisActions.orderUpdateStatus
      }
   ),
   withRouter
)(BookingTableListUserPage);
