import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

type History = {
  id: string;
  user_id: string;
  primary_id: string;
  secondary_id: string;
  tertiary_id?: string;
  measuring_time: string;
  created_at: Date;
};

type HistoryState = {
  histories: History[];
  status: "initial" | "success" | "failure" | "pending";
  errors?: string;
};

type createHistory = {
  userID: string;
  primaryID: string;
  secondaryID: string;
  tertiaryID?: string;
  measuringTime: number;
};

const historiesRef = collection(db, "histories");

export const createHistories = createAsyncThunk(
  "createHistories",
  async (data: createHistory, { rejectWithValue }) => {
    const id = uuidv4();
    try {
      await setDoc(doc(historiesRef, id), {
        id: id,
        user_id: data.userID,
        primary_id: data.primaryID,
        secondary_id: data.secondaryID,
        tertiary_id: data.tertiaryID ? data.tertiaryID : "undefined",
        measuring_time: data.measuringTime,
        created_at: new Date(),
      });
    } catch (e) {
      alert(e);
    }
  }
);

export const histories = createSlice({
  name: "histories",
  initialState: <HistoryState>{
    histories: [],
    status: "initial",
    errors: undefined,
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<HistoryState>) => {
    builder.addCase(createHistories.fulfilled, (state) => {
      state.status = "success";
    });
  },
});

// export const { setPrimary, setSecondary } = histories.actions;

export default histories.reducer;
