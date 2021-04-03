import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ToastProvider } from "react-toast-notifications";

import AppRouter from "./routes";
import { LocaleWrapper } from "./views/container/commons";
import store, { persistor } from "./state/store";
class App extends React.Component {
   async componentDidMount() {
      ["./static/js/main.js"].map((item) => {
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
