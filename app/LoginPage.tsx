import React, { FC, useState, useEffect } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";

import * as api from "../utils/api";

import { getUserCharacter, login } from "../utils/api";
import { Audio } from "expo-av";

//Form validation
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { setAsyncStorage } from "../utils/asyncStorage";

interface LoginPageProps {}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(5, "Should be a min of 5 characters")
    .max(16, "Should be a max of 16 characters")
    .required(),
});

const LoginPage: FC<LoginPageProps> = () => {
  //needed for Go Back Button
  const router = useRouter();
  const [error, setError] = useState(false);

  // Define an array of background images
  const backgroundImages = [
    require("../assets/collection/fightscene/scene2.png"),
    require("../assets/collection/fightscene/scene3.png"),
    require("../assets/collection/fightscene/scene4.png"),
    require("../assets/collection/fightscene/scene5.png"),
  ];

  const backgroundSound = require("../assets/media/radio.wav");

  // Define state to keep track of the current background image
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  // Use the useEffect hook to change the background image every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImageIndex]);

  useEffect(() => {
    const soundObject = new Audio.Sound();
    const playSound = async (): Promise<void> => {
      try {
        await soundObject.loadAsync(backgroundSound);
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
    <ImageBackground
      source={backgroundImages[backgroundImageIndex]}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.form}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              await setAsyncStorage("user", values.username);
              const { character } = await login(values);
              console.log("character", character);
              await setAsyncStorage("user", character[0]);
              router.push({ pathname: "./CharacterPage" });
            } catch (error) {
              setError(true);
              console.error(error);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View>
                {error === false ? null : (
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    Incorrect Username or Password
                  </Text>
                )}
                <Text style={{ fontWeight: "bold" }}>Username</Text>
                {touched.username && errors.username && (
                  <Text>{errors.username}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  placeholder="username"
                />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Password</Text>
                {touched.password && errors.password && (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="password"
                  secureTextEntry
                />
              </View>
              <View style={styles.createAccount}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={(e: any) => handleSubmit(e)}
                  style={styles.button}
                >
                  <Text>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  createAccount: {
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#b094cc",
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  backButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#b094cc",
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    position: "absolute",
    top: 50,
    right: 5,
    zIndex: 1,
  },
});
