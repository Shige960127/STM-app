import { useTailwind } from "tailwind-rn/dist";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Timer from "@components/Timer";
import Category from "@components/Category";
import { useState } from "react";
import { RootReducer } from "../../App";
import { AppDispatch } from "@stores/index";
import { createHistory } from "@stores/history";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPrimary,
  clearSecondary,
  clearTertiary,
} from "@stores/categories";

const TimerScreen = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    selectCategory: { primary, secondary, tertiary },
  } = useSelector(({ categories }: RootReducer) => categories);
  const save = () => {
    dispatch(
      createHistory({
        userId: user!.id,
        primaryId: primary!.id,
        primaryName: primary!.name,
        secondaryId: secondary!.id,
        secondaryName: secondary!.name,
        tertiaryId: tertiary?.id,
        tertiaryName: tertiary?.name,
        measuringTime: remainingSecs,
      })
    );
    dispatch(clearPrimary());
    dispatch(clearSecondary());
    dispatch(clearTertiary());
    setRemainingSecs(0);
  };
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View>
        <Category />
      </View>
      <Timer
        remainingSecs={remainingSecs}
        setRemainingSecs={setRemainingSecs}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <View style={tailwind("flex items-center justify-center mt-8")}>
        <TouchableOpacity
          onPress={save}
          style={tailwind(
            "w-80 flex flex-row justify-center items-center m-4 p-4 rounded-2xl bg-violet-500"
          )}
          disabled={!primary || !secondary || !remainingSecs || isActive}
        >
          <Text style={tailwind("text-white font-bold")}>計測時間を保存</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default TimerScreen;
