import { Text, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getWeekHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const tailwind = useTailwind();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);

  useEffect(() => {
    dispatch(getWeekHistories({ userId: user!.id }));
  }, []);

  const rendeItem = ({ item }: { item: History }) => (
    <View style={tailwind("m-2 p-1 w-full h-24 bg-yellow-200")}>
      <Text style={tailwind("text-2xl font-bold")}>{item.primary_name}</Text>
      <Text style={tailwind("text-2xl font-bold")}>{item.measuring_time}</Text>
    </View>
  );

  return (
    <FlatList
      data={weekly}
      renderItem={rendeItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => dispatch(getWeekHistories({ userId: user!.id }))}
        />
      }
    />
  );
};
