import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";

import { signOut } from "firebase/auth";
import { TouchableOpacity, View, Text } from "react-native";

const GoogleSignIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const clickLogin = function () {
    signInWithRedirect(auth, provider);
  };
  //
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
        if (result !== null) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          console.log(user.uid);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.error(errorCode);
        console.error(errorMessage);
        console.error(email);
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, []);

  const checkLogint = function () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log(uid);
        console.log(email);
      } else {
        console.log("signed out");
      }
    });
  };
  checkLogint();
  const clickLogout = async function () {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました");
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };

  return (
    <View>
      <Text>ログイン Google</Text>
      <View>
        <TouchableOpacity onPress={() => clickLogin()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => clickLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleSignIn;
