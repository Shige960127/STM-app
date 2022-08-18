import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "./src/screen/SignUpScreen";
import SignInScreen from "./src/screen/SignInScreen";
import HomeScreen from "./src/screen/HomeScreen";
import WaveformScreen from "./src/screen/WaveformScreen";
import TimerScreen from "./src/screen/TimerScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, Provider, useDispatch } from "react-redux";
import { UserState, getUser } from "./src/store/user";
import store from "./src/store";

export type RootStackParamList = {
  Main: undefined;
  Initial: undefined;
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Account: undefined;
  Waveform: undefined;
  Timer: undefined;
};

export type RootReducer = {
  user: UserState;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const WaveformStack = createNativeStackNavigator();
function WaveformStackScreen() {
  return (
    <WaveformStack.Navigator>
      <WaveformStack.Screen name="Waveform" component={WaveformScreen} />
    </WaveformStack.Navigator>
  );
}
const TimerStack = createNativeStackNavigator();
function TimerStackScreen() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen name="Timer" component={TimerScreen} />
    </TimerStack.Navigator>
  );
}

const MainScreen = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="WaveformStack"
      component={WaveformStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="TimerStack"
      component={TimerStackScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const InitialScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="SignUp"
      component={SignUpScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="SignIn"
      component={SignInScreen}
    />
  </Stack.Navigator>
);

const RootScreen = () => {
  const { status, isLogined } = useSelector(({ user }: RootReducer) => user);
  const dispatch = useDispatch();
  if (status === "initial") {
    dispatch(getUser());
  }
  return (
    <Stack.Navigator initialRouteName="Initial">
      {isLogined ? (
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <RootScreen />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
