import { useTailwind } from "tailwind-rn/dist";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const screen = Dimensions.get("window");
const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};
const Timer = () => {
  const tailwind = useTailwind();
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval: null | NodeJS.Timer = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs + 1);
      }, 1000);
    } else {
      clearInterval(Number(interval));
    }
    return () => clearInterval(Number(interval));
  }, [isActive, remainingSecs]);
  return (
    <View style={tailwind("flex-1 items-center justify-center")}>
      <Text
        style={tailwind("text-violet-400 text-4xl font-bold h-20 m-4")}
      >{`${mins}:${secs}`}</Text>
      <TouchableOpacity
        onPress={toggle}
        style={tailwind(
          "flex flex-row border-8 border-violet-400 w-48 h-48 rounded-full items-center justify-center"
        )}
      >
        <Text style={tailwind("text-4xl  text-violet-400 font-bold")}>
          {isActive ? "Pause" : "Start"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Timer;
