import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import * as Font from "expo-font";

export const loadFonts = async () => {
  return Font.loadAsync({
    "sci-fi-font": require("../assets/images/Fonts/AquireBold-8Ma60.otf"),
  });
};
import React, { useEffect, useContext } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
// import { AuthContext, AuthProvider } from "../contexts/Auth";

const splashSound = require("../assets/media/splash.mp3");
const placeholderLogo = require("../assets/images/placeholderLogo.png");

//LOCKS SCREEN TO PORTRAIT
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  // const auth = useContext(AuthContext);

  useEffect(() => {
    lockOrientation();
    const soundObject = new Audio.Sound();
    const playSound = async (): Promise<void> => {
      try {
        await soundObject.loadAsync(splashSound);
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      } catch (err) {
        console.log(err);
      }
    };
    playSound();
    return (): void => {
      soundObject.unloadAsync();
    };
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    // <AuthProvider>
    <ImageBackground
      source={require("../assets/images/mainBackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/cosmicLogo.png")}
          style={styles.logo}
        />
        <Link href={"./LoginPage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"./SignUpPage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
    // </AuthProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    marginBottom: 100,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
