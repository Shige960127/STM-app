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
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type SelectCategory = {
  primary: PrimaryCategory | null;
  secondary: SecondaryCategory | null;
};

export type PrimaryCategory = {
  id: string;
  name: string;
};

export type SecondaryCategory = {
  id: string;
  name: string;
};

export type CategoryState = {
  primaryCategories: PrimaryCategory[];
  secondaryCategories: SecondaryCategory[];
  selectCategory: SelectCategory;
  status: "initial" | "success" | "failure" | "pending";
};

const primariesRef = collection(db, "primaries");
const secondariesRef = collection(db, "secondaries");

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
export const createSecondary = createAsyncThunk(
  "createSecondary",
  async ({
    secondary,
    primaryId,
  }: {
    secondary: string;
    primaryId: string;
  }) => {
    const id = uuidv4();
    try {
      await setDoc(doc(secondariesRef, id), {
        id: id,
        name: secondary,
        primary_id: primaryId,
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

export const getSecondaries = createAsyncThunk(
  "getSeconadaries",
  async ({ primaryID }: { primaryID: string }) => {
    try {
      const q = query(secondariesRef, where("primary_id", "==", primaryID));
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
    secondaryCategories: [],
    selectCategory: {
      primary: null,
      secondary: null,
    },
    status: "initial",
  },
  reducers: {
    setPrimary(state, { payload }: { payload: PrimaryCategory }) {
      state.selectCategory.primary = payload;
      state.selectCategory.secondary = null;
    },
    setSecondary(state, { payload }: { payload: SecondaryCategory }) {
      state.selectCategory.secondary = payload;
    },
    clearPrimary(state) {
      state.selectCategory.primary = null;
    },
    clearSecondary(state) {
      state.selectCategory.secondary = null;
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
    builder.addCase(createSecondary.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(createSecondary.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getSecondaries.fulfilled,
      (state, { payload }: { payload: any }) => {
        state.secondaryCategories = payload;
        state.status = "success";
      }
    );
  },
});

export const { setPrimary, setSecondary, clearPrimary, clearSecondary } =
  categories.actions;
export default categories.reducer;
