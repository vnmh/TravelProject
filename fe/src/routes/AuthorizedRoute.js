import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_PATH, APP_DEFAULT_PATH } from "~/configs/routesConfig";
import { getAuthUser } from "~/state/ducks/authUser/selectors";
import _Routes from "./_Routes";
import AuthBaseRoute from "./AuthBaseRoute";

const renderRoute = (path, routes, redirectURL = null) => {
   return (
      <Route
         path={path}
         component={() => <AuthBaseRoute routes={routes} path={path} redirectURL={redirectURL ? redirectURL : path} />}
      />
   );
};

const AuthorizedRoute = ({ user, path }) => {
   return (
      <Switch>
         {user && renderRoute(path, _Routes)}
         <Redirect to={user ? APP_DEFAULT_PATH : LOGIN_PATH} />
      </Switch>
   );
};

export default connect((state) => ({
   user: getAuthUser(state)
}))(AuthorizedRoute);
