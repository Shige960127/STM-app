import { ScrollView, View, SafeAreaView } from "react-native";
import Initial from "@components/Analize/Initial";
import { useTailwind } from "tailwind-rn/dist";

const AnalizeScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView style={tailwind("flex-1")} horizontal={true}>
        <Initial />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalizeScreen;
