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
import { handleSignUp } from "../store/user";
import { AppDispatch } from "../store/index";
import { useDispatch } from "react-redux";

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
    <SafeAreaView style={tailwind("flex-1 bg-stone-200")}>
      <View style={tailwind("bg-white w-3/4 h-2/4 mt-20 ml-12 pt-2 pl-2")}>
        <View style={tailwind("items-center m-4 p-4")}>
          <Text style={tailwind("text-2xl font-bold")}>Sign Up</Text>
        </View>
        <View style={tailwind("")}>
          <View>
            <Text>Email:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={update("email")}
            value={user?.email}
            autoCapitalize={"none"}
          />
        </View>
        <View>
          <View>
            <Text>Password:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={update("password")}
            value={user?.password}
            autoCapitalize={"none"}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={() => dispatch(handleSignUp({ ...user }))}>
          <Text>サインアップする</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text>すでにアカウントをお持ちの方はこちらをクリック</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
