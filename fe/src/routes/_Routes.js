import React from "react";
import * as PATH from "~/configs/routesConfig";
import Homepage from "~/views/container/Homepage";
import Payment from "~/views/container/Payment";
import PaymentReceived from "~/views/container/Payment/PaymentReceived";

export default [
   // Cần auth mới vào được thì khai báo ở đây
   {
      path: PATH.HOME_PAGE,
      component: () => <Homepage />,
      exact: true
   },
   {
      path: PATH.TOUR_BOOKING,
      component: () => <Payment />,
      exact: true
   },
   {
      path: PATH.PAYMENT_RECEIVED,
      component: () => <PaymentReceived />,
      exact: true
   }
];
