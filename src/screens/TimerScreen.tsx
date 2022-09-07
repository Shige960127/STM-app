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
import Category from "@components/SetCategory";
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
      <View style={tailwind("flex items-center justify-center mt-8")}>
        <TouchableOpacity
          // onPress={() => }
          style={tailwind(
            "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
          )}
        >
          <Text style={tailwind("text-white font-bold")}>計測時間を保存</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default TimerScreen;
