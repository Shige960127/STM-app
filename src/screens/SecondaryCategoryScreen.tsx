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
import {
  setSecondary,
  createSecondary,
  getSecondaries,
} from "@stores/categories";
import { SecondaryCategory } from "@stores/categories";
import Modal from "react-native-modal";
import Loading from "@components/Loading";

const Item = ({
  item,
  onPress,
}: {
  item: SecondaryCategory;
  onPress: () => void;
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={tailwind("bg-teal-500 p-2 border border-white")}
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
  const [newSecondary, setNewSecondary] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectCategory: { primary },
  } = useSelector(({ categories }: RootReducer) => categories);
  const { secondaryCategories, status } = useSelector(
    ({ categories }: RootReducer) => categories
  );

  useEffect(() => {
    setNewSecondary("");
    dispatch(getSecondaries({ primaryID: primary!.id }));
  }, [primary]);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={secondaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => {
              dispatch(setSecondary(item));
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
                onChangeText={(text) => setNewSecondary(text)}
                value={newSecondary}
              />
              <Button
                title="カテゴリーを追加"
                onPress={() => {
                  dispatch(
                    createSecondary({
                      secondary: newSecondary,
                      primaryId: primary!.id,
                    })
                  );
                  setModalVisible(false);
                  setNewSecondary("");
                  dispatch(getSecondaries({ primaryID: primary!.id }));
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
