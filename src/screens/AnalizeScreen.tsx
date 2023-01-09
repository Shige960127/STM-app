import { SafeAreaView, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MonthlyAnalize from "@components/Analize/MonthlyAnalize";
import YearlyAnalize from "@components/Analize/YearlyAnalize";
import { useTailwind } from "tailwind-rn/dist";

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Monthly">
      <Tab.Screen name="Monthly" component={MonthlyAnalize} />
      <Tab.Screen name="Yearly" component={YearlyAnalize} />
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
