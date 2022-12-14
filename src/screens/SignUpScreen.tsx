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
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;
type user = {
  email: string;
  password: string;
  age: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const [user, setUser] = useState<user>({ email: "", password: "", age: "" });
  const update =
    (field: keyof user) =>
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (user) setUser({ ...user, [field]: e.nativeEvent.text });
    };
  return (
    <LinearGradient colors={["#17d9aa", "#3e17d9"]}>
      <SafeAreaView style={tailwind("flex")}>
        <View style={tailwind("items-center m-4 p-4")}>
          <Text style={tailwind("text-2xl font-bold text-white mt-6")}>
            アカウントを作成しましょう！
          </Text>
        </View>
        <View style={tailwind("flex my-4 py-4 h-full rounded-t-3xl")}>
          <View style={tailwind("m-4")}>
            <View>
              <View
                style={tailwind(
                  "flex flex-row items-center border-b-2 border-white m-1 p-1"
                )}
              >
                <AntDesign
                  name="mail"
                  size={24}
                  color="white"
                  style={tailwind("mr-4")}
                />
                <View style={tailwind("flex-1")}>
                  <TextInput
                    style={tailwind("w-full h-8 p-2")}
                    onChange={update("email")}
                    value={user?.email}
                    autoCapitalize={"none"}
                    placeholder="E-mail"
                    placeholderTextColor={`#ffffff`}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={tailwind(
                  "flex flex-row items-center border-b-2 border-white m-1 p-1"
                )}
              >
                <AntDesign
                  name="lock"
                  size={24}
                  color="white"
                  style={tailwind("mr-4")}
                />
                <View style={tailwind("flex-1")}>
                  <TextInput
                    style={tailwind("w-full h-8 p-2")}
                    onChange={update("password")}
                    value={user?.password}
                    autoCapitalize={"none"}
                    placeholder="Password"
                    placeholderTextColor={`#ffffff`}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={tailwind(
                  "flex flex-row items-center border-b-2 border-white m-1 p-1"
                )}
              >
                <AntDesign
                  name="user"
                  size={24}
                  color="white"
                  style={tailwind("mr-4")}
                />
                <View style={tailwind("flex-1")}>
                  <TextInput
                    style={tailwind("w-full h-8 p-2")}
                    onChange={update("age")}
                    value={user?.age}
                    autoCapitalize={"none"}
                    placeholder="西暦で年齢を入力してください"
                    placeholderTextColor={`#ffffff`}
                  />
                </View>
              </View>
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
              style={tailwind(
                "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
              )}
            >
              <Text style={tailwind("text-white font-bold")}>
                サインイン画面へ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUpScreen;
