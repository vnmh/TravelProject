import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import BookingTableListUserPage from "./BookingTableListUserPage";
import { appApisActions } from "~/state/ducks/appApis";
import { Select } from "antd";
import { ORDER_STATUS, renderStatusOrder } from "~/configs/status";

const BookingListUserPageStyled = styled.div``;

const BookingListUserPage = (props) => {
   const [isSubmit, setIsSubmit] = useState(false);
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });

   return (
      <BookingListUserPageStyled>
         <div className='row'>
            <div className='col-lg-12 form-box'>
               <div className='form-title-wrap'>
                  {/* <h3 className='title'>Danh sách tours đã đặt</h3> */}
                  <div className='d-flex justify-content-between'>
                     <p className='font-size-14'>
                        {/* Hiển thị {pagination.page} trong tổng số {Math.ceil(pagination.total / pagination.size)}{" "}
                              trang của {pagination.total} phần tử */}
                     </p>
                     <Select style={{ width: 200 }} placeholder='Trạng thái' allowClear onChange={props.setStatus}>
                        {Object.keys(ORDER_STATUS).map((status) => {
                           return <Select.Option value={status}>{renderStatusOrder(status, "String")}</Select.Option>;
                        })}
                     </Select>
                  </div>
               </div>
               <div className='form-content'>
                  {(props.tourBookingFilter ? props.tourBookingFilter : props.tourBooking)?.map((item, index) => {
                     return (
                        <BookingTableListUserPage
                           key={`booking_detail${index}`}
                           setIsSubmit={setIsSubmit}
                           isSubmit={isSubmit}
                           pagination={pagination}
                           setPagination={setPagination}
                           bookingDetail={item}
                           needLoading={props.needLoading}
                           setNeedLoading={props.setNeedLoading}
                           tourBookingFilter={props.tourBookingFilter}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </BookingListUserPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.Useristrator && isAuthenticated => TourTableListUserPage User , không thì redirect tới homepage
      }),
      {
         getTour: appApisActions.getTour,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingListUserPage);
