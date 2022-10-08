import { Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const { histories } = useSelector(({ history }: RootReducer) => history);

  useEffect(() => {
    dispatch(getHistories({ userId: user!.id }));
  }, []);

  const rendeItem = ({ item }: { item: History }) => (
    <View style={tailwind("m-2 p-1 w-full h-24 bg-yellow-200")}>
      <Text style={tailwind("text-2xl font-bold")}>{item.primary_name}</Text>
    </View>
  );

  return (
    <FlatList
      data={histories}
      renderItem={rendeItem}
      keyExtractor={(item) => item.id}
    />
  );
};
