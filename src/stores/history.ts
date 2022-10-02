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
} from "firebase/firestore";
import { db } from "../firebase/firebase";
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
  created_at: Date;
};

export type HistoryState = {
  histories: History[];
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
  "createHistories",
  async (data: createHistory, { rejectWithValue }) => {
    const id = uuidv4();
    try {
      await setDoc(doc(historiesRef, id), {
        user_id: data.userId,
        primary_id: data.primaryId,
        primary_name: data.primaryName,
        secondary_id: data.secondaryId,
        secondary_name: data.secondaryName,
        tertiary_id: data.tertiaryId ? data.tertiaryId : "undefined",
        tertiary_name: data.tertiaryName ? data.tertiaryName : "undefined",
        measuring_time: data.measuringTime,
        created_at: new Date(),
      });
    } catch (e) {
      alert(e);
    }
  }
);

export const getHistories = createAsyncThunk(
  "getHistories",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const q = query(historiesRef, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const hiostory = createSlice({
  name: "hiostory",
  initialState: <HistoryState>{
    histories: [],
    status: "initial",
    errors: undefined,
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<HistoryState>) => {
    builder.addCase(createHistory.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(
      getHistories.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.histories = payload;
        state.status = "success";
      }
    );
    builder.addCase(getHistories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getHistories.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = "failure";
        state.errors = payload;
      }
    );
  },
});

export default hiostory.reducer;
