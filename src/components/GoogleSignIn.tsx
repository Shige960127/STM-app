import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";

import { signOut } from "firebase/auth";
import { TouchableOpacity, View, Text } from "react-native";
import firebase from "firebase/";

const GoogleSignIn = () => {
  const auth = getAuth();
  const [user];
  firebase.onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("google Authentication");
    }
  });
};

export default GoogleSignIn;
