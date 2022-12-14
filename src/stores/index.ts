import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import categories from "./categories";
import history from "./history";

const store = configureStore({
  reducer: {
    user,
    categories,
    history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export default store;
