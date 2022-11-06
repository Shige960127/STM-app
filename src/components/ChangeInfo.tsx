import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default ({ onPress }: { onPress: () => void }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={tailwind("flex-1 items-end mr-1 pr-1")}
      onPress={onPress}
    >
      <Text>•••</Text>
    </TouchableOpacity>
  );
};
