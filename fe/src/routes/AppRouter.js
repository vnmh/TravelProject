import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Homepage from "~/views/container/Homepage";
import TourDetail from "~/views/container/Tour/TourDetail";
import TourList from "~/views/container/Tour/TourList";
import TourGrid from "~/views/container/Tour/TourGrid";
import Payment from "~/views/container/Payment";
import DashBoard from "~/views/container/Admin/DashBoardAdmin";
import BookingAdminPage from "~/views/container/Admin/BookingAdmin";
import TourAdminPage from "~/views/container/Admin/TourAdmin";
import ReviewAdminPage from "~/views/container/Admin/ReviewAdmin";
import ProfilePage from "~/views/container/Profile";
import BlogAdminPage from "~/views/container/Admin/BlogAdmin";
import BlogGrid from "~/views/container/Blog/BlogGrid";
import BlogDetail from "~/views/container/Blog/BlogDetail";
import OrderDetail from "~/views/container/Payment/OrderDetail";
import ServiceAdminPage from "~/views/container/Admin/ServiceAdmin";

const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            {/* Trang nào (Routing) KHÔNG cần phải đăng nhập mới vào được thì dùng Route */}
            <Route path={PATH.HOME_PAGE} exact component={() => <Homepage />} />
            <Route path={PATH.TOUR_LIST} exact component={() => <TourList />} />
            <Route path={PATH.TOUR_GRID} exact component={() => <TourGrid />} />
            <Route path={PATH.TOUR_DETAIL} exact component={() => <TourDetail />} />
            <Route path={PATH.TOUR_BOOKING} exact component={() => <Payment />} />
            <Route path={PATH.ORDER_DETAIL} exact component={() => <OrderDetail />} />

            <Route path={PATH.BLOG_GRID} exact component={() => <BlogGrid />} />
            <Route path={PATH.BLOG_DETAIL} exact component={() => <BlogDetail />} />

            {/* Trang nào (Routing) CẦN phải đăng nhập mới vào được thì dùng AuthorizedRoute */}
            <AuthorizedRoute path={PATH.HOME_PAGE} />
            <AuthorizedRoute path={PATH.TOUR_BOOKING} />

            <Route path={PATH.ADMIN_DASHBOARD} exact component={() => <DashBoard />} />
            <Route path={PATH.ADMIN_BOOKING} exact component={() => <BookingAdminPage />} />
            <Route path={PATH.ADMIN_TOUR_LIST} exact component={() => <TourAdminPage />} />
            <Route path={PATH.ADMIN_REVIEW} exact component={() => <ReviewAdminPage />} />
            <Route path={PATH.PROFILE} exact component={() => <ProfilePage />} />
            <Route path={PATH.ADMIN_BLOG} exact component={() => <BlogAdminPage />} />
            <Route path={PATH.ADMIN_SERVICE} exact component={() => <ServiceAdminPage />} />
            
            <Redirect to={PATH.HOME_PAGE} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
