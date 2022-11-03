import { createDrawerNavigator } from "@react-navigation/drawer";
import SignOut from "./SignOut";

const Drawer = createDrawerNavigator();
function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="SignOut" component={SignOut} />
    </Drawer.Navigator>
  );
}

export default DrawerScreen;
