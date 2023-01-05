import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@stores/index";
import { handleSignOut } from "@stores/user";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <SafeAreaView style={tailwind("flex-1 relative")}>
      <TouchableOpacity
        style={tailwind(
          "absolute w-full bottom-0 mb-10 bg-blue-900 p-6 rounded-xl"
        )}
        onPress={() => dispatch(handleSignOut())}
      >
        <Text style={tailwind("text-center text-white font-bold")}>
          サインアウトする
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
