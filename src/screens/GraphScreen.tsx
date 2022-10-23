import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WeeklyAnalize from "@components/WeeklyAnalize";
import MonthlyAnalize from "@components/MonthlyAnalize";
import YealyAnalize from "@components/YealyAnalize";

// type Props = NativeStackScreenProps<RootStackParamList, "Graph">;
const Tab = createMaterialTopTabNavigator();
const AnalizeTopTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Weekly">
      <Tab.Screen name="Weekly" component={WeeklyAnalize} />
      <Tab.Screen name="Monthly" component={MonthlyAnalize} />
      <Tab.Screen name="Yearly" component={YealyAnalize} />
    </Tab.Navigator>
  );
};
const GraphScreen = () => {
  const tailwind = useTailwind();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    selectCategory: { primary, secondary },
  } = useSelector(({ categories }: RootReducer) => categories);
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <AnalizeTopTabs />
    </SafeAreaView>
  );
};
export default GraphScreen;
