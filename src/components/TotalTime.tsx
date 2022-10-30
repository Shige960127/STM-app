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
    <View style={tailwind("items-center")}>
      <View style={tailwind("mt-4 pt-2 mx-3.5 w-4/5 ")}>
        <Text style={tailwind("text-2xl font-bold")}>Total Time</Text>
      </View>
      <View style={tailwind("mb-4 p-2 mx-3.5 w-4/5 bg-white")}>
        <Text style={tailwind("text-2xl font-bold text-right")}>
          {totalTime}h
        </Text>
      </View>
    </View>
  );
};
