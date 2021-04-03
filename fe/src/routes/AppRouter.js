import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "~/views/container/AuthPage";
const AppRouter = (props) => {
   return (
      <Router>
         <Switch>
            <Route path={PATH.LOGIN_PATH} exact component={() => <Login />} />

            <AuthorizedRoute path={PATH.DASHBOARD_PATH} />

            <Redirect to={PATH.MASTER_DATA_DASHBOARD} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
