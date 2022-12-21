import { useTailwind } from "tailwind-rn/dist";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};
const Timer = ({
  remainingSecs,
  setRemainingSecs,
  isActive,
  setIsActive,
}: {
  remainingSecs: number;
  setRemainingSecs: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const tailwind = useTailwind();
  const { hours, mins, secs } = getRemaining(remainingSecs);
  const toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval: null | NodeJS.Timer = null;
    if (isActive && remainingSecs <= 172800) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs + 1);
      }, 1000);
    } else if (isActive && remainingSecs > 172800) {
      setRemainingSecs(remainingSecs);
    } else {
      clearInterval(Number(interval));
    }
    return () => clearInterval(Number(interval));
  }, [isActive, remainingSecs]);
  return (
    <View style={tailwind("flex-1 items-center justify-center")}>
      <Text style={styles.timer}>{`${hours}:${mins}:${secs}`}</Text>
      <TouchableOpacity
        onPress={toggle}
        style={tailwind(
          "flex flex-row border-8 border-violet-300 w-48 h-48 rounded-full items-center justify-center bg-black m-2 p-1"
        )}
      >
        <Text style={tailwind("text-4xl  text-violet-500 font-bold")}>
          {isActive ? "Pause" : "Start"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Timer;

const styles = StyleSheet.create({
  timer: {
    shadowColor: "gray",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    margin: 4,
    padding: 1,
    fontSize: 70,
    fontWeight: "bold",
  },
});
