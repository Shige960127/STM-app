import { View, Text } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import DropDownPicker from "react-native-dropdown-picker";
import { VictoryChart, VictoryArea } from "victory-native";

export default () => {
  const tailwind = useTailwind();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: "Lemon", value: "lemon" },
    { label: "Grape", value: "grape" },
  ]);

  return (
    <>
      <View style={tailwind("flex flex-row m-1")}>
        <View style={tailwind("w-1/2")}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={tailwind("flex w-1/2")}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
          />
        </View>
      </View>
      <VictoryChart>
        <VictoryArea
          data={[
            { x: "2022/1/1", y: "5", y0: "programming" },
            { x: "2022/1/2", y: "2", y0: "English" },
            { x: "2022/1/3", y: "6", y0: "programming" },
            { x: "2022/1/4", y: "8", y0: "English" },
            { x: "2022/1/5", y: "1", y0: "programming" },
            { x: "2022/1/6", y: "3", y0: "English" },
            { x: "2022/1/7", y: "9", y0: "programming" },
          ]}
        />
      </VictoryChart>
    </>
  );
};
