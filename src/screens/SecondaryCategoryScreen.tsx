import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import PlusButton from "@components/PlusButton";

type SecondaryCategory = {
  id: string;
  name: string;
};

const SecondaryCategories: SecondaryCategory[] = [
  { id: "1", name: "英語2" },
  { id: "2", name: "プログラミング" },
  { id: "3", name: "野球" },
  { id: "4", name: "野球" },
  { id: "5", name: "野球" },
  { id: "6", name: "野球" },
  { id: "7", name: "野球" },
  { id: "8", name: "野球" },
  { id: "9", name: "野球" },
  { id: "10", name: "野球" },
  { id: "11", name: "野球" },
  { id: "12", name: "野球" },
  { id: "13", name: "野球" },
];

const Item = ({ item }: { item: SecondaryCategory }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-blue-900 p-4")}>
      <Text style={tailwind("text-lg text-white")}>{item.name}</Text>
    </View>
  );
};
export default () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={SecondaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
      <PlusButton />
    </SafeAreaView>
  );
};
