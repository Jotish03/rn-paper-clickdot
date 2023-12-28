import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  Avatar,
  Card,
  Divider,
  IconButton,
  Menu,
  BottomNavigation,
} from "react-native-paper";
import { colors } from "../../colors";
import HomeRoute from "./Routes/HomeRoute";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
//navigation bottom

const LearnRoute = () => <Text>Learn</Text>;

const SettingRoute = () => <Text>Setting</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = React.useState(0);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [routes] = useState([
    {
      key: "fav",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "learn", title: "Learn", focusedIcon: "book-open-page-variant" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
    { key: "setting", title: "Setting", focusedIcon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    fav: HomeRoute,
    learn: LearnRoute,
    notifications: NotificationsRoute,
    setting: SettingRoute,
  });
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="#clickdot" titleStyle={styles.headerTitle} />
        <Avatar.Icon size={24} icon="account" />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={MORE_ICON} onPress={openMenu} />}
        >
          <Menu.Item leadingIcon="account" onPress={() => {}} title="Profile" />
          <Menu.Item
            leadingIcon="account-edit"
            onPress={() => {}}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            leadingIcon="logout"
            onPress={handleLogout}
            title="Logout"
          />
        </Menu>
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontWeight: "bold",
  },
});
