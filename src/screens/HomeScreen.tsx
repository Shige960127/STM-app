import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { handleSignOut } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TotalTime from "@components/TotalTime";

import Monthly from "@components/Monthly";
import Year from "@components/Year";
import All from "@components/All";
import Dayly from "@components/Dayly";

const Tab = createMaterialTopTabNavigator();
const HomeTopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Dayly">
      <Tab.Screen name="Dayly" component={Dayly} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Year" component={Year} />
      <Tab.Screen name="All" component={All} />
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
        <Text style={tailwind("text-2xl font-bold m-1 p-1")}>
          学習時間グラフ
        </Text>
      </View>
      <HomeTopTabs />
    </SafeAreaView>
  );
};
export default HomeScreen;
