import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "@screens/SignUpScreen";
import SignInScreen from "@screens/SignInScreen";
import HomeScreen from "@screens/HomeScreen";
import GraphScreen from "@screens/GraphScreen";
import TimerScreen from "@screens/TimerScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, Provider, useDispatch } from "react-redux";
import { UserState, checkLogin } from "@stores/user";
import store, { AppDispatch } from "@stores/index";
import { AntDesign } from "@expo/vector-icons";

export type RootStackParamList = {
  Main: undefined;
  Initial: undefined;
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Account: undefined;
  Graph: undefined;
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
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const GraphStack = createNativeStackNavigator();
function GraphStackScreen() {
  return (
    <GraphStack.Navigator>
      <GraphStack.Screen
        name="Graph"
        component={GraphScreen}
        options={{ headerShown: false }}
      />
    </GraphStack.Navigator>
  );
}
const TimerStack = createNativeStackNavigator();
function TimerStackScreen() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name="Timer"
        component={TimerScreen}
        options={{ headerShown: false }}
      />
    </TimerStack.Navigator>
  );
}

type tabScreenIcon = "home" | "linechart" | "clockcircleo";
const screenNameIcon: { [key: string]: tabScreenIcon } = {
  HomeStack: "home",
  GraphStack: "linechart",
  TimerStack: "clockcircleo",
};
const MainScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => (
        <AntDesign
          name={screenNameIcon[route.name]}
          size={24}
          color={focused ? "red" : "brack"}
        />
      ),
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="GraphStack"
      component={GraphStackScreen}
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
  <Stack.Navigator initialRouteName="SignIn">
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
  const dispatch = useDispatch<AppDispatch>();
  if (status === "initial") {
    dispatch(checkLogin());
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
