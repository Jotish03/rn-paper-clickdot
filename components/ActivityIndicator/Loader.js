import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Loader = ({ size }) => (
  <View style={{ flexDirection: "row", justifyContent: "center", padding: 8 }}>
    <ActivityIndicator
      size={size}
      animating={true}
      color={MD2Colors.black800}
    />
  </View>
);

export default Loader;
