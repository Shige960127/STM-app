import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "@screens/SignUpScreen";
import SignInScreen from "@screens/SignInScreen";
import HomeScreen from "@screens/HomeScreen";
import AnalizeScreen from "@screens/AnalizeScreen";
import TimerScreen from "@screens/TimerScreen";
import PrimaryCategoryScreen from "@screens/PrimaryCategoryScreen";
import SecondaryCategoryScreen from "@screens/SecondaryCategoryScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, Provider, useDispatch } from "react-redux";
import { UserState, checkLogin } from "@stores/user";
import { CategoryState } from "@stores/categories";
import { HistoryState } from "@stores/history";
import store, { AppDispatch } from "@stores/index";
import { AntDesign } from "@expo/vector-icons";

export type RootStackParamList = {
  Initial: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
  HomeTop: undefined;
  TimerTop: undefined;
  AnalizeTop: undefined;
  Account: undefined;
  Primary: undefined;
  Secondary: undefined;
};

export type TabParamList = {
  Home: undefined;
  Timer: undefined;
  Analize: undefined;
};

export type RootReducer = {
  user: UserState;
  categories: CategoryState;
  history: HistoryState;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeTop"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
const AnalizeStack = createNativeStackNavigator();
function AnalizeStackScreen() {
  return (
    <AnalizeStack.Navigator>
      <AnalizeStack.Screen
        name="AnalizeTop"
        component={AnalizeScreen}
        options={{ headerShown: false }}
      />
    </AnalizeStack.Navigator>
  );
}
const TimerStack = createNativeStackNavigator();
function TimerStackScreen() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name="TimerTop"
        component={TimerScreen}
        options={{ headerShown: false }}
      />
      <TimerStack.Screen name="Primary" component={PrimaryCategoryScreen} />
      <TimerStack.Screen name="Secondary" component={SecondaryCategoryScreen} />
    </TimerStack.Navigator>
  );
}

type tabScreenIcon = "home" | "linechart" | "clockcircleo";
const screenNameIcon: { [key: string]: tabScreenIcon } = {
  Home: "home",
  Analize: "linechart",
  Timer: "clockcircleo",
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
      name="Home"
      component={HomeStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Timer"
      component={TimerStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Analize"
      component={AnalizeStackScreen}
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
        <>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </>
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
