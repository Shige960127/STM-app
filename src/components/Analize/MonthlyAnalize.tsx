import { View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { RootReducer } from "../../../App";
import { getMonthlyHistories } from "@stores/history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import { dateFormat } from "@utils/format";
import { StackedBarChart } from "react-native-chart-kit";
import { ChartData, CategoryData, CreateChartData } from "./Initial";

const chartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 1,
};

const labels: string[] = [];

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { all },
  } = useSelector(({ history }: RootReducer) => history);
  useEffect(() => {
    dispatch(getMonthlyHistories({ userId: user!.id }));
  }, []);

  const [chartData, setChartData] = useState<ChartData | null>(null);

  const graphData = all.reduce(
    (
      prev: {
        [key: string]: CategoryData;
      },
      current
    ) => {
      const createAt = dateFormat(current.created_at.toDate(), "yyyy/MM");
      if (!labels.includes(createAt)) labels.unshift(createAt);
      prev[current.primary_id + createAt] = {
        id: current.primary_id,
        name: current.primary_name,
        date: createAt,
        time:
          (prev[current.primary_id + createAt]?.time || 0) +
          current.measuring_time,
      };
      return prev;
    },
    {}
  );

  useEffect(() => {
    setChartData(
      CreateChartData({ labels: labels, inputData: Object.values(graphData) })
    );
  }, []);

  if (!chartData) return <></>;
  return (
    <>
      <View style={tailwind("flex flex-row m-1")}>
        <StackedBarChart
          data={chartData}
          height={(Dimensions.get("window").height * 4) / 5}
          width={Dimensions.get("window").width}
          chartConfig={chartConfig}
          hideLegend
        />
      </View>
    </>
  );
};
