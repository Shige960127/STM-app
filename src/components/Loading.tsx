import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default () => {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        "absolute top-0 left-0 w-full h-full items-center justify-center"
      )}
    >
      <ActivityIndicator size="large" color="#4dd0e1" />
    </View>
  );
};
