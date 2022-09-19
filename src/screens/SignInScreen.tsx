import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { AntDesign } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={tailwind("flex bg-violet-800")}>
      <View style={tailwind("items-center m-4 p-4")}>
        <Text style={tailwind("text-2xl font-bold text-white")}>
          Hello Again!
        </Text>
      </View>
      <View style={tailwind("flex bg-white my-4 py-4 h-full rounded-t-3xl")}>
        <View style={tailwind("m-4")}>
          <View>
            <Text style={tailwind("text-lg font-bold")}>Email</Text>
            <View style={tailwind("flex flex-row items-center")}>
              <AntDesign
                name="mail"
                size={24}
                color="black"
                style={tailwind("mr-4")}
              />
              <View style={tailwind("flex-1")}>
                <TextInput
                  style={tailwind("w-full h-8 border rounded p-2")}
                  onChange={(e) => setEmail(e.nativeEvent.text)}
                  value={email}
                  autoCapitalize={"none"}
                  placeholder="E-mail"
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tailwind("text-lg font-bold")}>Password</Text>
            <View style={tailwind("flex flex-row items-center")}>
              <AntDesign
                name="lock"
                size={24}
                color="black"
                style={tailwind("mr-4")}
              />
              <View style={tailwind("flex-1")}>
                <TextInput
                  style={tailwind("w-full h-8 border rounded p-2")}
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                  value={password}
                  autoCapitalize={"none"}
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </View>
        <View style={tailwind("flex items-center justify-center mt-8")}>
          <TouchableOpacity
            onPress={() => dispatch(handleSignIn({ email, password }))}
            style={tailwind(
              "w-80 flex flex-row justify-center items-center p-4 rounded-2xl bg-sky-400"
            )}
          >
            <Text style={tailwind("text-white font-bold")}>サインインする</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={tailwind(
              "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
            )}
          >
            <Text style={tailwind("text-white font-bold")}>
              アカウント作成画面へ
            </Text>
          </TouchableOpacity>
          {/* <GoogleSignIn /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
