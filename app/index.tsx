import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import PageButton from "../components/PageButton";
import { Link } from "expo-router";
import React from "react";

const placeholderLogo = require("../assets/images/placeholderLogo.png");

export default function App() {
  const handleSignUp = () => {};

  return (
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
          <TouchableOpacity style={styles.button}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </Link>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
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
