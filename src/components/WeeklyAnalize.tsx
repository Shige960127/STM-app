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
import { dateFormat } from "@utils/format";

type categoryData = {
  id: number | string;
  name: string;
  history: {
    date: string;
    time: number;
  }[];
};

// const getOneWeekDate = () => {
//   const oneWeek: string[] = [];
//   for (let i = 0; i < 7; i++) {
//     const today = new Date();
//     today.setDate(today.getDate() - i);
//     oneWeek.unshift(`${today.getMonth() + 1}/${today.getDate()}`);
//   }
//   return oneWeek;
// };

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

  const graphData = weekly.reduce(
    (
      prev: {
        [key: string]: categoryData;
      },
      current
    ) => {
      const createdAt = dateFormat(current.created_at.toDate(), "MM/dd");
      const prevHistories = prev[current.primary_id]
        ? prev[current.primary_id].history
        : [];

      prev[current.primary_id] = {
        id: current.primary_id,
        name: current.primary_name,
        history: [
          ...prevHistories,
          {
            date: createdAt,
            time: Number(current.measuring_time),
          },
        ],
      };
      return prev;
    },
    {}
  );

  console.log(
    "week1======",
    Object.values(graphData).map((v) => console.log(v.name, v.history))
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

  // BEから送られてくるデータの型は以下の通り
  const weeklySampleData: categoryData[] = [
    {
      id: 1,
      name: "english",
      history: [
        { date: "09/01", time: 60 },
        { date: "11/01", time: 40 },
        { date: "11/01", time: 30 },
        { date: "11/01", time: 70 },
        { date: "11/01", time: 60 },
      ],
    },
    {
      id: 2,
      name: "programming",
      history: [
        { date: "11/01", time: 30 },
        { date: "11/02", time: 40 },
        { date: "11/03", time: 50 },
        { date: "10/31", time: 60 },
        { date: "11/01", time: 70 },
        { date: "11/01", time: 30 },
        { date: "11/01", time: 70 },
      ],
    },
    {
      id: 3,
      name: "game",
      history: [
        { date: "11/01", time: 80 },
        { date: "11/01", time: 90 },
        { date: "11/01", time: 70 },
        { date: "11/01", time: 80 },
        { date: "11/01", time: 90 },
        { date: "11/01", time: 60 },
        { date: "11/01", time: 80 },
      ],
    },
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
      <View style={tailwind("px-4")}>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}min`} />

          <VictoryStack colorScale={["tomato", "orange", "gold"]}>
            {Object.values(graphData).map((data) => (
              <VictoryBar data={data.history} x="date" y="time" />
            ))}
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
