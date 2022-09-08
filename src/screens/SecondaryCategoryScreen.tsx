import { TouchableOpacity, Text, SafeAreaView, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import PlusButton from "@components/PlusButton";

// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { RootStackParamList, RootReducer } from "../../App";
// import { useDispatch, useSelector } from "react-redux";
// import {setCategory} from "@stores/categories"

type SecondaryCategory = {
  id: string;
  name: string;
};

const SecondaryCategories: SecondaryCategory[] = [
  { id: "1", name: "文法" },
  { id: "2", name: "ReactNative" },
  { id: "3", name: "素振り" },
  { id: "4", name: "質問回答" },
  { id: "5", name: "ランニング" },
];

const Item = ({ item }: { item: SecondaryCategory }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind("bg-blue-900 p-4")}>
      <Text style={tailwind("text-lg text-white")}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default () => {
  const tailwind = useTailwind();
  // const navigation =
  //   useNavigation<NavigationProp<RootStackParamList, "Secondary">>();

  // const dispatch = useDispatch();
  // const {
  //   categories: { secondary },
  // } = useSelector(({ categories }: RootReducer) => categories);
  // console.log({ secondary });
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={SecondaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            // onPress={() => {
            //   dispatch(setSecondary(item.name));
            //   navigation.
            // }}
          />
        )}
      />
      <PlusButton />
    </SafeAreaView>
  );
};
