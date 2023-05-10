import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGlobalStorage from "../hooks/useGlobalStorage";
import * as api from "../utils/api";

const CharacterPage: React.FC = () => {
  const { value } = useGlobalStorage("user");
  const [character, setCharacter] = useState({});

  // console.log({ value });
  useEffect(() => {
    async function updateCharacter() {
      if (value) {
        await setCharacter(value);
      }
    }

    updateCharacter();
    // console.log({ character });
  }, [value]);

  return (
    <ImageBackground
      source={require("../assets/images/charPageBG.jpg")}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>{character.characterName}</Text>
        </View>
        <View style={styles.imageWrapper}>
          {character.race === "human" ? (
            <Image
              source={require("../assets/images/human.png")}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/images/alien.png")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Attack </Text>
          <Text style={[styles.value, { color: "red" }]}>
            {character.attack}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Defence </Text>
          <Text style={[styles.value, { color: "#939596" }]}>
            {character.defence}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Credits </Text>
          <Text style={styles.value}>{character.gold}</Text>
        </View>
        {/* <View>
          <Text style={[styles.items, { color: "white" }]}>Inventory </Text>
          {character.inventory.map((item) => {
            return (
              <Text key={item} style={styles.items}>
                {item}
              </Text>
            );
          })}
        </View> */}
        <View>
          <Link href={"./Shop"}>
            <TouchableOpacity style={styles.button} >
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
    </ImageBackground>
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
    marginBottom: 15,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
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
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 20,
    color: "gold",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  items: {
    marginVertical: 2,
    fontSize: 18,
    alignSelf: "center",
    color: "#55f27f",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginVertical: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default CharacterPage;
