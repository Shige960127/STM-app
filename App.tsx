import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "@screens/SignUpScreen";
import SignInScreen from "@screens/SignInScreen";
import HomeScreen from "@screens/HomeScreen";
import HistoryDetailScreen from "@screens/HistoryDetailScreen";
import AnalizeScreen from "@screens/AnalizeScreen";
import TimerScreen from "@screens/TimerScreen";
import PrimaryCategoryScreen from "@screens/PrimaryCategoryScreen";
import SecondaryCategoryScreen from "@screens/SecondaryCategoryScreen";
import AccountScreen from "@screens/AccountScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, Provider, useDispatch } from "react-redux";
import { UserState, checkLogin } from "@stores/user";
import { CategoryState } from "@stores/categories";
import { HistoryState, History } from "@stores/history";
import store, { AppDispatch } from "@stores/index";
import { AntDesign } from "@expo/vector-icons";
import TertiaryCategoryScreen from "@screens/TertiaryCategoryScreen";

export type HomeStackParamList = {
  HomeTop: undefined;
  HistoryDetail: {
    item: History;
  };
};

type AnalizeStackParamList = {
  AnalizeTop: undefined;
};

type TimerStackParamList = {
  TimerTop: undefined;
  AccountTop: undefined;
  Primary: undefined;
  Secondary: undefined;
  Tertiary: undefined;
};

type InitialScreenParamList = {
  Initial: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

type MainScreenParamList = {
  Main: undefined;
} & HomeStackParamList &
  AnalizeStackParamList &
  TimerStackParamList;

export type RootStackParamList = MainScreenParamList & InitialScreenParamList;

export type TabParamList = {
  Home: undefined;
  Timer: undefined;
  Analize: undefined;
  Account: undefined;
};

export type RootReducer = {
  user: UserState;
  categories: CategoryState;
  history: HistoryState;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeTop"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </HomeStack.Navigator>
  );
};
const AnalizeStack = createNativeStackNavigator<AnalizeStackParamList>();
const AnalizeStackScreen = () => {
  return (
    <AnalizeStack.Navigator>
      <AnalizeStack.Screen
        name="AnalizeTop"
        component={AnalizeScreen}
        options={{ headerShown: false }}
      />
    </AnalizeStack.Navigator>
  );
};
const TimerStack = createNativeStackNavigator<TimerStackParamList>();
const TimerStackScreen = () => {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name="TimerTop"
        component={TimerScreen}
        options={{ headerShown: false }}
      />
      <TimerStack.Screen name="Primary" component={PrimaryCategoryScreen} />
      <TimerStack.Screen name="Secondary" component={SecondaryCategoryScreen} />
      <TimerStack.Screen name="Tertiary" component={TertiaryCategoryScreen} />
    </TimerStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();
const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountTop"
        component={AccountScreen}
        options={{ headerTitle: "Account" }}
      />
    </AccountStack.Navigator>
  );
};

type tabScreenIcon = "home" | "linechart" | "clockcircleo" | "user";
const screenNameIcon: { [key: string]: tabScreenIcon } = {
  Home: "home",
  Analize: "linechart",
  Timer: "clockcircleo",
  Account: "user",
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
    <Tab.Screen
      name="Account"
      component={AccountStackScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const InitialStack = createNativeStackNavigator<InitialScreenParamList>();

const InitialScreen = () => (
  <InitialStack.Navigator initialRouteName="SignIn">
    <InitialStack.Screen
      options={{ headerShown: false }}
      name="SignUp"
      component={SignUpScreen}
    />
    <InitialStack.Screen
      options={{ headerShown: false }}
      name="SignIn"
      component={SignInScreen}
    />
  </InitialStack.Navigator>
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
