import React, { FC, useContext, useEffect, useState } from "react";
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

//Form validation
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { login } from "../utils/api";

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
    <SafeAreaView style={styles.form}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const account = {
            username: values.username,
            password: values.password,
          };
          login(account);
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
              <Text>Username</Text>
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
              <Text>Password</Text>
              {touched.password && errors.password && (
                <Text>{errors.password}</Text>
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
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f62681",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
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
