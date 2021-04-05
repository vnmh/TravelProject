import React from "react";
import * as PATH from "~/configs/routesConfig";
import Dashboard from "~/views/container/Dashboard";

export default [
   // Cần auth mới vào được thì khai báo ở đây
   {
      path: PATH.DASHBOARD,
      component: () => <Dashboard />,
      exact: true
   }
];
