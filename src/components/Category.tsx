import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View, Switch } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParamList, RootReducer } from "../../App";

export type Item = {
  destination: "Primary" | "Secondary" | "Tertiary";
  title: string;
  isVisble: boolean;
  value?: string;
};
const Item = ({ item, onPress }: { item: Item; onPress: () => void }) => {
  const tailwind = useTailwind();
  return (
    <>
      <TouchableOpacity
        style={tailwind("bg-violet-500 border border-black p-2")}
        onPress={onPress}
        disabled={!item.isVisble}
      >
        {item.isVisble && (
          <Text style={tailwind("text-center text-2xl font-bold text-white")}>
            {item.title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const Category = () => {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, "Primary" | "Secondary" | "Tertiary">
    >();
  const {
    selectCategory: { primary, secondary, tertiary },
  } = useSelector(({ categories }: RootReducer) => categories);

  const DATA: Item[] = [
    {
      destination: "Primary",
      title: primary ? primary.name : "大カテゴリを選択",
      isVisble: true,
      value: primary?.id,
    },
    {
      destination: "Secondary",
      title: secondary ? secondary.name : "中カテゴリを選択",
      isVisble: true,
      value: secondary?.id,
    },
    {
      destination: "Tertiary",
      title: tertiary ? tertiary.name : "小カテゴリを選択",
      isVisble: Boolean(secondary),
      value: tertiary?.id || undefined,
    },
  ];

  return (
    <FlatList
      data={DATA.filter((data) => data.isVisble)}
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
