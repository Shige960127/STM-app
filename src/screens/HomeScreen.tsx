import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TotalTime from "@components/TotalTime";

import Monthly from "@components/Monthly";
import Yearly from "@components/Yearly";
import All from "@components/All";
import Daily from "@components/Daily";

const Tab = createMaterialTopTabNavigator();
const HomeTopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Daily">
      <Tab.Screen name="Daily" component={Daily} />
      <Tab.Screen name="Monthly" component={Monthly} />
      <Tab.Screen name="Yearly" component={Yearly} />
      <Tab.Screen name="All" component={All} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const tailwind = useTailwind();
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
