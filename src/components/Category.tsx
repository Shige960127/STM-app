import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View, Switch } from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParamList, RootReducer } from "../../App";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export type Item = {
  destination: "Primary" | "Secondary" | "Tertiary";
  title: string;
  isVisble: boolean;
  value?: string;
};
const Item = ({ item, onPress }: { item: Item; onPress: () => void }) => {
  const tailwind = useTailwind();
  return (
    <>
      <TouchableOpacity
        style={tailwind("bg-teal-500 border border-black p-2")}
        onPress={onPress}
        disabled={!item.isVisble}
      >
        {item.isVisble && (
          <Text style={tailwind("text-center text-2xl font-bold text-white")}>
            {item.title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const Category = () => {
  const tailwind = useTailwind();
  const [countSwitch, setCountSwitch] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const toggleCountSwitch = () =>
    setCountSwitch((previousState) => !previousState);
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, "Primary" | "Secondary" | "Tertiary">
    >();
  const {
    selectCategory: { primary, secondary, tertiary },
  } = useSelector(({ categories }: RootReducer) => categories);
  // ここを修正する必要あり
  const timeAlert = () => {
    return (
      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  };
  const DATA: Item[] = [
    {
      destination: "Primary",
      title: primary ? primary.name : "大カテゴリを選択",
      isVisble: true,
      value: primary?.id,
    },
    {
      destination: "Secondary",
      title: secondary ? secondary.name : "中カテゴリを選択",
      isVisble: true,
      value: secondary?.id,
    },
    {
      destination: "Tertiary",
      title: tertiary ? tertiary.name : "小カテゴリを選択",
      isVisble: Boolean(secondary),
      value: tertiary?.id,
    },
  ];

  return (
    <>
      <FlatList
        data={DATA.filter((data) => data.isVisble)}
        renderItem={({ item }: { item: Item }) => (
          <Item
            item={item}
            onPress={() => navigation.navigate(item.destination)}
          />
        )}
        keyExtractor={(_, key) => key.toString()}
      />
      <TouchableOpacity
        style={tailwind("items-center bg-teal-500 border border-black p-2")}
        onPress={() => timeAlert()}
      >
        <Text style={tailwind("text-2xl font-bold text-white")}>予鈴</Text>
      </TouchableOpacity>
      <View
        style={tailwind(
          "flex items-center bg-teal-500 border border-black p-2"
        )}
      >
        <View style={tailwind("flex flex-row")}>
          <Text style={tailwind("text-2xl font-bold text-white")}>
            終了後もカウント
          </Text>
          <Switch
            style={tailwind("ml-2")}
            trackColor={{ false: "#767577", true: "#49fc58" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleCountSwitch}
            value={countSwitch}
          />
        </View>
      </View>
    </>
  );
};

export default Category;
