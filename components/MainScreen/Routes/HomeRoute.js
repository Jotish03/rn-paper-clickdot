import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../colors";
import LottieView from "lottie-react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Searchbar,
} from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const HomeRoute = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {};
  const route = useRoute();
  const { params } = route;
  const { username } = params;
  return (
    <View style={styles.container}>
      <Card.Title
        titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        subtitleStyle={{ fontSize: 12 }}
        title={`Welcome ${username}`}
        subtitle="Your Profile"
        left={(props) => (
          <LottieView
            {...props}
            style={{ width: 90, height: 90, left: -12 }}
            source={require("../../../assets/NewLogo.json")}
            autoPlay
            loop
          />
        )}
      />
      <Searchbar
        style={{ margin: 15 }}
        placeholder="Search"
        onChangeText={(e) => setSearchQuery(e)}
        value={searchQuery}
      />
      <ScrollView>
        <Card style={styles.imageContainer} elevation={5}>
          <Card.Cover source={require("../../../assets/images/banner.png")} />
          <Card.Actions style={styles.cardActions}>
            <Button mode="elevated">Learn Native</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.imageContainer} elevation={5}>
          <Card.Cover source={require("../../../assets/images/banner2.png")} />
          <Card.Actions style={styles.cardActions}>
            <Button mode="elevated">Learn Script</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.imageContainer} elevation={5}>
          <Card.Cover source={require("../../../assets/images/banner3.jpg")} />
          <Card.Actions style={styles.cardActions}>
            <Button mode="contained">Learn Java</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.imageContainer} elevation={5}>
          <Card.Cover source={require("../../../assets/images/banner4.jpg")} />
          <Card.Actions style={styles.cardActions}>
            <Button mode="contained">Learn Python</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

export default HomeRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    margin: 16,
    overflow: "hidden",
  },
  cardActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    // Adjust the background color as needed
  },
});
