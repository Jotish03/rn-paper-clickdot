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

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
//navigation bottom

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = React.useState(0);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [routes] = useState([
    {
      key: "music",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "albums", title: "Albums", focusedIcon: "album" },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: HomeRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });
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
          <Menu.Item leadingIcon="logout" onPress={() => {}} title="Logout" />
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
