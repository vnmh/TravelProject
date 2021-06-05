import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Homepage from "~/views/container/Homepage";
import TourDetail from "~/views/container/Tour/TourDetail";
import TourList from "~/views/container/Tour/TourList";
import TourGrid from "~/views/container/Tour/TourGrid";

import BlogGrid from "~/views/container/Blog/BlogGrid";
import BlogDetail from "~/views/container/Blog/BlogDetail";
import ForgetPassword from "~/views/container/Homepage/ForgetPassword";
import PaymentMethod from "~/views/container/Payment/PaymentMethod";
import OrderDetail from "~/views/container/Payment/OrderDetail";
import BookingUser from "~/views/container/BookingUser";

const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            {/* Trang nào (Routing) KHÔNG cần phải đăng nhập mới vào được thì dùng Route */}
            <Route path={PATH.HOME_PAGE} exact component={() => <Homepage />} />
            <Route path={PATH.TOUR_LIST} exact component={() => <TourList />} />
            <Route path={PATH.TOUR_GRID} exact component={() => <TourGrid />} />
            <Route path={PATH.TOUR_DETAIL} exact component={() => <TourDetail />} />
            <Route path={PATH.TOUR_BOOKING} exact component={() => <PaymentMethod />} />
            <Route path={PATH.ORDER_DETAIL} exact component={() => <OrderDetail />} />
            <Route path={PATH.BLOG_GRID} exact component={() => <BlogGrid />} />
            <Route path={PATH.BLOG_DETAIL} exact component={() => <BlogDetail />} />
            <Route path={PATH.FORGET_PASSWORD} exact component={() => <ForgetPassword />} />
            <Route path={PATH.USER_BOOKING} exact component={() => <BookingUser />} />
            {/* Trang nào (Routing) CẦN phải đăng nhập mới vào được thì dùng AuthorizedRoute */}
            <AuthorizedRoute path={PATH.TOUR_BOOKING} />

            <AuthorizedRoute path={PATH.ADMIN_DASHBOARD} exact />
            <AuthorizedRoute path={PATH.ADMIN_BOOKING} exact />
            <AuthorizedRoute path={PATH.ADMIN_TOUR_LIST} exact />
            <AuthorizedRoute path={PATH.ADMIN_REVIEW} exact />
            <AuthorizedRoute path={PATH.PROFILE} exact />
            <AuthorizedRoute path={PATH.ADMIN_BLOG} exact />
            <AuthorizedRoute path={PATH.ADMIN_SERVICE} exact />

            <Redirect to={PATH.HOME_PAGE} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
