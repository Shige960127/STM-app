import {
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { getMonthlyHistories, History } from "@stores/history";
import { VictoryPie } from "victory-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getPrimaries } from "@stores/categories";
import { dateFormat } from "@utils/format";

type item = {
  label: string;
  value: string;
};
export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: { user },
    history: {
      histories: { monthly },
    },
  } = useSelector((store: RootReducer) => store);

  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(null);
  const [primaries, setPrimaries] = useState<item[]>([]);
  const [open1, setOpen1] = useState(false);
  const [secondary, setSecondary] = useState(null);
  const [secondaries, setSecondaries] = useState<item[]>([]);

  const monthlyMap = monthly.reduce(
    (
      prev: {
        [key: string]: {
          id: string;
          y: string;
          x: string;
          secondary: { id: string; name: string }[];
        };
      },
      current
    ) => {
      prev[current.primary_id] = {
        id: current.primary_id,
        x: current.primary_name,
        y: (prev[current.primary_id]?.y || 0) + current.measuring_time,
        secondary: [
          ...(prev[current.primary_id]?.secondary || []),
          { id: current.secondary_id, name: current.secondary_name },
        ],
      };
      return prev;
    },
    {}
  );

  useEffect(() => {
    if (user) dispatch(getMonthlyHistories({ userId: user!.id }));
  }, [user]);
  useEffect(() => {
    const primaryInfo = Object.values(monthlyMap).map((item) => {
      return { label: item.x, value: item.id };
    });
    setPrimaries([...primaryInfo, { label: "全て", value: "all" }]);
  }, [monthly]);
  useEffect(() => {
    if (primary) {
      const secondaryInfo = monthlyMap[primary].secondary.map((s) => {
        return { label: s.name, value: s.id };
      });
      setSecondaries(secondaryInfo);
    }
  }, [primary]);

  const renderItem = ({ item }: { item: History }) => {
    const timeinfo = Number(item.measuring_time) / 60;
    return (
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
            {timeinfo.toFixed(2)}min
          </Text>
        </View>
      </View>
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
          data={Object.values(monthlyMap)}
          padding={{ top: 40, bottom: 35 }}
          height={260}
          labelRadius={80}
          innerRadius={50}
          labels={({ datum }) => `${datum.x}: ${(datum.y / 60).toFixed(2)}min`}
          colorScale={["orange", "navy", "tomato", "gold", "cyan"]}
        />
      </View>
      <TouchableOpacity>
        <Text style={tailwind("text-right m-2 p-1")}>--もっと見る--</Text>
      </TouchableOpacity>
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
