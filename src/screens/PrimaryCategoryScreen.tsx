import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import PlusButton from "@components/PlusButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList, RootReducer } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setPrimary } from "@stores/categories";

type PrimaryCategory = {
  id: string;
  name: string;
};

const PrimaryCategories: PrimaryCategory[] = [
  { id: "1", name: "英語" },
  { id: "2", name: "プログラミング" },
  { id: "3", name: "野球" },
  { id: "4", name: "野球" },
  { id: "5", name: "野球" },
  { id: "6", name: "野球" },
  { id: "7", name: "野球" },
  { id: "8", name: "野球" },
  { id: "9", name: "野球" },
  { id: "10", name: "野球" },
  { id: "11", name: "野球" },
  { id: "12", name: "野球" },
  { id: "13", name: "野球" },
];

const Item = ({
  item,
  onPress,
}: {
  item: PrimaryCategory;
  onPress: () => void;
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind("bg-blue-900 p-4")} onPress={onPress}>
      <Text style={tailwind("text-lg text-white")}>{item.name}</Text>
    </TouchableOpacity>
  );
};
export default () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Primary">>();

  const dispatch = useDispatch();
  const {
    categories: { primary },
  } = useSelector(({ categories }: RootReducer) => categories);

  console.log({ primary });

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={PrimaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => {
              dispatch(setPrimary(item.name));
              navigation.goBack();
            }}
          />
        )}
      />
      <PlusButton />
    </SafeAreaView>
  );
};
