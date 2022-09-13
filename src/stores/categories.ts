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
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

type SelectCategory = {
  primary: string;
  secondary: string;
};

export type PrimaryCategory = {
  id: string;
  name: string;
};

export type CategoryState = {
  primaryCategories: PrimaryCategory[];
  selectCategory: SelectCategory;
  status: "initial" | "success" | "failure" | "pending";
};

const primariesRef = collection(db, "primaries");

export const createPrimary = createAsyncThunk(
  "createPrimary",
  async ({ primary, userId }: { primary: string; userId: string }) => {
    const id = uuidv4();
    try {
      await setDoc(doc(primariesRef, id), {
        id: id,
        name: primary,
        user_id: userId,
      });
    } catch (e) {
      alert(e);
    }
  }
);

export const getPrimaries = createAsyncThunk(
  "getPrimaries",
  async ({ userID }: { userID: string }) => {
    try {
      const q = query(primariesRef, where("user_id", "==", userID));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.log(e);
    }
  }
);

export const categories = createSlice({
  name: "categories",
  initialState: <CategoryState>{
    primaryCategories: [],
    selectCategory: {
      primary: "",
      secondary: "",
    },
    status: "initial",
  },
  reducers: {
    setPrimary(state, { payload }: { payload: string }) {
      state.selectCategory.primary = payload;
    },
    setSecondary(state, { payload }: { payload: string }) {
      state.selectCategory.secondary = payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder.addCase(createPrimary.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(createPrimary.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getPrimaries.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.primaryCategories = payload;
        state.status = "success";
      }
    );
  },
});

export const { setPrimary } = categories.actions;
export const { setSecondary } = categories.actions;

export default categories.reducer;
