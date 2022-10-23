import {
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ViewPagerAndroidBase,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getWeekHistories } from "@stores/history";
import { VictoryPie } from "victory-native";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { PrimaryCategory } from "@stores/categories";
import DropDownPicker from "react-native-dropdown-picker";
import { getPrimaries } from "@stores/categories";

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
  const { primaryCategories } = useSelector(
    ({ categories }: RootReducer) => categories
  );
  const primaryInfo = primaryCategories.map((item) => {
    return { label: item.name, value: item.name };
  });
  useEffect(() => {
    dispatch(getPrimaries({ userID: user!.id }));
  }, [user]);
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: "Lemon", value: "lemon" },
    { label: "Grape", value: "grape" },
  ]);
  const onOpen = useCallback(() => {
    setOpen(false);
  }, []);
  const onOpen1 = useCallback(() => {
    setOpen1(false);
  }, []);

  return (
    <>
      <View style={tailwind("flex flex-row m-1")}>
        <View style={tailwind("w-1/2")}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={tailwind("flex w-1/2")}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
          />
        </View>
      </View>
      <View>
        <VictoryPie
          data={Object.values(daylyMap)}
          padding={{ top: 55, bottom: 45 }}
          height={250}
          labelRadius={80}
          innerRadius={50}
        />
      </View>
      <View>
        <Text style={tailwind("text-right m-2 p-1")}>--もっと見る--</Text>
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
