import { useTailwind } from "tailwind-rn/dist";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Timer from "@components/Timer";
import Category from "@components/SerCategory";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Timer">;

const TimerScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>Timerデータを表示します</Text>
      </View>
      <View>
        <Category />
      </View>
      <Timer />
    </SafeAreaView>
  );
};
export default TimerScreen;
