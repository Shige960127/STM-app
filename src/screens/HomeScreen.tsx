import { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../stores/user";
import { AppDispatch } from "../stores/index";
import { RootReducer } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = () => {
  const tailwind = useTailwind();
  // const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(({ user }: RootReducer) => user);
  const [modal, toggleModal] = useState(false);
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>Email:{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleModal(true)}>
        <Text>SignOut</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          toggleModal(!modal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>サインアウトしますか？</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => toggleModal(!modal)}
            >
              <Text style={styles.textStyle}>サインアウトする</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
