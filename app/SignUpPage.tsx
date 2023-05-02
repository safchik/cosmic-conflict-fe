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
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Should be a min of 5 characters")
    .max(16, "Should be a max of 16 characters")
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please Confirm Your Password"),
  username: Yup.string()
    .min(5, "Should be a minimum of 5 characters")
    .required(),
  race: Yup.string().required("Please select a race"),
});

const SignUpPage: FC<SignUpPageProps> = () => {
  const [user, setUser] = useState<object>({});
  //needed for Go Back Button
  const router = useRouter();
  const human = require("../assets/images/human.png");
  const alien = require("../assets/images/alien.png");

  return (
    <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Create your character</Text>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          race: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          const newAccount = {
            email: values.email,
            username: values.username,
            password: values.password,
            race: values.race,
          };
          setUser(newAccount);
          postAccount(newAccount);
          router.push({ pathname: "./Account" });
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
            <Text>Select your race: {values.race}</Text>
            <View style={styles.images}>
              <Pressable
                style={{
                  backgroundColor: values.race === "Alien" ? "#000" : "#ccc",
                  padding: 1,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  borderWidth: 2,
                }}
                onPress={() => handleChange("race")("Human")}
              >
                <Image style={styles.eachImage} source={human} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: values.race === "Human" ? "#000" : "#ccc",
                  padding: 1,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  borderWidth: 2,
                }}
                onPress={() => handleChange("race")("Alien")}
              >
                <Image style={styles.eachImage} source={alien} />
              </Pressable>
            </View>
            <View style={styles.bonuses}>
              <Text style={styles.eachBonusText}>20% Defence Bonus</Text>
              <Text style={styles.eachBonusText}>20% Attack Bonus</Text>
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
});

export default SignUpPage;
