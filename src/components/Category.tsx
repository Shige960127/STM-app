import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParamList, RootReducer } from "../../App";

type Item = {
  destination: "Primary" | "Secondary";
  title: string;
  isVisble: boolean;
  value?: string;
};

const Item = ({ item, onPress }: { item: Item; onPress: () => void }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={tailwind("bg-amber-500 p-5 border-red-600 mx-4")}
      onPress={onPress}
      disabled={!item.isVisble}
    >
      {item.isVisble && <Text style={tailwind("text-4xl")}>{item.title}</Text>}
    </TouchableOpacity>
  );
};

const Category = () => {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, "Primary" | "Secondary">
    >();
  const {
    categories: { primary, secondary },
  } = useSelector(({ categories }: RootReducer) => categories);

  const DATA: Item[] = [
    {
      destination: "Primary",
      title: primary ? primary : "PrimaryCategory",
      isVisble: true,
    },
    {
      destination: "Secondary",
      title: secondary ? secondary : "SecondaryCategory",
      isVisble: true,
    },
  ];
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }: { item: Item }) => (
        <Item
          item={item}
          onPress={() => navigation.navigate(item.destination)}
        />
      )}
      keyExtractor={(_, key) => key.toString()}
    />
  );
};

export default Category;
