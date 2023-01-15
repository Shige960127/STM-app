import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { View, TouchableOpacity, Text } from "react-native";

const GoogleLogin = () => {
  const auth = getAuth();
  console.log(auth);
  const provider = new GoogleAuthProvider();
  console.log(provider);
  const clickLogin = () => {
    signInWithRedirect(auth, provider);
  };

  async () => {
    try {
      const result = await getRedirectResult(auth);
      console.log(result);
      if (result !== null) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        const user = result.user;
        console.log(user);
        console.log(user.uid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLogint = () => {
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
  const clickLogout = async () => {
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
      <TouchableOpacity onPress={() => clickLogin()}>
        <Text>Googleでサインイン</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clickLogout()}>
        <Text>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;
