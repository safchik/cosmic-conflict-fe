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
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../components/ItemCard";
import { ScrollView } from "react-native-gesture-handler";

interface AccountProps {
  logout: () => void;
}
// const gold = require("../assets/images/gold.jpeg");

const Shop: FC<AccountProps> = ({ logout }) => {
  const user = {
    username: "player2",
    characterName: "Zorg",
    race: "alien",
    gold: 50,
    attack: 15,
    defense: 2,
  };
  // const testItem = {
  //   type: "weapon",
  //   itemName: "Laser Baton",
  //   attackStat: 10,
  //   defenceStat: 0,
  //   buff: "healing",
  //   cost: 100,
  // };
  return (
    <ImageBackground
      source={require("../assets/images/shop/shop-background2.jpg")}
      style={styles.background}
    >
      <SafeAreaView>
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "transparent"]}
          style={styles.gradient}
        />
        <Text style={styles.title}>Item Shop</Text>
        <Text style={styles.gold}>Credits Owned: {user.gold}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Weapons </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
        </ScrollView>
        <View style={styles.row}>
          <Text style={styles.label}>Armour </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
          <ItemCard
            type="weapon"
            itemName="Laser Baton"
            attackStat={10}
            defenceStat={0}
            buff="healing"
            cost={100}
          />
        </ScrollView>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Purchase</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    marginTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 30,
  },
  item: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  gold: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "gold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 18,
    color: "white",
  },
  button: {
    marginBottom: 40,
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
