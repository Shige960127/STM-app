import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
} from "firebase/firestore";
import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export type category = {
  name: string;
};

const auth = getAuth();
const primariesRef = collection(db, "primaries");
const secondariesRef = collection(db, "secondaries");

const tailwind = useTailwind();
