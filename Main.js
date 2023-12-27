import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Card,
  Appbar,
  Avatar,
  IconButton,
  Menu,
  Divider,
} from "react-native-paper";
import { colors } from "./colors";
import axios from "axios";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const Main = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        <Appbar.Content title="Home" />
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

      <SafeAreaView style={styles.container}>
        {data.map((user) => (
          <Card.Title
            key={user.id}
            title={user.name}
            subtitle={user.email}
            left={(props) => <Avatar.Icon {...props} icon="account" />}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={openMenu} />
            )}
          />
        ))}

        {/* Menu component */}
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
