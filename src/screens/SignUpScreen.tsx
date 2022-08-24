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
      <View
        style={tailwind("flex bg-white my-4 py-4 h-full rounded-t-3xl px-6")}
      >
        <View>
          <View>
            <Text style={tailwind("text-lg font-bold")}>Email</Text>
            <View style={tailwind("flex flex-row items-center")}>
              <View style={tailwind("mr-4")}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
              </View>
              <View style={tailwind("flex-1")}>
                <TextInput
                  style={tailwind("w-full h-8 border rounded p-2")}
                  onChange={update("email")}
                  value={user?.email}
                  autoCapitalize={"none"}
                  placeholder="E-mail"
                />
              </View>
            </View>
          </View>
          <View>
            <FontAwesome />
            <Text style={tailwind("text-lg font-bold")}>Password</Text>
            <TextInput
              style={tailwind("w-full h-8 border rounded p-2")}
              onChange={update("password")}
              value={user?.password}
              autoCapitalize={"none"}
              placeholder="Password"
              secureTextEntry
            />
          </View>
        </View>

        <View style={tailwind("flex items-center justify-center mt-8")}>
          <TouchableOpacity
            onPress={() => dispatch(handleSignUp({ ...user }))}
            style={tailwind(
              "w-80 flex flex-row justify-center items-center p-4 rounded-2xl bg-sky-400"
            )}
          >
            <Text style={tailwind("text-white font-bold")}>
              サインアップする
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={tailwind("mt-2")}
          >
            <Text>すでにアカウントをお持ちの方はこちらをクリック</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
