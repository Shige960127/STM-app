import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores/index";
import { handleSignOut } from "../stores/user";
import { useTailwind } from "tailwind-rn/dist";

export default () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      onPress={() => dispatch(handleSignOut())}
      style={tailwind("")}
    >
      <Text style={tailwind("")}>SignOut</Text>
    </TouchableOpacity>
  );
};
