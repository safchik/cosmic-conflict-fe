import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const CharacterPage = () => {
  return (
    <LinearGradient colors={["#f62681", "#2e4cff"]} style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text style={styles.label}>Attack Power: </Text>
          <Text style={styles.value}>100</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Defence Power: </Text>
          <Text style={styles.value}>110</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gold: </Text>
          <Text style={styles.value}>525</Text>
        </View>
        <View>
          <Link href={"./Shop"}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Shop</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View>
          <Link href={"./UserListPage"}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Battle!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
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

export default CharacterPage;
