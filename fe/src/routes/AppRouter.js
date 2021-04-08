import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "~/views/container/AuthPage";
import Homepage from "~/views/container/Homepage";
import TourDetail from "~/views/container/Tour/TourDetail";
import TourList from "~/views/container/Tour/TourList";
import TourGrid from "~/views/container/Tour/TourGrid";
import Payment from "~/views/container/Payment";
import PaymentReceived from "~/views/container/Payment/PaymentReceived";


const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            {/* Trang nào (Routing) KHÔNG cần phải đăng nhập mới vào được thì dùng Route */}
            <Route path={PATH.LOGIN_PATH} exact component={() => <Login />} />
            <Route path={PATH.HOME_PAGE} exact component={() => <Homepage />} />
            <Route path={PATH.TOUR_LIST} exact component={() => <TourList />} />
            <Route path={PATH.TOUR_GRID} exact component={() => <TourGrid />} />
            <Route path={PATH.TOUR_DETAIL} exact component={() => <TourDetail />} />
            <Route path={PATH.TOUR_BOOKING} exact component={() => <Payment />} />
            <Route path={PATH.PAYMENT_RECEIVED} exact component={() => <PaymentReceived />} />

            {/* Trang nào (Routing) CẦN phải đăng nhập mới vào được thì dùng AuthorizedRoute */}
            <AuthorizedRoute path={PATH.HOME_PAGE} />
            <AuthorizedRoute path={PATH.TOUR_BOOKING} />
            <AuthorizedRoute path={PATH.PAYMENT_RECEIVED} />

            <Redirect to={PATH.HOME_PAGE} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
