import { Text, View, Dimensions, StyleSheet } from "react-native";
import React, { Component } from "react";
import { TailwindProvider, useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { RootReducer } from "../../App";
import { LineChart } from "react-native-chart-kit";
import { useEffect } from "react";
import { getDaylyHistories } from "@stores/history";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const {
    histories: { weekly },
  } = useSelector(({ history }: RootReducer) => history);
  // console.log(weekly);

  useEffect(() => {
    dispatch(getDaylyHistories({ userId: user!.id }));
  }, []);
  // ラベルの設定
  const labels = ["1月", "2月", "3月", "4月", "5月"];
  // グラフにする値
  const datasets = [101, 163, 187, 203, 235];
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: datasets,
            },
          ],
        }}
        width={Dimensions.get("window").width - 50}
        height={181}
        yAxisSuffix={""}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        withInnerLines={false}
        style={tailwind("ml-2 pl-px")}
      />
    </View>
  );
};
