import { Text, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect, useState } from "react";
import { getWeekHistories, History } from "@stores/history";
import { useTailwind } from "tailwind-rn/dist";
import { AppDispatch } from "@stores/index";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { VictoryPie } from "victory-native";

export function dateFormat(
  date: string | number | Date,
  s = "MM月dd日 HH時mm分"
) {
  if (!date) return "";
  return format(zonedTimeToUtc(date, "JST"), s);
}

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

  const s = new Date();
  const e = new Date();
  e.setFullYear(e.getFullYear());
  e.setMonth(e.getMonth());
  e.setDate(e.getDate() - 7);
  e.setHours(e.getHours());
  e.setMinutes(e.getMinutes());
  e.setSeconds(e.getSeconds());
  const test = weekly.map((data) => {
    if (data.created_at.toDate() > e && s > data.created_at.toDate()) {
      return data;
    }
  });

  type weelyMap = {
    id: string;
    y: string;
    x: string;
  };
  const [data, setData] = useState<weelyMap>();
  useEffect(() => {
    const daylyMap = test.reduce(
      (
        prev: {
          [key: string]: { id: string; y: string; x: string };
        },
        current
      ) => {
        prev[current!.primary_id] = {
          id: current!.primary_id,
          x: current!.primary_name,
          y: (prev[current!.primary_id]?.y || 0) + current!.measuring_time,
        };
        return prev;
      },
      {}
    );
    setData(Object.values(daylyMap));
  }, [test]);

  return (
    <View>
      <VictoryPie
        data={data}
        padding={{ top: 55, bottom: 45 }}
        height={250}
        labelRadius={80}
        innerRadius={50}
      />
    </View>
  );
};
