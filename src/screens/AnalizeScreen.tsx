import { SafeAreaView, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WeeklyAnalize from "@components/WeeklyAnalize";
import MonthlyAnalize from "@components/MonthlyAnalize";
import YealyAnalize from "@components/YealyAnalize";
import { useTailwind } from "tailwind-rn/dist";

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Weekly">
      <Tab.Screen name="Weekly" component={WeeklyAnalize} />
      <Tab.Screen name="Monthly" component={MonthlyAnalize} />
      <Tab.Screen name="Yearly" component={YealyAnalize} />
    </Tab.Navigator>
  );
};

const AnalizeScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <TopTabs />
    </SafeAreaView>
  );
};

export default AnalizeScreen;
