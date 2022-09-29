import { Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";

// const TEST = ({ item }: { item: History }) => {
//   const tailwind = useTailwind();
//   return <Text>{item}</Text>;
// };

const DATA = [
  {
    id: "1",
    title: "アイテム1",
  },
  {
    id: "2",
    title: "アイテム2",
  },
  {
    id: "3",
    title: "アイテム3",
  },
];

const Item = ({ title }: { title: string }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("m-2 p-1 w-full h-24 bg-yellow-200")}>
      <Text style={tailwind("text-2xl font-bold")}>{title}</Text>
    </View>
  );
};

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  useEffect(() => {
    dispatch(getHistories({ userId: user!.id }));
  }, []);
  // ↓データが取れているはずなのでこのhistoriesを使ってFlatListを表示してみてください！
  // const { histories, status } = useSelector(
  //   ({ histories }: RootReducer) => histories
  // );
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={(item) => item.id}
    />
  );
};
