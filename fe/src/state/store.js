import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiService } from "./middlewares";
import * as reducers from "./ducks";

const persistConfig = {
   key: "root",
   storage: storage,
   whitelist: ["authUser", "appData"] // whitelist reducers
};

const configStore = () => {
   const middlewares = [apiService];
   const rootReducers = combineReducers(reducers);

   // config persistor reducer
   const pReducer = persistReducer(persistConfig, rootReducers);

   const isDevEnv = process.env.NODE_ENV === "development";

   // only log action in dev mode
   if (isDevEnv) {
      middlewares.push(createLogger());
   }

   const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

   const store = createStore(pReducer, composeEnhancer(applyMiddleware(...middlewares)));
   return store;
};

const store = configStore();

export const persistor = persistStore(store);

export default store;
