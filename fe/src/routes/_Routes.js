import React from "react";
import * as PATH from "~/configs/routesConfig";
import Homepage from "~/views/container/Homepage";

export default [
   // Cần auth mới vào được thì khai báo ở đây
   {
      path: PATH.HOME_PAGE,
      component: () => <Homepage />,
      exact: true
   }
];
