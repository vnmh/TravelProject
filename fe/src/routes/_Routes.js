import React from "react";
import * as PATH from "~/configs/routesConfig";
import Dashboard from "~/views/container/Dashboard";

export default [
   {
      path: PATH.DASHBOARD_PATH,
      component: () => <Dashboard />,
      exact: true
   }
];
