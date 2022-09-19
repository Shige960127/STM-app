import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import categories from "./categories";
import histories from "./history";

const store = configureStore({
  reducer: {
    user,
    categories,
    histories,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
