import { useTailwind } from "tailwind-rn/dist";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

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

// type category = {
//   categoryId: string;
//   name: string;
// };

// const Category = () => {
//   const tailwind = useTailwind();
//   const dispatch = useDispatch();
//   const [primaryCategory, setPrimaryCategory] = useState<category>({
//     categoryId: "",
//     name: "",
//   });
//   const [secondaryCategory, setSecondaryCategory] = useState<category>({
//     categoryId: "",
//     name: "",
//   });
//   const update =
//     (field: keyof category) =>
//     (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
//       if (primaryCategory)
//         setPrimaryCategory({ ...primaryCategory, [field]: e.nativeEvent.text });
//       if (secondaryCategory)
//         setSecondaryCategory({
//           ...secondaryCategory,
//           [field]: e.nativeEvent.text,
//         });
//     };
//   return (
//     <SafeAreaView>
//       <View style={tailwind("items-center m-4 p-4")}>
//         <Text style={tailwind("text-2xl font-bold text-white")}>
//           カテゴリーを作成してください
//         </Text>
//       </View>
//       <View>
//         <Text style={tailwind("text-lg font-bold")}>PrimaryCategory</Text>
//         <View style={tailwind("flex flex-row items-center")}>
//           <View style={tailwind("flex-1")}>
//             <TextInput
//               style={tailwind("w-full h-8 border rounded p-2")}
//               onChange={update("name")}
//               value={primaryCategory.name}
//               autoCapitalize={"none"}
//               placeholder="一番大きい枠組みでのカテゴリ名を設定してください。"
//             />
//           </View>
//         </View>
//       </View>
//       <View>
//         <Text style={tailwind("text-lg font-bold")}>SecondaryCategory</Text>
//         <View style={tailwind("flex flex-row items-center")}>
//           <View style={tailwind("flex-1")}>
//             <TextInput
//               style={tailwind("w-full h-8 border rounded p-2")}
//               onChange={update("name")}
//               value={secondaryCategory.name}
//               autoCapitalize={"none"}
//               placeholder="二番目に大きい枠組みでのカテゴリ名を設定してください。"
//             />
//           </View>
//         </View>
//       </View>
//       <View style={tailwind("flex items-center justify-center mt-8")}>
//         <TouchableOpacity
//           onPress={() =>
//             dispatch(
//               handleSignUp({ ...primaryCategory }, { ...secondaryCategory })
//             )
//           }
//           style={tailwind(
//             "w-80 flex flex-row justify-center items-center p-4 rounded-2xl bg-sky-400"
//           )}
//         >
//           <Text style={tailwind("text-white font-bold")}>サインアップする</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

export default Category;
