import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ToastProvider } from "react-toast-notifications";

import AppRouter from "./routes";
import { LocaleWrapper } from "./views/container/commons";
import store, { persistor } from "./state/store";

class App extends React.Component {
   async componentDidMount() {
      [
         "./static/js/jquery-3.4.1.min.js",
         "./static/js/jquery-ui.js",
         "./static/js/jquery.countTo.min.js",
         "./static/js/jquery.fancybox.min.js",
         "./static/js/jquery.multi-file.min.js",
         "./static/js/jquery.plugin.js",
         "./static/js/jquery.ripples-min.js",
         "./static/js/jquery.sparkline.js",
         "./static/js/jquery.superslides.min.js",
         "./static/js/popper.min.js",
         "./static/js/bootstrap.min.js",
         "./static/js/bootstrap-select.min.js",
         "./static/js/moment.min.js",
         "./static/js/owl.carousel.min.js",
         "./static/js/ajax-form.js",
         "./static/js/animated-headline.js",
         "./static/js/bar-chart.js",
         "./static/js/chart.extension.js",
         "./static/js/chart.js",
         "./static/js/ckeditor.js",
         "./static/js/copy-text-script.js",
         "./static/js/countdown.js",
         "./static/js/custom-maps.js",
         "./static/js/dashboard.js",
         "./static/js/daterangepicker.js",
         "./static/js/leaflet.js",
         "./static/js/line-chart.js",
         "./static/js/main-rtl.js",
         "./static/js/map-add.js",
         "./static/js/map.js",
         "./static/js/masonry-4.2.2.min.js",
         "./static/js/navbar-sticky.js",
         "./static/js/particles-script.js",
         "./static/js/particles.min.js",
         "./static/js/quantity-input.js",
         "./static/js/sparklines-chart-1.js",
         "./static/js/superslider-script.js",
         "./static/js/total-price.js",
         "./static/js/waypoints.min.js",
         "./static/js/wow.js",
         "./static/js/main.js"
      ].map((item) => {
         const script = document.createElement("script");
         script.src = item;
         script.async = true;
         document.body.appendChild(script);
      });
   }

   render() {
      return (
         <ToastProvider>
            <ReduxProvider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                  <LocaleWrapper>
                     <AppRouter {...this.props} />
                  </LocaleWrapper>
               </PersistGate>
            </ReduxProvider>
         </ToastProvider>
      );
   }
}

export default App;
