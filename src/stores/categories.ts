import { createSlice } from "@reduxjs/toolkit";

type Categories = {
  primary: string;
  secondary: string;
};

export type CategoryState = {
  categories: Categories;
  status: "initial" | "success" | "failure" | "pending";
};

export const categories = createSlice({
  name: "categories",
  initialState: <CategoryState>{
    categories: {
      primary: "",
      secondary: "",
    },
    status: "initial",
  },
  reducers: {
    setPrimary(state, { payload }: { payload: string }) {
      state.categories.primary = payload;
    },
    setSecondary(state, { payload }: { payload: string }) {
      state.categories.secondary = payload;
    },
  },
  extraReducers: {},
});

export const { setPrimary } = categories.actions;
export const { setSecondary } = categories.actions;

export default categories.reducer;
