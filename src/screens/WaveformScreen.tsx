import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Waveform">;

const WaveformScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>波形データを表示します</Text>
      </View>
    </SafeAreaView>
  );
};
export default WaveformScreen;
