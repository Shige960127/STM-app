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
    <View style={tailwind("flex-1 bg-black items-center justify-center")}>
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Timer;

const styles = StyleSheet.create({
  button: {
    borderWidth: 10,
    borderColor: "#B9AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 45,
    color: "#B9AAFF",
  },
  timerText: {
    color: "#fff",
    fontSize: 90,
    marginBottom: 20,
  },
});
