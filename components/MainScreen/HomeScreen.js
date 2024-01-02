import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Platform } from "react-native";
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
import { auth as rnauth } from "../../config/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const LearnRoute = () => <Text>Learn</Text>;
const SettingRoute = () => <Text>Setting</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const routes = [
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
  ];

  const renderScene = BottomNavigation.SceneMap({
    fav: HomeRoute,
    learn: LearnRoute,
    notifications: NotificationsRoute,
    setting: SettingRoute,
  });
  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const userGoogle = auth().currentUser;

        if (userGoogle) {
          const userInfo = await GoogleSignin.signInSilently();
          setUserProfilePicture(userInfo?.user?.photo);
        }
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    fetchUserProfilePicture();
  }, []);
  const handleLogout = async () => {
    try {
      const user = rnauth.currentUser;
      const userGoogle = auth().currentUser;

      if (user) {
        if (user.providerData[0].providerId === "password") {
          await signOut(rnauth);
        } else {
          // Handle other providers if needed
        }
      }

      if (userGoogle) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
      }

      navigation.navigate("Home");
      console.log("Sign Out Successful");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="#clickdot" titleStyle={styles.headerTitle} />
        {userProfilePicture ? (
          <Avatar.Image size={24} source={{ uri: userProfilePicture }} />
        ) : (
          <Avatar.Icon size={24} icon="account" />
        )}
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
  headerTitle: {
    fontWeight: "bold",
  },
});
