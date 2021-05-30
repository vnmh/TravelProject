import React, { useEffect, useState } from "react";
import AOS from "aos";
function HOC(props) {
   useEffect(() => {
      // below listed default settings
      AOS.init({
         duration: 700, // values from 0 to 3000, with step 50ms
         once: false // whether animation should happen only once - while scrolling down
      });
      AOS.refresh();
   }, []);
   return <div>{props.children}</div>;
}

export default HOC;
