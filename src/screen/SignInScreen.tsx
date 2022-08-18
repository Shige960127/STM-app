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
import { handleSignIn } from "../store/user";
import { AppDispatch } from "../store/index";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={tailwind("flex-1 bg-stone-200")}>
      <View style={tailwind("bg-white w-3/4 h-2/4 mt-20 ml-12 pt-2 pl-2")}>
        <View style={tailwind("items-center m-4 p-4")}>
          <Text style={tailwind("text-2xl font-bold")}>Sign In</Text>
        </View>
        <View style={tailwind("")}>
          <View>
            <Text>Email:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
            autoCapitalize={"none"}
          />
        </View>
        <View>
          <View>
            <Text>Password:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
            autoCapitalize={"none"}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => dispatch(handleSignIn({ email, password }))}
        >
          <Text>サインインする</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={tailwind("text-blue-900")}>
            アカウントをお持ちでない方はこちら
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
