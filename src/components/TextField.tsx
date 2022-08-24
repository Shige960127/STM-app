import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default ({
  onChange,
  value,
  placeholder,
  secureTextEntry,
}: {
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}) => {
  const tailwind = useTailwind();
  return (
    <TextInput
      style={tailwind("w-full h-8 border rounded p-2")}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      autoCapitalize={"none"}
      secureTextEntry={secureTextEntry}
    />
  );
};
