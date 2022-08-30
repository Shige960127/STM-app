import React from "react";
import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";

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

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Category = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
