import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

interface AccountProps {
  logout: () => void;
}
const gold = require("../assets/images/gold.jpeg");

const Shop: FC<AccountProps> = ({ logout }) => {
  const user = {
    username: "johnpaul",
    email: "johnpaul@test.com",
    race: "Human",
  };

  return (
    <ImageBackground
      source={require("../assets/images/shop/shop-background.jpg")}
      style={styles.background}
    >
      <Text style={styles.title}>Item Shop</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Power</Text>
        <Text style={styles.header}>Cost</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weapons: </Text>
      </View>
      <View>
        <Text style={styles.item}>Laser Baton</Text>
        <Text style={styles.item}>Plasma Sword</Text>
        <Text style={styles.item}>Beam Rifle</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Armour: </Text>
      </View>
      <View>
        <Text style={styles.item}>Wooden Shield</Text>
        <Text style={styles.item}>Durasteel Protector</Text>
        <Text style={styles.item}>Electrum Defender</Text>
      </View>
      <Link href={"./Shop"}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Purchase</Text>
        </Pressable>
      </Link>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 40,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 170,
  },
  item: {
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
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Shop;
