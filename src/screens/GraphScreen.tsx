// import { useTailwind } from "tailwind-rn/dist";
// import { View, Text, SafeAreaView } from "react-native";
// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../App";
// import { useSelector } from "react-redux";
// import { RootReducer } from "../../App";
// import { Picker } from "@react-native-picker/picker";
// import { useState } from "react";

// // type Props = NativeStackScreenProps<RootStackParamList, "Graph">;

// const GraphScreen = () => {
//   const tailwind = useTailwind();
//   const { user } = useSelector(({ user }: RootReducer) => user);
//   const {
//     selectCategory: { primary, secondary },
//   } = useSelector(({ categories }: RootReducer) => categories);
//   const [selectedLanguage, setSelectedLanguage] = useState();

//   return (
//     <SafeAreaView style={tailwind("flex-1")}>
//       <Picker
//         selectedValue={primary?.name}
//         onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
//       >
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="JavaScript" value="js" />
//       </Picker>
//     </SafeAreaView>
//   );
// };
// export default GraphScreen;
