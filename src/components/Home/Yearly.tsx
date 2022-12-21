import {
  FlatList,
  View,
  Text,
  RefreshControl,
  Button,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../../App";
import {
  getYearlyHistories,
  History,
  deleteHistory,
  changeMeansuringTime,
} from "@stores/history";
import { VictoryPie } from "victory-native";
import DropDownPicker from "react-native-dropdown-picker";
import { dateFormat } from "@utils/format";
import ChangeInfo from "../ChangeInfo";
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

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: { user },
    history: {
      histories: { yearly },
    },
  } = useSelector((store: RootReducer) => store);

  const yearlyMap = yearly.reduce(
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

  const [modalType, setModalType] = useState<"initial" | "editTime" | null>(
    null
  );
  const [pieData, setPieData] = useState<pie[]>(Object.values(yearlyMap));
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(null);
  const [primaries, setPrimaries] = useState<item[]>([]);
  const [open1, setOpen1] = useState(false);
  const [secondary, setSecondary] = useState(null);
  const [secondaries, setSecondaries] = useState<item[]>([]);

  const close = () => setModalType(null);

  const InitialModal = ({
    close,
    editTime,
    deleteItem,
  }: {
    close: () => void;
    editTime: () => void;
    deleteItem: () => void;
  }) => {
    const tailwind = useTailwind();
    return (
      <>
        <View style={tailwind("bg-white p-2 m-1 rounded-2xl")}>
          <Text style={tailwind("text-center text-base")}>
            データの修正はこちらから
          </Text>
          <Button title="カテゴリ情報の修正" onPress={close} />
          <Button title="計測時間の修正" onPress={editTime} />
          <Button
            title="データの削除"
            onPress={() => {
              close();
              deleteItem();
            }}
          />
        </View>
      </>
    );
  };

  const EditTimeModal = ({ id }: { id: string }) => {
    const [time, setTime] = useState("");
    const tailwind = useTailwind();
    return (
      <View style={tailwind("bg-white p-12 m-1 rounded-2xl")}>
        <View>
          <Text style={tailwind("font-bold text-center")}>計測時間を修正</Text>
        </View>
        <TextInput
          style={tailwind("border rounded-md px-2 py-1 mt-1")}
          value={time}
          onChangeText={(text) => setTime(text)}
          autoFocus
        />
        <Button
          title="OK"
          onPress={() => {
            close;
            dispatch(
              changeMeansuringTime({
                historyId: id,
                measuringTime: time,
              })
            );
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (user) dispatch(getYearlyHistories({ userId: user!.id }));
  }, [user]);
  useEffect(() => {
    const primaryInfo = Object.values(yearlyMap).map((item) => {
      return { label: item.x, value: item.id };
    });
    setPrimaries([...primaryInfo, { label: "全て", value: "all" }]);
    setPieData(Object.values(yearlyMap));
  }, [yearly]);

  useEffect(() => {
    if (primary && primary !== "all") {
      const secondaryMap = yearlyMap[primary].secondaries.reduce(
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
      setPieData(Object.values(yearlyMap));
      const newSecondaries = yearly
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
            <ChangeInfo onPress={() => setModalType("initial")} />
            <Modal isVisible={Boolean(modalType)} onBackdropPress={close}>
              {modalType === "initial" && (
                <InitialModal
                  close={close}
                  editTime={() => setModalType("editTime")}
                  deleteItem={() =>
                    dispatch(deleteHistory({ historyId: item.id }))
                  }
                />
              )}
              {modalType == "editTime" && <EditTimeModal id={item.id} />}
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
      <FlatList
        data={yearly}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(getYearlyHistories({ userId: user!.id }))}
          />
        }
      />
    </>
  );
};
