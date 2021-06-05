import React, { useEffect, useState } from "react";
import AOS from "aos";
import * as PATH from "~/configs/routesConfig";
import { useHistory } from "react-router";
import { ROLES } from "./configs";
function HOCAdmin(props) {
   useEffect(() => {
      // below listed default settings
      AOS.init({
         duration: 700, // values from 0 to 3000, with step 50ms
         once: false // whether animation should happen only once - while scrolling down
      });
      AOS.refresh();
   }, []);
   const history = useHistory();
   useEffect(() => {
      if (props.user?.role !== ROLES.administrator) {
         history.push(PATH.APP_DEFAULT_PATH);
      }
   }, [props.user?.role]);

   return <div>{props.children}</div>;
}

export default HOCAdmin;
