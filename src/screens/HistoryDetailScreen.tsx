import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useState } from "react";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { changeMeansuringTime, deleteHistory } from "@stores/history";
import { AppDispatch } from "../stores/index";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryDetail">;

export default ({ route, navigation }: Props) => {
  const { item } = route.params;
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [editTimeModal, toggleEditTimeModal] = useState(false);

  const deleteModalClose = () => toggleDeleteModal(false);
  const editTimeModalClose = () => toggleEditTimeModal(false);

  const deleteItem = () => {
    dispatch(deleteHistory({ historyId: item.id }));
    deleteModalClose();
    navigation.goBack();
  };

  const editTimeItem = ({ measuring_time }: { measuring_time: string }) => {
    dispatch(
      changeMeansuringTime({
        historyId: item.id,
        measuringTime: measuring_time,
      })
    );
    editTimeModalClose();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("p-4")}>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Primary：{item.primary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Secondary：{item.secondary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Tertiary：{item.tertiary_name}
          </Text>
        </View>
        <View style={tailwind("bg-white border p-4 rounded-xl mb-2")}>
          <Text style={tailwind("font-bold text-lg")}>
            Timer：{item.measuring_time}秒
          </Text>
        </View>
        <TouchableOpacity
          style={tailwind("bg-blue-900 p-4 rounded-xl mt-12")}
          onPress={() => toggleEditTimeModal(true)}
        >
          <Text style={tailwind("font-bold text-white text-center text-xl")}>
            時間を修正
          </Text>
        </TouchableOpacity>
        {editTimeModal && (
          <EditTimeModal
            isVisible={editTimeModal}
            editTimeItem={editTimeItem}
            close={editTimeModalClose}
          />
        )}
        <TouchableOpacity
          style={tailwind("bg-red-900 p-4 rounded-xl mt-12")}
          onPress={() => toggleDeleteModal(true)}
        >
          <Text style={tailwind("font-bold text-white text-center text-xl")}>
            削除
          </Text>
        </TouchableOpacity>
      </View>
      {deleteModal && (
        <DeleteModal
          isVisible={deleteModal}
          deleteItem={deleteItem}
          close={deleteModalClose}
        />
      )}
    </SafeAreaView>
  );
};

const DeleteModal = ({
  isVisible,
  close,
  deleteItem,
}: {
  isVisible: boolean;
  close: () => void;
  deleteItem: () => void;
}) => {
  const tailwind = useTailwind();

  return (
    <Modal isVisible={isVisible} onBackdropPress={close}>
      <View style={tailwind("bg-white p-8 rounded-xl")}>
        <View>
          <Text style={tailwind("font-bold text-xl text-center")}>
            削除しますか？
          </Text>
        </View>
        <TouchableOpacity
          style={tailwind("mt-5 bg-black p-4 rounded-xl")}
          onPress={deleteItem}
        >
          <Text style={tailwind("font-bold text-center text-white")}>
            削除する
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const EditTimeModal = ({
  isVisible,
  editTimeItem,
  close,
}: {
  isVisible: boolean;
  editTimeItem: () => void;
  close: () => void;
}) => {
  const [time, setTime] = useState("");
  const tailwind = useTailwind();
  return (
    <Modal isVisible={isVisible} onBackdropPress={close}>
      <View style={tailwind("bg-white p-8 rounded-xl")}>
        <View>
          <Text style={tailwind("font-bold text-center")}>計測時間を修正</Text>
        </View>
        <TextInput
          style={tailwind("border rounded-md px-2 py-1 mt-1")}
          value={time}
          onChangeText={(text) => setTime(text)}
          autoFocus
        />
        <TouchableOpacity
          style={tailwind("mt-5 bg-black p-4 rounded-xl")}
          onPress={() => editTimeItem({ measuring_time: time })}
        >
          <Text style={tailwind("font-bold text-center text-white")}>
            時間を変更
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
