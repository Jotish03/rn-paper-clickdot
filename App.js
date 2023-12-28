import * as React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { store } from "./redux/store";
import AppNavigate from "./navigation/AppNavigate";
import { Provider } from "react-redux";
import {
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { colors } from "./colors";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
  },
};
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigate />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
