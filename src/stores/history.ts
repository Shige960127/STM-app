import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
  Timestamp,
  serverTimestamp,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export type History = {
  id: string;
  user_id: string;
  primary_id: string;
  primary_name: string;
  secondary_id: string;
  secondary_name: string;
  tertiary_id?: string;
  tertiary_name?: string;
  measuring_time: string;
  created_at: Timestamp;
};

export type HistoryState = {
  histories: {
    dayly: History[];
    monthly: History[];
    yearly: History[];
    all: History[];
  };
  status: "initial" | "success" | "failure" | "pending";
  errors?: string;
};

type createHistory = {
  userId: string;
  primaryId: string;
  primaryName: string;
  secondaryId: string;
  secondaryName: string;
  tertiaryId?: string;
  tertiaryName?: string;
  measuringTime: number;
};

const historiesRef = collection(db, "histories");
export const createHistory = createAsyncThunk(
  "createHistory",
  async (data: createHistory, { rejectWithValue }) => {
    const id = uuidv4();
    try {
      await setDoc(doc(historiesRef, id), {
        id: id,
        user_id: data.userId,
        primary_id: data.primaryId,
        primary_name: data.primaryName,
        secondary_id: data.secondaryId,
        secondary_name: data.secondaryName,
        tertiary_id: data.tertiaryId ? data.tertiaryId : "undefined",
        tertiary_name: data.tertiaryName ? data.tertiaryName : "undefined",
        measuring_time: data.measuringTime,
        created_at: serverTimestamp(),
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getDaylyHistories = createAsyncThunk(
  "getDaylyHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const startDay = new Date();
      startDay.setHours(0);
      startDay.setMinutes(0);
      startDay.setSeconds(0);
      const q = query(
        historiesRef,
        where("user_id", "==", userId),
        orderBy("created_at", "desc"),
        startAt(startDay)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const getMonthlyHistories = createAsyncThunk(
  "getMonthlyHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0);
      startOfMonth.setTime(startOfMonth.getTime() + 1000 * 60 * 60 * 9);
      startOfMonth.setMinutes(0);
      startOfMonth.setSeconds(0);
      startOfMonth.setMilliseconds(0);
      const q = query(
        historiesRef,
        where("user_id", "==", userId),
        orderBy("created_at", "desc"),
        startAt(startOfMonth)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
export const getYearlyHistories = createAsyncThunk(
  "getYearlyHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const startOfYear = new Date();
      startOfYear.setMonth(0);
      startOfYear.setDate(1);
      startOfYear.setHours(0);
      startOfYear.setTime(startOfYear.getTime() + 1000 * 60 * 60 * 9);
      startOfYear.setMinutes(0);
      startOfYear.setSeconds(0);
      const q = query(
        historiesRef,
        where("user_id", "==", userId),
        orderBy("created_at", "desc"),
        startAt(startOfYear)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
export const getAllHistories = createAsyncThunk(
  "getAllHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const q = query(historiesRef, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
export const hiostory = createSlice({
  name: "hiostory",
  initialState: <HistoryState>{
    histories: {
      dayly: [],
      monthly: [],
      yearly: [],
      all: [],
    },
    status: "initial",
    errors: undefined,
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<HistoryState>) => {
    builder.addCase(createHistory.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(
      createHistory.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
    builder.addCase(
      getDaylyHistories.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.histories.dayly = payload;
        state.status = "success";
      }
    );
    builder.addCase(getDaylyHistories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getDaylyHistories.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
    builder.addCase(
      getMonthlyHistories.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.histories.monthly = payload;
        state.status = "success";
      }
    );
    builder.addCase(getMonthlyHistories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getMonthlyHistories.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
    builder.addCase(
      getYearlyHistories.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.histories.yearly = payload;
        state.status = "success";
      }
    );
    builder.addCase(getYearlyHistories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getYearlyHistories.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
    builder.addCase(
      getAllHistories.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.histories.all = payload;
        state.status = "success";
      }
    );
    builder.addCase(getAllHistories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getAllHistories.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
  },
});

export default hiostory.reducer;
