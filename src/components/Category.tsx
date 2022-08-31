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

const DATA = [
  {
    title: "PrimaryCategory",
    subTitle: "Fruits",
  },
  {
    title: "SecondaryCategory",
    subTitle: "Vegetables",
  },
  {
    title: "ThirdryCategory",
    subTitle: "drink",
  },
];

type Item = {
  title: string;
  subTitle: string;
};

const Item = ({ item }: { item: Item }) => (
  // ここのonPressのロジックを変えれば各カテゴリーの詳細スクリーンに遷移できるようになるかも？
  <TouchableOpacity style={styles.item} onPress={() => Alert.alert(item.title)}>
    <Text style={styles.title}>{item.title}</Text>
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
