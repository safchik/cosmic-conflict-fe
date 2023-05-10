import React, { FC, useEffect, useState } from "react";
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
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Form validation
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { getAsyncStorage, setAsyncStorage } from "../utils/asyncStorage";
import { createNewCharacter } from "../utils/api";
import { Audio } from "expo-av";

const splashSound = require("../assets/media/splash.mp3");

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
const SignupSchema = Yup.object().shape({
  race: Yup.string().required("Please select a race"),
});

const RaceSelect: FC<SignUpPageProps> = () => {
  //needed for Go Back Button
  const router = useRouter();
  const human = require("../assets/images/human.png");
  const alien = require("../assets/images/alien.png");
  const [character, setCharacter] = useState({});

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
    <ImageBackground
      source={require("../assets/collection/fightscene/download.gif")}
      style={styles.background}
      resizeMode="cover"
    >
    <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Select Your Race</Text>
      <Formik
        initialValues={{
          race: "",
          characterName: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const currentUser = await getAsyncStorage("user");

          const newCharacter = {
            race: values.race,
            characterName: values.characterName,
            username: currentUser.username,
          };
          createNewCharacter(newCharacter)
            .then(async (response) => {
              console.log("newChar", response.character);
              await setAsyncStorage("user", response.character);
              router.push({
                pathname: "./CharacterPage",
              });
            })
            .catch((err) => {
              // TODO render error message in UI
              // (shouldn't need one because can't fail two choice selection)
              throw err.message;
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
            <Text >{values.race}</Text>
            <View style={styles.images}>
              <Pressable
                style={{
                  backgroundColor: values.race === "alien" ? "#000" : "#ccc",
                  padding: 1,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  borderWidth: 2,
                }}
                onPress={() => handleChange("race")("human")}
              >
                <Image style={styles.eachImage} source={human} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: values.race === "human" ? "#000" : "#ccc",
                  padding: 1,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  borderWidth: 2,
                }}
                onPress={() => handleChange("race")("alien")}
              >
                <Image style={styles.eachImage} source={alien} />
              </Pressable>
            </View>
            <View style={styles.bonuses}>
              <Text style={styles.eachBonusText}>20% Defence Bonus</Text>
              <Text style={styles.eachBonusText}>20% Attack Bonus</Text>
            </View>
            <View>
              {touched.characterName && errors.characterName && (
                <Text>{errors.characterName}</Text>
              )}
              <TextInput
                style={styles.input}
                value={values.characterName}
                onChangeText={handleChange("characterName")}
                onBlur={handleBlur("characterName")}
                placeholder="Character Name"
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={(e: any) => handleSubmit(e)}
              >
                <Text>Create Account</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </LinearGradient>
      
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
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#99beeb",
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  backgroundImages: {
    display: "flex",
    flexDirection: "column"
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
});

export default RaceSelect;
