import React, { useRef, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { colors } from "../colors";
import LottieView from "lottie-react-native";

const UserRegister = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          style={{ width: 90, height: 90 }}
          source={require("../assets/NewLogo.json")}
          autoPlay
          loop
        />
        <Text style={styles.logoText}>#clickdot</Text>
      </View>
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>
          Embark on Your Digital Journey: Effortless Registration
        </Text>
      </View>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword} // Use secureTextEntry for the password input
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.textInput}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={!showPassword} // Use secureTextEntry for the password input
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.textInput}
      />
      <Button style={styles.loginBtn} mode="contained" onPress={handleLogin}>
        Register
      </Button>

      <View style={styles.signupTextContainer}>
        <Text style={styles.signUpText}>Already Registered? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.linkRegister}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30, // Add padding for better spacing
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40, // Add margin for separation
    marginLeft: -35,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    marginLeft: -10, // Add spacing between logo and text
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    // Set the text color to 'white'
  },
  textInput: {
    width: "100%", // Use 100% width for TextInput
    marginBottom: 12, // Add margin for separation
  },
  loginBtn: {
    width: "100%",
    borderRadius: 5,
  },
  loginGoogle: {
    width: "100%",
    marginTop: 15,
    borderRadius: 5,
  },
  subTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, // Added margin for separation
    marginTop: -60,
  },
  subText: {
    textAlign: "center", // Center the text
    fontSize: 16, // Adjusted font size
    color: "white",
    padding: 20, // Added padding for better visual appeal
  },
  signupTextContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  signUpText: {
    color: "white",
  },
  linkRegister: {
    color: colors.primary,
  },
});
