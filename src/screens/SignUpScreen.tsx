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
    <SafeAreaView style={tailwind("flex bg-violet-800")}>
      <View style={tailwind("items-center m-4 p-4")}>
        <Text style={tailwind("text-2xl font-bold text-white")}>
          Create an Account!
        </Text>
      </View>
<<<<<<< HEAD
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
=======
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
>>>>>>> fde29f48c8f027f4603e31bc3bb348feec17632c
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
<<<<<<< HEAD
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
                  onChange={update("password")}
                  value={user?.password}
                  autoCapitalize={"none"}
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tailwind("text-lg font-bold")}>Age</Text>
            <View style={tailwind("flex flex-row items-center")}>
              <AntDesign
                name="user"
                size={24}
                color="black"
                style={tailwind("mr-4")}
              />
              <View style={tailwind("flex-1")}>
                <TextInput
                  style={tailwind("w-full h-8 border rounded p-2")}
                  onChange={update("age")}
                  value={user?.age}
                  autoCapitalize={"none"}
                  placeholder="西暦で年齢を入力してください"
                />
              </View>
            </View>
          </View>
        </View>
=======
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

>>>>>>> fde29f48c8f027f4603e31bc3bb348feec17632c
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
<<<<<<< HEAD
            style={tailwind(
              "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
            )}
          >
            <Text style={tailwind("text-white font-bold")}>
              サインイン画面へ
            </Text>
=======
            style={tailwind("mt-2")}
          >
            <Text>すでにアカウントをお持ちの方はこちらをクリック</Text>
>>>>>>> fde29f48c8f027f4603e31bc3bb348feec17632c
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
