import React, { FC, createContext, useEffect, useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { setAsyncStorage } from "../utils/asyncStorage";

//Form validation
import * as Yup from "yup";
import { useNavigation, useRouter } from "expo-router";
import { createNewAccount } from "../utils/api";
import { Audio } from "expo-av";

interface SignUpPageProps {
  human: Image;
  alien: Image;
}

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

//defines the schema for the form, i.e. the rules for each field
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required").lowercase(),
  password: Yup.string()
    .matches(/^\S*$/, "Password should not contain spaces")
    .min(5, "Should be a min of 5 characters")
    .max(16, "Should be a max of 16 characters")
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please Confirm Your Password"),
  username: Yup.string()
    .matches(/^\S*$/, "Username should not contain spaces")
    .min(5, "Should be a minimum of 5 characters")
    .required(),
});

const SignUpPage: FC<SignUpPageProps> = () => {
  //needed for Go Back Button
  const router = useRouter();
  const [error, setError] = useState(null);

  // Define an array of background images
  const backgroundImages = [
    require("../assets/collection/fightscene/scene6.jpg"),
    require("../assets/collection/fightscene/scene7.jpg"),
    require("../assets/collection/fightscene/scene8.jpg"),
    require("../assets/collection/fightscene/scene9.jpg"),
    require("../assets/collection/fightscene/scene91.jpg"),
  ];

  const backgroundSound = require("../assets/media/suspence.wav");

  // Define state to keep track of the current background image
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  // Use the useEffect hook to change the background image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 10000);
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
      <Text style={styles.title}>Create your character</Text>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const newAccount = {
            email: values.email,
            username: values.username,
            password: values.password,
          };
          const newUser = {
            username: values.username,
          };

          await setAsyncStorage("user", newUser);

          createNewAccount(newAccount)
            .then((response) => {
              router.push({ pathname: "./RaceSelect" });
            })
            .catch((err) => {
              console.log(err.message);
              setError(err.message);
            });
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
              {error === null ? null : (
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                >
                  {error}
                </Text>
              )}
              <Text style={styles.formText}>Email</Text>
              {touched.email && errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="email"
              />
            </View>
            <View>
              <Text style={styles.formText}>Username</Text>
              {touched.username && errors.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
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
              <Text style={styles.formText}>Password</Text>
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
            <View>
              <Text style={styles.formText}>Confirm Password</Text>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              )}
              <TextInput
                style={styles.input}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="confirm password"
                secureTextEntry
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={(e: any) => handleSubmit(e)}
              >
                <Text style={styles.buttonText}>Choose Your Race</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text>Go Back</Text>
      </Pressable>
    </ImageBackground>
  );
};

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
  formText: {
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
    marginBottom: 25,
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { width: 2, height: 2 },
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
    borderColor: "black",
    borderWidth: 2,
  },
  button: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
  },
  images: {
    display: "flex",
    flexDirection: "row",
  },
  eachImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
  bonuses: {
    display: "flex",
    flexDirection: "row",
  },
  eachBonusText: {
    marginRight: 12,
    marginLeft: 5,
  },
  backButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#b7a8c9",
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

export default SignUpPage;
