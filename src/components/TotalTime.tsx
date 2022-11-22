import { View, Text, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useSelector } from "react-redux";
import { RootReducer } from "../../App";
import { useEffect, useState } from "react";

export default () => {
  const tailwind = useTailwind();
  const {
    histories: { all },
  } = useSelector(({ history }: RootReducer) => history);
  const [totalTime, setTotalTime] = useState("");
  useEffect(() => {
    const totalTime_bare = all.reduce(
      (prev, current) => prev + Number(current.measuring_time),
      0
    );
    const totalTime_hour = totalTime_bare / 3600;
    const total = totalTime_hour.toFixed(2);
    setTotalTime(total);
  }, [all]);

  return (
    <View style={tailwind("items-center")}>
      <View style={tailwind("mt-4 pt-2 mx-3.5 w-4/5 ")}>
        <Text style={tailwind("text-2xl font-bold")}>Total Time</Text>
      </View>
      <View style={styles.totaltime}>
        <Text style={tailwind("text-2xl font-bold text-right")}>
          {totalTime}h
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totaltime: {
    shadowColor: "gray",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 4,
    width: "80%",
  },
});
