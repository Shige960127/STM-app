import { AsyncThunk } from "@reduxjs/toolkit";

export type Thunk = AsyncThunk<any, any, any>;
export type OnFulfilled = (state: any, payload?: any) => void;
export type OnRejected = (state: any, payload?: any) => void;
export type StatefulStore = {
  status: "initial" | "success" | "failure" | "pending";
  errors: any;
};
