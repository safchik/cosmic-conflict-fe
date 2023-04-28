import React, { FC } from "react";
import { useFormik, FormikValues } from "formik";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { postAccount } from "../utils/api";
import * as Yup from "yup";

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = () => {
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values: FormikValues) => {},
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
  });
  const handleSubmit = () => {
    if (formik.values.password !== formik.values.confirmPassword) {
      alert("Passwords Must Match!");
    } else {
      const accountInfo = {
        email: formik.values.email,
        username: formik.values.username,
        password: formik.values.password,
      };
      postAccount(accountInfo);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("confirmPassword")}
        value={formik.values.confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.createAccount}>
        <Pressable onPress={handleSubmit}>
          <Text>Create Account</Text>
        </Pressable>
      </View>
    </View>
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
});

export default SignUpPage;
