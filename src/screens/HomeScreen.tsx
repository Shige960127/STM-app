import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { RootReducer } from "../../App";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Monthly from "@screens/Monthly";
import Year from "@screens/Year";
import Weekly from "@screens/Weekly";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Tab = createMaterialTopTabNavigator();
const HomeTopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Weekly">
      <Tab.Screen name="Weekly" component={Weekly} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Year" component={Year} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  console.log("ユーザー情報：", user);
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("m-4 p-2 w-full h-24 bg-yellow-200")}>
        <Text style={tailwind("text-2xl font-bold")}>Total Time</Text>
        <Text>totalの学習時間を記載します。</Text>
      </View>
      <View style={tailwind("items-center")}>
        <Text style={tailwind("text-2xl font-bold")}>本日の学習時間</Text>
      </View>
      <HomeTopTabs />
      <View style={tailwind("flex items-center justify-center mt-8")}>
        <TouchableOpacity
          onPress={() => dispatch(handleSignOut())}
          style={tailwind(
            "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
          )}
        >
          <Text style={tailwind("text-white font-bold")}>SignOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
