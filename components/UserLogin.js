import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import LottieView from "lottie-react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as rnauth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./ActivityIndicator/Loader";
import { setUserLoading, setUser } from "../redux/slices/userSlice";
import { colors } from "../colors";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const UserLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const { userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId:
      "490604024450-flf9dd2d2iapoee05vee45n74ojjpk5r.apps.googleusercontent.com",
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const user = userCredential.user;

      // Check if displayName is defined before using it
      const username = user?.displayName || "DefaultUsername";

      navigation.navigate("HomeScreen", { username });
      console.log("Google Sign-In Successful");

      // Wait for the authentication process to complete before navigating
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      if (error.code === "SIGN_IN_CANCELLED") {
        // Handle cancellation if needed
      }
    }
  };

  if (initializing) return null;

  const onDismissSnackBar = () => {
    setVisible(false);
    setSnackbarMessage("");
  };

  const handleLogin = async () => {
    try {
      if (email && password && isValidEmail(email)) {
        dispatch(setUserLoading(true));
        const userCredential = await signInWithEmailAndPassword(
          rnauth,
          email,
          password
        );
        const user = userCredential.user;

        // Check if displayName is available, use it; otherwise, use an empty string
        const displayName = user.displayName || "";

        dispatch(setUserLoading(false));
        navigation.navigate("HomeScreen", { username: displayName });
      } else {
        setSnackbarMessage("Please enter a valid email and password");
        setVisible(true);
      }
    } catch (error) {
      dispatch(setUserLoading(false));
      setVisible(true);
      setSnackbarMessage("An error occurred. Please try again later.");
    }
  };

  const isValidEmail = (email) => {
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
        onPress={onGoogleButtonPress}
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
