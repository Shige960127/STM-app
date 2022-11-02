import {
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { useEffect } from "react";
import { getWeekHistories, History } from "@stores/history";
import { VictoryPie } from "victory-native";
import { dateFormat } from "../utils/format";
import { PrimaryCategory } from "@stores/categories";
import DropDownPicker from "react-native-dropdown-picker";
import { getPrimaries } from "@stores/categories";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);
  // const { primaryCategories } = useSelector(
  //   ({ categories }: RootReducer) => categories
  // );
  // const primaryInfo = primaryCategories.map((item) => {
  //   return { label: item.name, value: item.name };
  // });
  // useEffect(() => {
  //   dispatch(getPrimaries({ userID: user!.id }));
  // }, [user]);

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

  useEffect(() => {
    dispatch(getWeekHistories({ userId: user!.id }));
  }, []);

  const renderItem = ({ item }: { item: History }) => (
    <View style={tailwind("flex items-center")}>
      <View style={tailwind("ml-2 pl-1 w-4/5")}>
        <Text style={tailwind("text-base")}>
          {dateFormat(item.created_at.toDate())}
        </Text>
      </View>
      <View
        style={tailwind(
          "ml-2 pl-1 w-4/5 bg-yellow-200 border-2 border-black rounded-md"
        )}
      >
        <View style={tailwind("flex flex-row ")}>
          <Text style={tailwind("text-base font-bold")}>
            {item.primary_name}
          </Text>
          <TouchableOpacity style={tailwind("flex-1 items-end mr-1 pr-1")}>
            <Text>•••</Text>
          </TouchableOpacity>
        </View>
        <Text style={tailwind("text-base font-bold text-right mr-1 pr-1")}>
          {item.measuring_time}min
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
      <View>
        <VictoryPie
          data={Object.values(daylyMap)}
          padding={{ top: 40, bottom: 35 }}
          height={260}
          labelRadius={80}
          innerRadius={50}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          colorScale={["orange", "navy", "tomato", "gold", "cyan"]}
        />
      </View>
      <TouchableOpacity>
        <Text style={tailwind("text-right m-2 p-1")}>--もっと見る--</Text>
      </TouchableOpacity>
      <FlatList
        data={weekly}
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
