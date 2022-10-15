import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function CurrentDate() {
  const tailwind = useTailwind();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}/${month}/${day}`;

  return currentDate;
}
