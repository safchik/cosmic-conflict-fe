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
import React, { useEffect, useState, useContext } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
// import { AuthContext, AuthProvider } from "../contexts/Auth";

const splashSound = require("../assets/media/splash.mp3");
const placeholderLogo = require("../assets/images/placeholderLogo.png");

export default function App() {
  // const auth = useContext(AuthContext);

  useEffect(() => {
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

  return (
    // <AuthProvider>
    <ImageBackground
      source={require("../assets/images/placeholderBg.webp")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={placeholderLogo} style={styles.logo} />
        <Link href={"./LoginPage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"./SignUpPage"} asChild>
          <Pressable style={styles.button}>
            <Text>Sign Up</Text>
          </Pressable>
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
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginTop: 50,
    marginBottom: 300,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
});
