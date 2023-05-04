import React, { FC, createContext, useState } from "react";
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
} from "react-native";
import { postAccount } from "../utils/api";

//Form validation
import * as Yup from "yup";
import { useNavigation, useRouter } from "expo-router";

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
  const [user, setUser] = useState<object>({});
  //needed for Go Back Button
  const router = useRouter();

  return (
    <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Create your character</Text>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          router.push({ pathname: "./CharacterPage" });
          console.log(values);
          const newAccount = {
            email: values.email,
            username: values.username,
            password: values.password,
          };
          setUser(newAccount);
          postAccount(newAccount);
          router.push({ pathname: "./RaceSelect" });
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
            <View style={styles.button}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={(e: any) => handleSubmit(e)}
              >
                <Text>Choose Your Race</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text>Go Back</Text>
      </Pressable>
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
  title: {
    fontSize: 40,
    marginBottom: 25,
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
    borderColor: "black",
    borderWidth: 2,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
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
    borderColor: "black",
    backgroundColor: "white",
    position: "absolute",
    top: 50,
    right: 5,
    zIndex: 1,
  },
});

export default SignUpPage;
