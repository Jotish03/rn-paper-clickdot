import * as React from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import {
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { name as appName } from "./app.json";
import Main from "./Main";
import { colors } from "./colors";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import HomeScreen from "./components/MainScreen/HomeScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={UserLogin}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={UserRegister}
          />
          <Stack.Screen
            name="HomeScreen"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Contacts"
            options={{ headerShown: false }}
            component={Main}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);
