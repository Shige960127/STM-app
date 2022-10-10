import { Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";
import { useState } from "react";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const { histories } = useSelector(({ history }: RootReducer) => history);
  // console.log("Histories:", histories);
  // const minDate = "";
  // const maxDate = "";

  useEffect(() => {
    dispatch(getHistories({ userId: user!.id }));
  }, []);
  const renderItem = ({ item }: { item: History }) => {
    const primaryValue = item.primary_name;
    const primaryTime = item.measuring_time;
    console.log("test", primaryValue);
    console.log("test", primaryTime);

    return (
      <>
        <View>
          <Text>{item.primary_name}</Text>
        </View>
        <View>
          <Text>{item.measuring_time}</Text>
        </View>
      </>
    );
  };
  return (
    <FlatList
      data={histories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
