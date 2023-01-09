import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MonthlyAnalize from "./MonthlyAnalize";
import YearlyAnalize from "./YearlyAnalize";
import { useTailwind } from "tailwind-rn/dist";

export default () => {
  const tailwind = useTailwind();
  const label = { monthly: "月ごと", yearly: "年ごと" };
  const [type, setType] = useState<"monthly" | "yearly">("monthly");
  const changeType = () => setType(type === "monthly" ? "yearly" : "monthly");
  return (
    <View style={tailwind("flex flex-col")}>
      <TouchableOpacity
        style={tailwind("flex-1 bg-black")}
        onPress={changeType}
      >
        <Text style={tailwind("text-white font-bold text-3xl text-center")}>
          {label[type]}
        </Text>
      </TouchableOpacity>
      {type === "monthly" ? <MonthlyAnalize /> : <YearlyAnalize />}
    </View>
  );
};

export type CategoryData = {
  id: string;
  name: string;
  date: string;
  time: number;
};

export type ChartData = {
  labels: string[];
  legend: string[];
  data: number[][];
  barColors: string[];
};

export const CreateChartData = ({
  labels,
  inputData,
}: {
  labels: string[];
  inputData: CategoryData[];
}): ChartData => {
  const data: number[][] = [];
  inputData.map((g) => {
    const index = labels.indexOf(g.date);
    if (data[index]) {
      data[index].unshift(g.time);
    } else {
      data[index] = [g.time];
    }
  });
  return {
    labels: labels,
    legend: [],
    data: data,
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#FFFFFF", "#ffe4ea"],
  };
};
