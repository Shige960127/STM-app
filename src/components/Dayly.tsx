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
import { getDaylyHistories, History, deleteHistories } from "@stores/history";
import { VictoryPie } from "victory-native";
import { dateFormat } from "@utils/format";
import DropDownPicker from "react-native-dropdown-picker";
import { getPrimaries } from "@stores/categories";
import ChangeInfo from "./ChangeInfo";
import Modal from "react-native-modal";

type item = {
  label: string;
  value: string;
};

type pie = {
  id: string;
  y: string;
  x: string;
};
type daylyData = {
  id: string;
  y: string;
  x: string;
  secondaries: {
    id: string;
    x: string;
    y: string;
  }[];
};
export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: { user },
    history: {
      histories: { dayly },
    },
  } = useSelector((store: RootReducer) => store);
  console.log("1");
  useEffect(() => {
    const daylyMap = dayly.reduce(
      (
        prev: {
          [key: string]: daylyData;
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
              x: current.secondary_name,
              y: current.measuring_time,
            },
          ],
        };
        return prev;
      },
      {}
    );
    console.log("2");
    console.log("=======");
    setDaylyInfo(Object.values(daylyMap));
  }, [dayly]);

  const [modalVisible, setModalVisible] = useState(false);
  const [daylyInfo, setDaylyInfo] = useState<daylyData[]>([]);
  const [pieData, setPieData] = useState<pie[]>(daylyInfo);
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(null);
  const [primaries, setPrimaries] = useState<item[]>([]);
  const [open1, setOpen1] = useState(false);
  const [secondary, setSecondary] = useState(null);
  const [secondaries, setSecondaries] = useState<item[]>([]);

  useEffect(() => {
    if (user) dispatch(getDaylyHistories({ userId: user.id }));
  }, [user]);
  useEffect(() => {
    const primaryInfo = daylyInfo.map((item) => {
      return { label: item.x, value: item.id };
    });
    setPrimaries([...primaryInfo, { label: "全て", value: "all" }]);
    setPieData(daylyInfo);
  }, [dayly]);

  useEffect(() => {
    if (primary && primary !== "all") {
      const secondariesByPrimary = daylyInfo[primary].secondaries;
      const filteredSecondaries = secondariesByPrimary
        .filter(
          (x, i, array) =>
            array.findIndex((y) => y.id === x.id && y.x === x.x) === i
        )
        .map((s) => {
          return {
            label: s.x,
            value: s.id,
          };
        });
      setSecondaries(filteredSecondaries);
      setPieData(secondariesByPrimary);
    }

    if (primary === "all") {
      setPieData(Object.values(daylyInfo));

      const newSecondaries = dayly
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
                    dispatch(deleteHistories({ historyId: item.id }));
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
          data={pieData}
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
