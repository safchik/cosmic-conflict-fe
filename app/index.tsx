import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";

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
        <Link href={"./LoginPage"}>
          <Button theme="login" label="Login" onPress={null} />
        </Link>
        <Link href={"./SignUpPage"}>
          <Button theme="signUp" label="Sign Up" onPress={null} />
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
});
