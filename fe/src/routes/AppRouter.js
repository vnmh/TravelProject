import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "~/views/container/AuthPage";
import Homepage from "~/views/container/Homepage";
import ListTour from "~/views/container/Tour/ListTour";
import TourDetail from "~/views/container/Tour/TourDetail";

const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            {/* Trang nào (Routing) KHÔNG cần phải đăng nhập mới vào được thì dùng Route */}
            <Route path={PATH.LOGIN_PATH} exact component={() => <Login />} />
            <Route path={PATH.HOME_PAGE} exact component={() => <Homepage />} />
            <Route path={PATH.LIST_TOUR} exact component={() => <ListTour />} />
            <Route path={PATH.TOUR_DETAIL} exact component={() => <TourDetail />} />

            {/* Trang nào (Routing) CẦN phải đăng nhập mới vào được thì dùng AuthorizedRoute */}
            <AuthorizedRoute path={PATH.HOME_PAGE} />

            <Redirect to={PATH.HOME_PAGE} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
