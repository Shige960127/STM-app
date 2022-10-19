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
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Thunk, OnFulfilled, OnRejected, StatefulStore } from "@types";
import { resetStatusThunk } from "./utils";

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

export type HistoryState = StatefulStore & {
  histories: {
    daily: History[];
    weekly: History[];
    monthly: History[];
    yearly: History[];
  };
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

export const getDailyHistories = createAsyncThunk(
  "getDailyHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const q = query(historiesRef, where("user_id", "==", userId));
      // const getWeekData = query(historiesRef, where("created_at","==",created_at));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getWeekHistories = createAsyncThunk(
  "getWeekHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const q = query(historiesRef, where("user_id", "==", userId));
      // const getWeekData = query(historiesRef, where("created_at","==",created_at));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const onGetDailyHistories = (
  state: HistoryState,
  { payload }: { payload: History[] }
) => {
  state.histories.daily = payload;
};

const onGetWeeklyHistories = (
  state: HistoryState,
  { payload }: { payload: History[] }
) => {
  state.histories.weekly = payload;
};

const thunks: Array<[Thunk, OnFulfilled?, OnRejected?]> = [
  [getDailyHistories, onGetDailyHistories],
  [getWeekHistories, onGetWeeklyHistories],
];

export const hiostory = createSlice({
  name: "hiostory",
  initialState: <HistoryState>{
    histories: {
      daily: [],
      weekly: [],
      monthly: [],
      yearly: [],
    },
    status: "initial",
    errors: undefined,
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<HistoryState>) => {
    thunks.forEach(([thunk, onFulfilled, OnRejected]) =>
      resetStatusThunk(builder, thunk, onFulfilled, OnRejected)
    );
  },
});

export default hiostory.reducer;
