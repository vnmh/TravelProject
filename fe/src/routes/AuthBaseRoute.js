import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { compose } from "recompose";

const AuthBaseRoute = ({ routes, redirectURL, sidebarMenu }) => {
   return (
      <div>
         <Switch>
            {routes.map((r) => {
               const exact = r.exact || false;
               return <Route path={r.path} component={r.component} exact={exact} key={r.path} />;
            })}
            <Redirect to={redirectURL} />
         </Switch>
      </div>
   );
};

export default compose()(AuthBaseRoute);
