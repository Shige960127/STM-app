import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch } from "react-redux";

const DATA: Item[] = [
  {
    title: "PrimaryCategory",
    subtitle: "Fruits",
    isVisble: true,
  },
  {
    title: "SecondaryCategory",
    subtitle: "Vegetables",
    isVisble: true,
  },
  {
    title: "ThirdryCategory",
    subtitle: "drink",
    isVisble: true,
  },
];

type Item = {
  title: string;
  subtitle: string;
  isVisble: boolean;
};

const Item = ({ item }: { item: Item }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => Alert.alert(item.title)}
    disabled={!item.isVisble}
  >
    {item.isVisble && <Text style={styles.title}>{item.title}</Text>}
  </TouchableOpacity>
);

const Category = () => {
  const renderItem = ({ item }: { item: Item }) => <Item item={item} />;
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(_, key) => key.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    borderColor: "#000000",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Category;
