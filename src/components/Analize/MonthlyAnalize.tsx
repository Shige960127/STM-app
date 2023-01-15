import { View, Text, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { RootReducer } from "../../../App";
import { getAllHistories } from "@stores/history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import { dateFormat } from "@utils/format";
import { StackedBarChart } from "react-native-chart-kit";
import {
  ChartData,
  CategoryData,
  CreateChartData,
} from "@components/Analize/Initial";
import { BarChart } from "react-native-gifted-charts";

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
    dispatch(getAllHistories({ userId: user!.id }));
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

  const primaries: string[] = [];

  const stackMap = all.reduce(
    (
      prev: {
        [key: string]: stack;
      },
      current
    ) => {
      const createAt = dateFormat(current.created_at.toDate(), "yyyy/MM");

      if (!primaries.includes(current.primary_name))
        primaries.push(current.primary_name);
      prev[current.primary_id + createAt] = {
        id: current.primary_id,
        name: current.primary_name,
        date: createAt,
        value:
          (prev[current.primary_id + createAt]?.value || 0) +
          current.measuring_time,
      };
      return prev;
    },
    {}
  );

  const primaryClors = primaries.map((p) => {
    const randomColor =
      "rgb(" +
      ~~(256 * Math.random()) +
      ", " +
      ~~(256 * Math.random()) +
      ", " +
      ~~(256 * Math.random()) +
      ")";
    return {
      name: p,
      color: randomColor,
    };
  });

  const intermediateData: { [key: string]: stack[] } = Object.values(
    stackMap
  ).reduce((prev: { [key: string]: stack[] }, current) => {
    const color = primaryClors.find((p) => p.name === current.name)?.color;
    prev[current.date] = [
      ...(prev[current.date] || []),
      { ...current, color: color },
    ];
    return prev;
  }, {});

  const stackData: StackData[] = Object.entries(intermediateData).map((p) => {
    return {
      label: p[0],
      stacks: p[1],
    };
  });

  type StackData = {
    stacks: stack[];
    label: string;
  };

  type stack = {
    id: string;
    name: string;
    date: string;
    value: number;
    color?: string;
    marginBottom?: number;
  };

  return (
    <>
      <View style={tailwind("flex flex-row")}>
        <BarChart
          width={300}
          height={500}
          labelsExtraHeight={100}
          noOfSections={4}
          stackData={stackData}
        />
        <View>
          {primaryClors?.map((p) => (
            <View style={tailwind("flex flex-row items-center my-4")}>
              <View
                style={{
                  backgroundColor: p.color,
                  ...tailwind("w-4 h-4 rounded-full mr-2"),
                }}
              />
              <Text>{p.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
