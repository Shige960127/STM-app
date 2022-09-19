import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function CurrentDat() {
  const tailwind = useTailwind();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}/${month}/${day}`;

  return (
    <View>
      <Text style={tailwind("text-2xl")}>{currentDate}</Text>
    </View>
  );
}
