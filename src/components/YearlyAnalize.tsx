import { View, Text, FlatList, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import DropDownPicker from "react-native-dropdown-picker";
import { RootReducer } from "../../App";
import { getAllHistories } from "@stores/history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import {
  VictoryStack,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { dateFormat } from "../utils/format";

type categoryData = {
  id: string;
  name: string;
  time: string;
  history: {
    date: string;
    time: number;
  }[];
};

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { all },
  } = useSelector(({ history }: RootReducer) => history);

  useEffect(() => {
    dispatch(getAllHistories({ userId: user!.id }));
  }, []);

  const yearByYear = all.reduce(
    (
      prev: {
        [key: string]: categoryData;
      },
      current
    ) => {
      const prevHistories = prev[current.primary_id]
        ? prev[current.primary_id].history
        : [];
      prev[current.primary_id] = {
        id: current.primary_id,
        time: (prev[current.primary_id]?.time || 0) + current.measuring_time,
        name: current.primary_name,
        history: [
          ...prevHistories,
          {
            date: dateFormat(current.created_at.toDate(), "MM/dd"),
            time: Number(current.measuring_time),
          },
        ],
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
      <View style={tailwind("px-4")}>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}min`} />
          <VictoryStack colorScale={["tomato", "orange", "gold"]}>
            {Object.values(yearByYear).map((data) => (
              <VictoryBar data={data.history} x="date" y="time" />
            ))}
          </VictoryStack>
        </VictoryChart>
      </View>
      <FlatList
        data={Object.values(yearByYear)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(getAllHistories({ userId: user!.id }))}
          />
        }
      />
    </>
  );
};
