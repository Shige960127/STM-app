import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { handleSignUp } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;
type user = {
  email: string;
  password: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const [user, setUser] = useState<user>({ email: "", password: "" });
  const update =
    (field: keyof user) =>
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (user) setUser({ ...user, [field]: e.nativeEvent.text });
    };
  return (
    <SafeAreaView style={tailwind("flex bg-violet-800")}>
      <View style={tailwind("items-center m-4 p-4")}>
        <Text style={tailwind("text-2xl font-bold text-white")}>
          Create an Account!
        </Text>
      </View>
      <View style={tailwind("flex bg-white my-4 py-4 h-full rounded-t-3xl")}>
        <View style={tailwind("ml-1 pl-1")}>
          <View style={tailwind("mt-4 ml-1 pt-4 pl-1")}>
            <Text style={tailwind("text-lg font-bold")}>Email</Text>
            <View style={tailwind("flex")}>
              <View>
                <FontAwesome name="user-circle-o" size={24} color="black" />
              </View>
              <View>
                <TextInput
                  style={tailwind("w-40 h-8 border rounded")}
                  onChange={update("email")}
                  value={user?.email}
                  autoCapitalize={"none"}
                  placeholder="E-mail"
                />
              </View>
            </View>
          </View>
          <View style={tailwind("flex ml-1 pl-1")}>
            <FontAwesome />
            <Text style={tailwind("text-lg font-bold")}>Password</Text>
            <TextInput
              style={tailwind("w-80 h-8 border rounded")}
              onChange={update("password")}
              value={user?.password}
              autoCapitalize={"none"}
              placeholder="Password"
              secureTextEntry
            />
          </View>
        </View>
        <View style={tailwind("items-center mt-4 pt-4")}>
          <View
            style={tailwind("items-center w-60 h-10 rounded-2xl bg-sky-400")}
          >
            <TouchableOpacity
              onPress={() => dispatch(handleSignUp({ ...user }))}
            >
              <Text style={tailwind("text-white font-bold")}>
                サインアップする
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text>すでにアカウントをお持ちの方はこちらをクリック</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
