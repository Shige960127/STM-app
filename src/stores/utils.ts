import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { StatefulStore, OnFulfilled, OnRejected, Thunk } from "@types";

export function resetStatusThunk(
  builder: ActionReducerMapBuilder<any>,
  thunk: Thunk,
  onFulfilled: OnFulfilled = () => {},
  onRejected: OnRejected = () => {}
) {
  builder.addCase(thunk.rejected, (state: StatefulStore, { payload }: any) => {
    onRejected(state, payload);
    state.status = "failure";
    if (typeof payload === "string") state.errors = payload;
    if (typeof payload === "object")
      state.errors = [...(payload || []), ...state.errors];
  });
  builder.addCase(thunk.pending, (state: StatefulStore) => {
    state.status = "pending";
    state.errors = [];
  });
  builder.addCase(
    thunk.fulfilled,
    (state: StatefulStore, payload: any = {}) => {
      onFulfilled(state, payload);
      state.status = "success";
      state.errors = [];
    }
  );
}
