import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default () => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={tailwind(
        "absolute bottom-0 right-0 mb-4 mr-4 bg-red-500 rounded-full w-20 h-20 flex items-center justify-center"
      )}
    >
      <Text style={tailwind("text-4xl")}>+</Text>
    </TouchableOpacity>
  );
};
