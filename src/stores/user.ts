import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
} from "firebase/firestore";

export type user = {
  name: string;
  email: string;
};
export type UserState = {
  user: user | null;
  isLogined: boolean;
  status: "initial" | "success" | "failure" | "pending";
};

const auth = getAuth();
const usersRef = collection(db, "users");

export const handleSignUp = createAsyncThunk(
  "handleSignUp",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        "サインアップが完了しました。サインアップしたユーザのIDは" + user.uid
      );
      await setDoc(doc(usersRef, user.uid), {
        id: user.uid,
        email: email,
        password: password,
      });
      alert("Document written with ID:" + user.uid);
    } catch (error) {
      alert(error);
    }
  }
);

export const getUser = createAsyncThunk("getUser", async (userID: string) => {
  const userRef = doc(db, "users", userID);
  const user = await getDoc(userRef);
  return user.data();
});

export const checkLogin = createAsyncThunk(
  "checkLogin",
  async (_, { dispatch }) => {
    try {
      onAuthStateChanged(auth, async (u) => {
        if (u) {
          return dispatch(getUser(u.uid));
        }
      });
    } catch (error) {
      alert(error);
      return null;
    }
    return null;
  }
);

export const handleSignIn = createAsyncThunk(
  "handleSignIn",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        return true;
      }
    } catch (error) {
      alert(error);
    }
    return false;
  }
);

export const handleSignOut = createAsyncThunk("handleSignOut", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
});

export const user = createSlice({
  name: "user",
  initialState: <UserState>{
    user: null,
    isLogined: false,
    status: "initial",
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    // signIn　関数が成功した時
    builder.addCase(
      handleSignIn.fulfilled,
      (state, { payload }: { payload: boolean }) => {
        state.isLogined = payload;
        state.status = "success";
      }
    );
    // signIn　関数の実行中
    builder.addCase(handleSignIn.pending, (state) => {
      state.status = "pending";
    });
    // signIn　関数が失敗した時
    builder.addCase(handleSignIn.rejected, (state) => {
      state.status = "failure";
    });
    // getUser　関数が成功した時
    builder.addCase(
      getUser.fulfilled,
      (state, { payload }: { payload: DocumentData | undefined }) => {
        console.log({ payload });
        state.user = payload;
        state.isLogined = Boolean(payload);
        state.status = "success";
      }
    );
    //  checkLogin関数が成功した時
    builder.addCase(
      checkLogin.fulfilled,
      (state, { payload }: { payload: user | null }) => {
        console.log({ payload });
        (state.user = payload), state.isLogined, (state.status = "success");
      }
    );
    // checkLogin関数の実行中
    builder.addCase(checkLogin.pending, (state) => {
      state.status = "pending";
    });
    //checklogin関数が失敗した時
    builder.addCase(checkLogin.rejected, (state) => {
      state.status = "failure";
    });
    // signOut　関数の実行中　関数が成功した時
    builder.addCase(handleSignOut.fulfilled, (state) => {
      state.isLogined = false;
      state.status = "success";
    });
    // signOut　関数の実行中
    builder.addCase(handleSignOut.pending, (state) => {
      state.status = "pending";
    });
    // getUser　関数が失敗した時
    builder.addCase(handleSignOut.rejected, (state) => {
      state.status = "failure";
    });
  },
});
export default user.reducer;
