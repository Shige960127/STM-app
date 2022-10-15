import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { handleSignOut } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TotalTime from "@components/ TotalTime";

import Monthly from "@components/Monthly";
import Year from "@components/Year";
import Weekly from "@components/Weekly";
import Dayly from "@components/Dayly";

const Tab = createMaterialTopTabNavigator();
const HomeTopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Dayly">
      <Tab.Screen name="Dayly" component={Dayly} />
      <Tab.Screen name="Weekly" component={Weekly} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Year" component={Year} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <TotalTime />
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
