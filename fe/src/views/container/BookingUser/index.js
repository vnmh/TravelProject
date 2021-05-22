import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { ROLES } from "~/configs";
import BookingUser from "./BookingUser";
import { message } from "antd";
import { appApisActions } from "~/state/ducks/appApis";
import ScrollToTop from "~/ScrollToTop";
import { ORDER_STATUS } from "~/configs/status";
import _ from "lodash";
import Header from "../Header";

const BookingUserPageStyled = styled.div``;

const BookingUserPage = (props) => {
   const history = useHistory();
   const [tourBooking, setTourBooking] = useState([]);
   const [needLoading, setNeedLoading] = useState(true);
   const [status, setStatus] = useState();
   const [tourBookingFilter, setTourBookingFilter] = useState();
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });

   const handleChangeTable = (pagination) => {
      setPagination({
         ...props.pagination,
         page: pagination?.current,
         size: pagination?.pageSize
      });
   };

   useEffect(() => {
      props
         .getOrdersWithEmail({email : props.user?.email})
         .then(({ res }) => {
         console.log("maidev ~ file: index.js ~ line 39 ~ useEffect ~ props.user?.email", props.user?.email)
           console.log("maidev ~ file: index.js ~ line 39 ~ .then ~ res", res)
           // setTourBooking(res);
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
      setPagination({
         page: 1,
         size: 10,
         total: tourBooking.length
      });
   }, [needLoading]);

   useEffect(() => {
      switch (status) {
         case ORDER_STATUS.New:
            setTourBookingFilter(
               Array.from(
                  _.filter(tourBooking, (o) => {
                     return o.status === ORDER_STATUS.New;
                  })
               )
            );
            break;
         case ORDER_STATUS.Waiting:
            setTourBookingFilter(
               Array.from(_.filter(tourBooking, (o) => {
                  return o.status === ORDER_STATUS.Waiting;
               }))
            );
            break;
         case ORDER_STATUS.Paid:
            setTourBookingFilter(
               Array.from(_.filter(tourBooking, (o) => {
                  return o.status === ORDER_STATUS.Paid;
               }))
            );
            break;
         case ORDER_STATUS.Done:
            setTourBookingFilter(
               Array.from(_.filter(tourBooking, (o) => {
                  return o.status === ORDER_STATUS.Done;
               }))
            );
            break;
         case ORDER_STATUS.Cancel:
            setTourBookingFilter(
               Array.from(_.filter(tourBooking, (o) => {
                  return o.status === ORDER_STATUS.Cancel;
               }))
            );
            break;
         default:
            setTourBookingFilter(undefined);
            break;
      }
   }, [status]);

   return (
      <ScrollToTop>
         <BookingUserPageStyled>
            <body className='section-bg'>
                  <Header />
                  <BookingUser
                     onChange={handleChangeTable}
                     tourBooking={tourBooking}
                     needLoading={needLoading}
                     setNeedLoading={setNeedLoading}
                     setStatus={setStatus}
                     status={status}
                     tourBookingFilter={tourBookingFilter}
                  />
            </body>
         </BookingUserPageStyled>
      </ScrollToTop>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => BookingUserPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login,
         getOrders: appApisActions.getOrders,
         getOrdersWithEmail : appApisActions.getOrdersWithEmail
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingUserPage);
