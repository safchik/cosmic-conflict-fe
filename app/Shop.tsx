import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import WeaponCardCollection from "./WeaponCardCollection";
import ArmorCardCollection from "./ArmorCardCollection"
import HealingCardCollection from "./HealingCardCollection"



interface AccountProps {
  logout: () => void;
  showModal: () => void;
}

// interface ItemCardProps {
//   onPress: () => void;
//   type: string;
//   itemName: string;
//   attackStat: number;
//   defenceStat: number;
//   buff: string;
//   cost: number;
// }
// interface ItemCollectionProps {
//   onPress: () => void;
//   type: string;
//   itemName: string;
//   attackStat: number;
//   defenceStat: number;
//   buff: string;
//   cost: number;
// }

const Shop: FC<AccountProps> = ({ logout }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [basket, setBasket] = useState([]);
  const [setModalItem] = useState("");

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
        <Text style={styles.title}>Elzar's Bazaar</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Weapons</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <WeaponCardCollection
            setModalItem={setModalItem}
            logout={logout}
            showModal={showModal}
          />
        </ScrollView>
          <Text style={styles.label}>Armour</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ArmorCardCollection
            setModalItem={setModalItem}
            logout={logout}
            showModal={showModal}
          />
        </ScrollView>
        <Text style={styles.label}>Healing</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HealingCardCollection
            setModalItem={setModalItem}
            logout={logout}
            showModal={showModal}
          />
        </ScrollView>
        <Text style={styles.credits}>Total Credits: <Text style={{ color: "white" }}>{user.gold}</Text></Text>
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
  title: {
    display: "flex",
    marginTop: 60,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff3366",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "Orbitron"
  },
  credits: {
    display: "flex",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff3366",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "Roboto"
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
    alignItems: "center",
    justifyContent: 'center'
  },
  label: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    color: "gold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: "center",
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
  scrollView: {
    marginVertical: 10,
  },
  itemCard: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#ff3366",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  // addToBasketButton: {
  //   backgroundColor: "#2196F3",
  //   borderRadius: 20,
  //   padding: 10,
  //   marginTop: 15,
  // },

  // addToBasketText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
});

export default Shop;
