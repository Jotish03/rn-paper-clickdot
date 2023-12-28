import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import LottieView from "lottie-react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./ActivityIndicator/Loader";
import { setUserLoading } from "../redux/slices/userSlice";
import { colors } from "../colors";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Add this line
  const { userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onDismissSnackBar = () => {
    setVisible(false);
    setSnackbarMessage("");
  };

  const handleLogin = async () => {
    try {
      if (email && password && isValidEmail(email)) {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
        navigation.navigate("HomeScreen");
      } else {
        setSnackbarMessage("Please enter a valid email and password");
        setVisible(true);
      }
    } catch (error) {
      dispatch(setUserLoading(false));
      console.error(error);

      let errorMessage = "An error occurred. Please try again.";

      // Customize error messages based on Firebase error codes
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please enter a valid email.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "Invalid credentials. Please check your email and password.";
          break;
        default:
          break;
      }

      setSnackbarMessage(errorMessage);
      setVisible(true);
    }
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here
    // For a basic validation, you can use a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          Your Gateway to a World of Wonders: Securely Login with a Click
        </Text>
      </View>
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
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.textInput}
      />
      {userLoading ? (
        <Loader size={"small"} />
      ) : (
        <Button
          style={styles.loginBtn}
          mode="contained"
          onPress={handleLogin}
          disabled={userLoading}
        >
          {userLoading ? <Loader size="small" /> : "Login"}
        </Button>
      )}

      <Button
        style={styles.loginGoogle}
        icon="google"
        mode="outlined"
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Login with Google
      </Button>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signUpText}>Not Registered? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkRegister}>Register Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.snackbar}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Close",
          }}
        >
          <Text style={styles.snackbarText}>{snackbarMessage}</Text>
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginLeft: -35,
  },
  logoText: {
    marginLeft: -10,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    marginBottom: 12,
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
    marginVertical: 10,
    marginTop: -60,
  },
  subText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    padding: 20,
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
  snackbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.error,
  },
  snackbarText: {
    color: colors.background,
  },
});

export default UserLogin;
