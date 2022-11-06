import {
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { getDaylyHistories, History } from "@stores/history";
import { VictoryPie } from "victory-native";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import DropDownPicker from "react-native-dropdown-picker";
import { getPrimaries } from "@stores/categories";
import ChangeInfo from "./ChangeInfo";
import Modal from "react-native-modal";

export function dateFormat(
  date: string | number | Date,
  s = "MM月dd日 HH時mm分"
) {
  if (!date) return "";
  return format(zonedTimeToUtc(date, "JST"), s);
}

type item = {
  label: string;
  value: string;
};
export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: { user },
    categories: { primaryCategories },
    history: {
      histories: { dayly },
    },
  } = useSelector((store: RootReducer) => store);

  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [primaries, setPrimaries] = useState<item[]>([]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: "Lemon", value: "lemon" },
    { label: "Grape", value: "grape" },
  ]);
  const daylyMap = dayly.reduce(
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
    dispatch(getDaylyHistories({ userId: user!.id }));
    dispatch(getPrimaries({ userID: user!.id }));
  }, []);

  useEffect(() => {
    const primaryInfo = primaryCategories.map((item) => {
      return { label: item.name, value: item.id };
    });
    setPrimaries(primaryInfo);
  }, [primaryCategories]);

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
          <ChangeInfo onPress={() => setModalVisible(true)} />
          <Modal isVisible={modalVisible}>
            <View style={tailwind("bg-white p-2 m-1 rounded-2xl")}>
              <Text style={tailwind("text-center text-base")}>
                データの修正はこちらから
              </Text>
              <Button
                title="日付の修正"
                onPress={() => {
                  setModalVisible(false);
                  dispatch(getPrimaries({ userID: user!.id }));
                }}
              />
              <Button
                title="カテゴリ情報の修正"
                onPress={() => {
                  setModalVisible(false);
                  dispatch(getPrimaries({ userID: user!.id }));
                }}
              />
              <Button
                title="計測時間の修正"
                onPress={() => {
                  setModalVisible(false);
                  dispatch(getPrimaries({ userID: user!.id }));
                }}
              />
              <Button
                title="データの削除"
                onPress={() => {
                  setModalVisible(false);
                  dispatch(getPrimaries({ userID: user!.id }));
                }}
              />
            </View>
            <View style={tailwind("bg-white p-2 m-1 rounded-2xl")}>
              <Button
                title="キャンセル"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </Modal>
        </View>
        <Text style={tailwind("text-base font-bold text-right mr-1 pr-1")}>
          {item.measuring_time}min
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ zIndex: 1, ...tailwind("flex flex-row m-1") }}>
        <View style={tailwind("w-1/2")}>
          <DropDownPicker
            open={open}
            value={value}
            items={primaries}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setPrimaries}
            maxHeight={100}
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
      <View style={{ zIndex: 0 }}>
        <VictoryPie
          data={Object.values(daylyMap)}
          padding={{ top: 40, bottom: 35 }}
          height={260}
          labelRadius={80}
          innerRadius={50}
          labels={({ datum }) => `${datum.x}: ${datum.y}min`}
          colorScale={["orange", "navy", "tomato", "gold", "cyan"]}
        />
      </View>
      <TouchableOpacity>
        <Text style={tailwind("text-right m-2 p-1")}>--もっと見る--</Text>
      </TouchableOpacity>
      <FlatList
        data={dayly}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(getDaylyHistories({ userId: user!.id }))}
          />
        }
      />
    </>
  );
};
