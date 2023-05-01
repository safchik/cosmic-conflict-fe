import React, { FC, useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { postAccount } from "../utils/api";

//Form validation
import * as Yup from "yup";
import { useRouter } from "expo-router";

interface SignUpPageProps {}

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Should be a min of 5 characters")
    .max(16, "Should be a max of 16 characters")
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please Confirm Your Password"),
  username: Yup.string()
    .min(5, "Should be a minimum of 5 characters")
    .required(),
});

const SignUpPage: FC<SignUpPageProps> = () => {
  //needed for Go Back Button
  const router = useRouter();

  return (
    <SafeAreaView style={styles.form}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const newAccount = {
            email: values.email,
            username: values.username,
            password: values.password,
          };
          postAccount(newAccount);
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
              <Text>Email</Text>
              {touched.email && errors.email && <Text>{errors.email}</Text>}
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="email"
              />
            </View>
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
            <View>
              <Text>Confirm Password</Text>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{ color: "white" }}>{errors.confirmPassword}</Text>
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
            <View style={styles.createAccount}>
              <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
                <Text>Create Account</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <View>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
});

export default SignUpPage;
