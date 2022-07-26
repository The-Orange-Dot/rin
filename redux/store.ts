import { configureStore, combineReducers } from "@reduxjs/toolkit";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import storage from "redux-persist/lib/storage";
import guestAddresReducer from "./reducers/guestAddresReducer";
import productsFilterReducer from "./reducers/productsFilterReducer";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["shoppingCart", "guestShipping"],
  blacklist: ["productFilter"],
};

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  guestShipping: guestAddresReducer,
  productFilter: productsFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
