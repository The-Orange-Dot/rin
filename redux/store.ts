import { configureStore, combineReducers } from "@reduxjs/toolkit";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import storage from "redux-persist/lib/storage";

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
  whitelist: ["shoppingCart"],
  blacklist: [],
};

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
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
