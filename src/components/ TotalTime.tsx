import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from "../../App";
import { AppDispatch } from "@stores/index";
import { getWeekHistories } from "@stores/history";
import { useEffect } from "react";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);
  const totalTime = weekly.reduce(
    (prev, current) => (prev = prev + Number(current.measuring_time)),
    0
  );
  // const TotalTime = weekly.reduce(
  //   (
  //     prev: {
  //       [key: string]: { time: string };
  //     },
  //     current
  //   ) => {
  //     prev[current.user_id] = {
  //       time: (prev[current.user_id]?.time || 0) + current.measuring_time,
  //     };
  //     return prev;
  //   },
  //   {}
  // );

  useEffect(() => {
    dispatch(getWeekHistories({ userId: user!.id }));
  }, []);

  // const data = Object.values(TotalTime)[0];

  return (
    <View style={tailwind("m-4 p-2 w-4/5 h-24 bg-red-400")}>
      <Text style={tailwind("text-2xl font-bold")}>Total Time</Text>
      <Text style={tailwind("text-2xl font-bold text-right")}>{totalTime}</Text>
    </View>
  );
};
