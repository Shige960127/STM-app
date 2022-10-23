import { FlatList, View, Text, RefreshControl } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getWeekHistories } from "@stores/history";
import { VictoryPie } from "victory-native";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export function dateFormat(
  date: string | number | Date,
  s = "MM月dd日 HH時mm分"
) {
  if (!date) return "";
  return format(zonedTimeToUtc(date, "JST"), s);
}

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);

  const daylyMap = weekly.reduce(
    (
      prev: {
        [key: string]: { id: string; y: string; x: string };
      },
      current
    ) => {
      prev[current.primary_id] = {
        id: current.primary_id,
        x: current.primary_name,
        y: (prev[current.primary_id]?.y || 0) + current.measuring_time,
      };
      return prev;
    },
    {}
  );
  const historyMap = weekly.reduce(
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
    <View style={tailwind("m-2 p-1 w-full h-16 bg-yellow-200")}>
      <Text style={tailwind("text-2xl font-bold")}>{item.name}</Text>
      <Text style={tailwind("text-2xl font-bold")}>{item.time}</Text>
    </View>
  );
  return (
    <>
      <View>
        <VictoryPie
          data={Object.values(daylyMap)}
          padding={{ top: 55, bottom: 45 }}
          height={250}
          labelRadius={80}
          innerRadius={50}
        />
      </View>
      <FlatList
        data={Object.values(historyMap)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(getWeekHistories({ userId: user!.id }))}
          />
        }
      />
    </>
  );
};
