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
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList, RootReducer } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setPrimary, createPrimary, getPrimaries } from "@stores/categories";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { AppDispatch } from "@stores/index";
import { PrimaryCategory } from "@stores/categories";
import Loading from "@components/Loading";

const Item = ({
  item,
  onPress,
}: {
  item: PrimaryCategory;
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
    useNavigation<NavigationProp<RootStackParamList, "Primary">>();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPrimary, setNewPrimary] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector(({ user }: RootReducer) => user);
  const { primaryCategories, status } = useSelector(
    ({ categories }: RootReducer) => categories
  );

  useEffect(() => {
    setNewPrimary("");
    dispatch(getPrimaries({ userID: user!.id }));
  }, [user]);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <FlatList
        data={primaryCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => {
              dispatch(setPrimary(item));
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
                onChangeText={(text) => setNewPrimary(text)}
                value={newPrimary}
              />
              <Button
                title="カテゴリーを追加"
                onPress={() => {
                  dispatch(
                    createPrimary({ primary: newPrimary, userId: user!.id })
                  );
                  setModalVisible(false);
                  setNewPrimary("");
                  dispatch(getPrimaries({ userID: user!.id }));
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
