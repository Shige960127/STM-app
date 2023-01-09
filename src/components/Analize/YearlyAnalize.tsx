import { View, Text, FlatList, RefreshControl, Dimensions } from "react-native";
import { useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { RootReducer } from "../../../App";
import { getMonthlyHistories } from "@stores/history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import { dateFormat } from "@utils/format";
import { StackedBarChart } from "react-native-chart-kit";

type categoryData = {
  id: number | string;
  name: string;
  date: string;
  time: number;
};

const chartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 1,
};

const labels: string[] = [];
const dataContainer: number[][] = [];

const data = {
  labels: labels,
  data: dataContainer,
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#FFFFFF", "#ffe4ea"],
};

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
  const monthlyMap = all.reduce(
    (
      prev: {
        [key: string]: { id: string; time: number; name: string };
      },
      cureent
    ) => {
      prev[cureent.primary_id] = {
        id: cureent.primary_id,
        time:
          (prev[cureent.primary_id]?.time || 0) +
          Number(cureent.measuring_time),
        name: cureent.primary_name,
      };
      return prev;
    },
    {}
  );

  const graphData = all.reduce(
    (
      prev: {
        [key: string]: categoryData;
      },
      current
    ) => {
      const createAt = dateFormat(current.created_at.toDate(), "yyyy/MM");
      if (!labels.includes(createAt)) labels.push(createAt);
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

  const graphDataArray = Object.values(graphData);

  useEffect(() => {
    graphDataArray.map((g) => {
      const index = labels.indexOf(g.date);
      if (dataContainer[index]) {
        dataContainer[index].push(g.time);
      } else {
        dataContainer[index] = [g.time];
      }
    });
  }, []);
  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      time: number;
    };
  }) => (
    <View style={tailwind("flex items-center")}>
      <View
        style={tailwind(
          "m-1 p-1 w-4/5 bg-yellow-200 border-2 border-black rounded-md"
        )}
      >
        <Text style={tailwind("text-base font-bold")}>{item.name}</Text>
        <Text style={tailwind("text-base font-bold text-right mr-1 pr-1")}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={tailwind("flex flex-row m-1")}>
        <View style={tailwind("px-4")}>
          <StackedBarChart
            data={data}
            height={Dimensions.get("window").height / 2}
            width={Dimensions.get("window").width}
            chartConfig={chartConfig}
          />
        </View>
        <FlatList
          data={Object.values(monthlyMap)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() =>
                dispatch(getMonthlyHistories({ userId: user!.id }))
              }
            />
          }
        />
      </View>
    </>
  );
};
