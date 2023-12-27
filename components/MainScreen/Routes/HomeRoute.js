import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../colors";

const HomeRoute = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeRoute</Text>
    </View>
  );
};

export default HomeRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
  },
});
