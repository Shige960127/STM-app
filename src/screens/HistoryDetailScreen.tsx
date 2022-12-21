import { View, Text, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryDetail">;

export default ({ route }: Props) => {
  const { item } = route.params;
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("p-4")}>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Primary：{item.primary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Secondary：{item.secondary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Tertiary：{item.tertiary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Timer：{item.measuring_time}秒
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
