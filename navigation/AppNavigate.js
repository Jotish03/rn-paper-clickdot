import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import UserRegister from "../components/UserRegister";
import HomeScreen from "../components/MainScreen/HomeScreen";
import Main from "../Main";
import UserLogin from "../components/UserLogin";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUser } from "../redux/slices/userSlice";

const Stack = createStackNavigator();

const AppNavigate = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (u) => {
    console.log("user details ", u);
    dispatch(setUser(u));
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "HomeScreen" : "UserLogin"} // Use dynamic initial route based on user authentication status
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigate;
