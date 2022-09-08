import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import categories from "./categories";

const store = configureStore({
  reducer: {
    user,
    categories,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
