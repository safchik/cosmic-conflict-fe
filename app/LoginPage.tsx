import React, { FC, useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { getUserCharacter, login } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";

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

  return (
    <LinearGradient colors={["#3D3D3D", "#7DF9FF"]} style={styles.form}>
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
              const userCharacter = await getUserCharacter(
                "characterName",
                character[0].characterName
              );
              await setAsyncStorage("user", userCharacter.character);
              router.push({ pathname: "./CharacterPage" });
            } catch (error) {
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
    </LinearGradient>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
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
    backgroundColor: "white",
  },
  backButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    position: "absolute",
    top: 50,
    right: 5,
    zIndex: 1,
  },
});
