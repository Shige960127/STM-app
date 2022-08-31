import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

const DATA: Item[] = [
  {
    title: "PrimaryCategory",
    subTitle: "Fruits",
    isVisble: true,
  },
  {
    title: "SecondaryCategory",
    subTitle: "Vegetables",
    isVisble: true,
  },
  {
    title: "ThirdryCategory",
    subTitle: "drink",
    isVisble: false,
  },
];

type Item = {
  title: string;
  subTitle: string;
  isVisble: boolean;
};

const Item = ({ item }: { item: Item }) => (
  // ここのonPressのロジックを変えれば各カテゴリーの詳細スクリーンに遷移できるようになるかも？
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
