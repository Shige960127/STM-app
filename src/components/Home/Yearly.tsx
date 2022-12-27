import {
  FlatList,
  View,
  Text,
  RefreshControl,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../../App";

import { getMonthlyHistories, History } from "@stores/history";
import { VictoryPie } from "victory-native";
import DropDownPicker from "react-native-dropdown-picker";
import { dateFormat } from "@utils/format";
import { getPrimaries } from "@stores/categories";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type item = {
  label: string;
  value: string;
};

type pie = {
  id: string;
  y: string;
  x: string;
};

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: { user },
    history: {
      histories: { monthly },
    },
    categories: { primaryCategories },
  } = useSelector((store: RootReducer) => store);

  const navitaoin =
    useNavigation<NavigationProp<RootStackParamList, "HomeTop">>();

  const monthlyMap = monthly.reduce(
    (
      prev: {
        [key: string]: {
          id: string;
          y: string;
          x: string;
          secondaries: { id: string; name: string; time: string }[];
        };
      },
      current
    ) => {
      prev[current.primary_id] = {
        id: current.primary_id,
        x: current.primary_name,
        y: (prev[current.primary_id]?.y || 0) + current.measuring_time,
        secondaries: [
          ...(prev[current.primary_id]?.secondaries || []),
          {
            id: current.secondary_id,
            name: current.secondary_name,
            time: current.measuring_time,
          },
        ],
      };
      return prev;
    },
    {}
  );

  const [selectPrimary, setSelectPrimary] = useState();
  const [pieData, setPieData] = useState<pie[]>(Object.values(monthlyMap));
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(null);
  const [primaries, setPrimaries] = useState<item[]>([]);
  const [open1, setOpen1] = useState(false);
  const [secondary, setSecondary] = useState(null);
  const [secondaries, setSecondaries] = useState<item[]>([]);

  useEffect(() => {
    dispatch(getPrimaries({ userID: user!.id }));
  }, [user]);

  useEffect(() => {
    if (user) dispatch(getMonthlyHistories({ userId: user!.id }));
  }, [user]);
  useEffect(() => {
    const primaryInfo = Object.values(monthlyMap).map((item) => {
      return { label: item.x, value: item.id };
    });
    setPrimaries([...primaryInfo, { label: "全て", value: "all" }]);
    setPieData(Object.values(monthlyMap));
  }, [monthly]);

  useEffect(() => {
    if (primary && primary !== "all") {
      const secondaryMap = monthlyMap[primary].secondaries.reduce(
        (
          pre: {
            [key: string]: {
              id: string;
              name: string;
              time: string;
            };
          },
          cur
        ) => {
          pre[cur.id] = {
            id: cur.id,
            name: cur.name,
            time: (pre[cur.id]?.time || 0) + cur.time,
          };
          return pre;
        },
        {}
      );

      const secondariesByPrimary = Object.values(secondaryMap).filter(
        (x, i, array) =>
          array.findIndex((y) => y.id === x.id && y.name === x.name) === i
      );
      setSecondaries(
        secondariesByPrimary.map((s) => {
          return { label: s.name, value: s.id };
        })
      );
      setPieData(
        secondariesByPrimary.map((s) => {
          return {
            id: s.id,
            y: s.time,
            x: s.name,
          };
        })
      );
    }

    if (primary === "all") {
      setPieData(Object.values(monthlyMap));
      const newSecondaries = monthly
        .filter(
          (x, i, array) =>
            array.findIndex((y) => y.secondary_id === x.secondary_id) === i
        )
        .map((s) => {
          return {
            label: s.secondary_name,
            value: s.secondary_id,
          };
        });
      setSecondaries(newSecondaries);
    }
  }, [primary]);

  const renderItem = ({ item }: { item: History }) => {
    const timeinfo = Number(item.measuring_time) / 60;
    return (
      <TouchableOpacity
        style={tailwind("flex items-center")}
        onPress={() => navitaoin.navigate("HistoryDetail", { item: item })}
      >
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
          </View>
          <Text style={tailwind("text-base font-bold text-right mr-1 pr-1")}>
            {timeinfo.toFixed(2)}min
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{ zIndex: 1, ...tailwind("flex flex-row m-1") }}>
        <View style={tailwind("w-1/2")}>
          <DropDownPicker
            open={open}
            value={primary}
            items={primaries}
            setOpen={setOpen}
            setValue={setPrimary}
            setItems={setPrimaries}
            maxHeight={100}
            placeholder="大カテゴリを選択"
          />
        </View>
        <View style={tailwind("flex w-1/2")}>
          <DropDownPicker
            open={open1}
            value={secondary}
            items={secondaries}
            setOpen={setOpen1}
            setValue={setSecondary}
            setItems={setSecondaries}
            maxHeight={100}
            placeholder="中カテゴリを選択"
          />
        </View>
      </View>
      <View style={{ zIndex: 0 }}>
        <VictoryPie
          data={pieData}
          padding={{ top: 40, bottom: 35 }}
          height={260}
          labelRadius={80}
          innerRadius={50}
          labels={({ datum }) => `${datum.x}: ${(datum.y / 60).toFixed(2)}min`}
          colorScale={["orange", "navy", "tomato", "gold", "cyan"]}
        />
      </View>
      <FlatList
        data={monthly}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() =>
              dispatch(getMonthlyHistories({ userId: user!.id }))
            }
          />
        }
      />
    </>
  );
};
