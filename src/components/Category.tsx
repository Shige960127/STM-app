import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
    <>
      <TouchableOpacity
        style={tailwind("bg-teal-500 border-2 border-black p-2")}
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
  const tailwind = useTailwind();
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, "Primary" | "Secondary">
    >();
  const {
    selectCategory: { primary, secondary },
  } = useSelector(({ categories }: RootReducer) => categories);

  const DATA: Item[] = [
    {
      destination: "Primary",
      title: primary ? primary.name : "大カテゴリを選択",
      isVisble: true,
    },
    {
      destination: "Secondary",
      title: secondary ? secondary.name : "中カテゴリを選択",
      isVisble: true,
    },
  ];
  return (
    <>
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
      <View style={tailwind("bg-teal-500 border-2 border-black p-2")}>
        <Text style={tailwind("text-center text-2xl font-bold text-white")}>
          予鈴
        </Text>
      </View>
      <View style={tailwind("bg-teal-500 border-2 border-black p-2")}>
        <Text style={tailwind("text-center text-2xl font-bold text-white")}>
          終了後もカウント
        </Text>
      </View>
    </>
  );
};

export default Category;
