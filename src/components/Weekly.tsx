import { Text, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getWeekHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";
import { useState } from "react";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);

  const weeklyMap = weekly.reduce(
    (
      prev: {
        [key: string]: { id: string; time: string; name: string };
      },
      current
    ) => {
      prev[current.primary_id] = {
        id: current.primary_id,
        time: (prev[current.primary_id]?.time || 0) + current.measuring_time,
        name: current.primary_name,
      };
      return prev;
    },
    {}
  );

  useEffect(() => {
    dispatch(getWeekHistories({ userId: user!.id }));
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { id: string; time: string; name: string };
  }) => (
    <View style={tailwind("m-2 p-1 w-full h-24 bg-yellow-200")}>
      <Text style={tailwind("text-2xl font-bold")}>{item.name}</Text>
      <Text style={tailwind("text-2xl font-bold")}>{item.time}</Text>
    </View>
  );

  return (
    <FlatList
      data={Object.values(weeklyMap)}
      renderItem={renderItem}
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
