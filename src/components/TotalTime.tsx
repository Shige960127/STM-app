import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from "../../App";

export default () => {
  const tailwind = useTailwind();
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);

  const totalTime = weekly.reduce(
    (prev, current) => prev + Number(current.measuring_time),
    0
  );

  return (
    <View style={tailwind("m-4 p-2 w-4/5 h-24 bg-red-400")}>
      <Text style={tailwind("text-2xl font-bold")}>Total Time</Text>
      <Text style={tailwind("text-2xl font-bold text-right")}>{totalTime}</Text>
    </View>
  );
};
