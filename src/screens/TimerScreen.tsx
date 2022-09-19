import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Timer from "@components/Timer";
import Category from "@components/Category";
import CurrentDate from "@components/CurrentDate";
import { useState } from "react";
import { RootReducer } from "../../App";
import { AppDispatch } from "@stores/index";
import { createHistory } from "@stores/history";
import { useDispatch, useSelector } from "react-redux";

const TimerScreen = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const [remainingSecs, setRemainingSecs] = useState(0);
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    selectCategory: { primary, secondary },
  } = useSelector(({ categories }: RootReducer) => categories);
  const save = () => {
    dispatch(
      createHistory({
        userId: user!.id,
        primaryId: primary!.id,
        secondaryId: secondary!.id,
        measuringTime: remainingSecs,
      })
    );
  };
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View
        style={tailwind(
          "flex flex-col items-start items-center justify-center m-2 p-1"
        )}
      >
        <CurrentDate />
      </View>
      <View>
        <Category />
      </View>
      <Timer
        remainingSecs={remainingSecs}
        setRemainingSecs={setRemainingSecs}
      />
      <View style={tailwind("flex items-center justify-center mt-8")}>
        <TouchableOpacity
          onPress={save}
          style={tailwind(
            "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-sky-400"
          )}
          disabled={!primary || !secondary || remainingSecs === 0}
        >
          <Text style={tailwind("text-white font-bold")}>計測時間を保存</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default TimerScreen;
