import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Button,
  TextInput,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import PlusButton from "../components/PlusButton";
import { useState, useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList, RootReducer } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@stores/index";
import { setTertiary, createTertiary, getTertiaries } from "@stores/categories";
import { TertiaryCategory } from "@stores/categories";
import Modal from "react-native-modal";
import Loading from "@components/Loading";

const Item = ({
  item,
  onPress,
}: {
  item: TertiaryCategory;
  onPress: () => void;
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={tailwind("bg-violet-500 p-2 border border-white")}
      onPress={onPress}
    >
      <Text style={tailwind("text-center  text-white")}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Secondary">>();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTertiary, setNewTertiary] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectCategory: { secondary },
  } = useSelector(({ categories }: RootReducer) => categories);
  const { tertiaryCategories, status } = useSelector(
    ({ categories }: RootReducer) => categories
  );

  useEffect(() => {
    if (secondary) {
      setNewTertiary("");
      dispatch(getTertiaries({ secondaryID: secondary!.id }));
    }
  }, [secondary]);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={tertiaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => {
              dispatch(setTertiary(item));
              navigation.goBack();
            }}
          />
        )}
      />
      <PlusButton onPress={() => setModalVisible(true)} />
      <View>
        <Modal isVisible={modalVisible}>
          {status === "pending" ? (
            <>
              <View style={tailwind("h-40")}>
                <Loading />
              </View>
            </>
          ) : (
            <View style={tailwind("bg-white p-12 rounded-2xl")}>
              <TextInput
                style={tailwind("border p-2 rounded-lg")}
                onChangeText={(text) => setNewTertiary(text)}
                value={newTertiary}
              />
              <Button
                title="カテゴリーを追加"
                onPress={() => {
                  dispatch(
                    createTertiary({
                      tertiary: newTertiary,
                      secondaryId: secondary!.id,
                    })
                  );
                  setModalVisible(false);
                  setNewTertiary("");
                  dispatch(getTertiaries({ secondaryID: secondary!.id }));
                }}
              />
              <Button title="閉じる" onPress={() => setModalVisible(false)} />
            </View>
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
};
