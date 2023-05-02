import React, { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AccountProps {
  logout: () => void;
}

const Account: FC<AccountProps> = ({ logout }) => {
  const user = {
    username: "johnpaul",
    email: "johnpaul@test.com",
    race: "Human",
  };

  return (
    <LinearGradient
      colors={["#f62681", "#2e4cff"]}
      style={styles.container}
    >
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Character Race:</Text>
        <Text style={styles.value}>{user.race}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email Address:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  value: {
    fontSize: 18,
    color: "white",
  },
  button: {
    marginTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Account;
