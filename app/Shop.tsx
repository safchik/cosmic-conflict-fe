import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import ItemCard from "./ItemCard";



interface AccountProps {
  logout: () => void;
}
interface ItemCardProps {
  onPress: () => void;
  type: string;
  itemName: string;
  attackStat: number;
  defenceStat: number;
  buff: string;
  cost: number;
}
// const gold = require("../assets/images/gold.jpeg");

const Shop: FC<AccountProps> = ({ logout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };


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
            onPress={showModal}
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
        </ScrollView>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Purchase</Text>
        </Pressable>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.closeButton} onPress={hideModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  gold: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "gold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});


export default Shop;
