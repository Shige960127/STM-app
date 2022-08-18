import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../store/user";
import { AppDispatch } from "../store/index";
import { RootReducer } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  console.log("ユーザー情報：", user);
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>Email:{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(handleSignOut())}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
