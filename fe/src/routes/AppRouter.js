import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "~/views/container/AuthPage";
import Homepage from "~/views/container/Homepage";
const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            {/* Trang nào (Routing) KHÔNG cần phải đăng nhập mới vào được thì dùng Route */}
            <Route path={PATH.LOGIN_PATH} exact component={() => <Login />} />
            <Route path={PATH.HOME_PAGE} exact component={() => <Homepage />} />

            {/* Trang nào (Routing) cần phải đăng nhập mới vào được thì dùng AuthorizedRoute */}
            <AuthorizedRoute path={PATH.DASHBOARD} />

            <Redirect to={PATH.DASHBOARD} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
