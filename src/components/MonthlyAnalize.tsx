import { View, Text, FlatList, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import DropDownPicker from "react-native-dropdown-picker";
import { RootReducer } from "../../App";
import { getWeekHistories } from "@stores/history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import {
  VictoryStack,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);

  useEffect(() => {
    dispatch(getWeekHistories({ userId: user!.id }));
  }, []);

  const weeklyMap = weekly.reduce(
    (
      prev: {
        [key: string]: { id: string; time: string; name: string };
      },
      cureent
    ) => {
      prev[cureent.primary_id] = {
        id: cureent.primary_id,
        time: (prev[cureent.primary_id]?.time || 0) + cureent.measuring_time,
        name: cureent.primary_name,
      };
      return prev;
    },
    {}
  );
  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      time: string;
    };
  }) => (
    <View style={tailwind("flex items-center")}>
      <View
        style={tailwind(
          "m-1 p-1 w-4/5 bg-yellow-200 border-2 border-black rounded-md"
        )}
      >
        <Text style={tailwind("text-base font-bold")}>{item.name}</Text>
        <Text style={tailwind("text-base font-bold text-right mr-1 pr-1")}>
          {item.time}
        </Text>
      </View>
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

  const english = [
    { date: 1, time: 60 },
    { date: 3, time: 40 },
    { date: 5, time: 30 },
    { date: 6, time: 70 },
    { date: 7, time: 60 },
  ];
  const programming = [
    { date: 1, time: 30 },
    { date: 2, time: 40 },
    { date: 3, time: 50 },
    { date: 4, time: 60 },
    { date: 5, time: 70 },
    { date: 6, time: 30 },
    { date: 7, time: 70 },
  ];
  const game = [
    { date: 1, time: 80 },
    { date: 2, time: 90 },
    { date: 3, time: 70 },
    { date: 4, time: 80 },
    { date: 5, time: 90 },
    { date: 6, time: 60 },
    { date: 7, time: 80 },
  ];

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
        <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}min`} />

          <VictoryStack colorScale={["tomato", "orange", "gold"]}>
            <VictoryBar data={english} x="date" y="time" />
            <VictoryBar data={programming} x="date" y="time" />
            <VictoryBar data={game} x="date" y="time" />
          </VictoryStack>
        </VictoryChart>
      </View>
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
    </>
  );
};
