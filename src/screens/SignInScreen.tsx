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
import { LinearGradient } from "expo-linear-gradient";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient colors={["#17d9aa", "#3e17d9"]}>
      <SafeAreaView style={tailwind("flex")}>
        <View style={tailwind("items-center m-4 p-4")}>
          <Text style={tailwind("text-2xl font-bold text-white mt-6")}>
            今日も頑張りましょう！！
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
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    value={email}
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
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    value={password}
                    autoCapitalize={"none"}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor={`#ffffff`}
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
              <Text style={tailwind("text-white font-bold")}>
                サインインする
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={tailwind("text-white")}>
                パスワードを忘れてしまった方はこちらをクリック
              </Text>
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
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignInScreen;
