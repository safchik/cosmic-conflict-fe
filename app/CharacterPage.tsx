import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGlobalStorage from "../hooks/useGlobalStorage";
import { logout } from "../utils/api";
import moneyIcon from "../assets/collection/Character/money.png";
import shieldIcon from "../assets/collection/Character/shield.png";
import swordIcon from "../assets/collection/Character/sword.png";
import shopIcon from "../assets/collection/Character/shopping.png";
import battleIcon from "../assets/collection/Character/twoswords.png";
import log from "../assets/collection/Character/log-file.png";
import logoutNow from "../assets/collection/Character/logout.png";

interface Character {
  characterName: string;
  attack: number;
  defense: number;
  gold: number;
  race: string;
  username: string;
  inventory: {};
}

const CharacterPage: React.FC = () => {
  const { value: user } = useGlobalStorage("user");
  const [character, setCharacter] = useState({
    characterName: "",
    attack: 0,
    defence: 0,
    gold: 0,
    race: "",
    inventory: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const backAction = () => {
    // Prevent going back to this page by returning `true`
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useEffect(() => {
    async function updateCharacter() {
      if (user) {
        setCharacter(user);
      }
    }
    updateCharacter();
    setIsLoading(false);
  }, [user]);

  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      router.push({ pathname: "./" });
    });
  };

  return (
    <ImageBackground
      source={require("../assets/images/charPageBG.jpg")}
      style={styles.container}
    >
      <SafeAreaView>
        {isLoading ? (
          <View>
            <Text style={{ fontWeight: "bold" }}>Loading...</Text>
          </View>
        ) : (
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
              <Image source={swordIcon} style={styles.icon} />
              <Text style={[styles.value, { color: "red" }]}>
                {character.attack}
              </Text>

              <Image source={shieldIcon} style={styles.icon} />
              <Text style={[styles.value, { color: "#939596" }]}>
                {character.defence}
              </Text>

              <Image source={moneyIcon} style={styles.icon} />
              <Text style={styles.value}>{character.gold}</Text>
            </View>
            <View>
              <Text style={[styles.items, { color: "white", fontSize: 22 }]}>
                Inventory{" "}
              </Text>
              {!character.inventory ? (
                <Text style={styles.label}>No Items Held</Text>
              ) : (
                <View>
                  <View>
                    <Text style={[styles.items, { color: "white" }]}>
                      Weapon
                    </Text>
                    <Text style={styles.items}>
                      {character.inventory.weapon}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.items, { color: "white" }]}>
                      Armour
                    </Text>
                    <Text style={styles.items}>
                      {character.inventory.armour}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <Link href={"./Shop"}>
                <TouchableOpacity>
                  <Image source={shopIcon} style={styles.iconBottom} />
                </TouchableOpacity>
              </Link>

              <Link href={"./UserListPage"}>
                <TouchableOpacity>
                  <Image source={battleIcon} style={styles.iconBottom} />
                </TouchableOpacity>
              </Link>
            </View>
            <View style={styles.column}>
              <Link href={"./BattleLog"}>
                <TouchableOpacity>
                  <Image source={log} style={styles.iconBottom} />
                </TouchableOpacity>
              </Link>
              <TouchableOpacity onPress={handleLogout} style={styles.touch}>
                <Image source={logoutNow} style={styles.iconBottom} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
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
    marginBottom: 5,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    marginTop: 10,
  },
  column: {
    flexDirection: "column",
    marginVertical: 5,
    alignItems: "center",
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
    marginTop: 20,
    marginVertical: 5,
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
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
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 10,
  },
  iconBottom: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  touch: {
    marginTop: 20,
    marginLeft: 10,
  },
});

export default CharacterPage;
