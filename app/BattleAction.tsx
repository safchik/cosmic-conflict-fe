import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  BackHandler,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import * as api from "../utils/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGlobalStorage from "../hooks/useGlobalStorage";
interface BattleProps {
  character: string;
  user: object;
}
const BattleAction: FC<BattleProps> = (params) => {
  const { value: selectedUser } = useGlobalStorage("selectedUser");
  const [battleReport, setBattleReport] = useState();
  const [battleResult, setBattleResult] = useState();
  useEffect(() => {
    if (selectedUser.characterName) {
      api.attackCharacter(selectedUser).then((result) => {
        setBattleResult(result);
      });
    }
  }, [selectedUser]);
  const backAction = () => {
    // Prevent going back to this page by returning `true`
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  if (!battleResult) {
    return (
      <View>
        <Text style={styles.container}>Loading...</Text>
      </View>
    );
  }
  console.log(battleResult.battleReport);
  return (
    <ImageBackground
      source={require("../assets/collection/fightscene/scene7.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Battle Report</Text>
        <Text style={styles.attacker}>
          {battleResult.attackersInfo.characterName}
        </Text>
        <Text style={styles.text}>Attacked </Text>
        <Text style={styles.target}>
          {battleResult.defendersInfo.characterName}
        </Text>
        <Text style={styles.text}> the winner was </Text>
        <Text style={styles.winner}>{battleResult.battleReport.winner}</Text>
        <Text style={styles.text}> they received </Text>
        <Text style={styles.credits}>{battleResult.battleReport.spoils}</Text>
        <Text style={styles.text}>credits.</Text>
        <View style={styles.button}>
          <Link href={"./Shop"}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Shop</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.button}>
          <Link href={"./CharacterPage"}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#99BEEB",
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 44,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 65,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  attacker: {
    fontWeight: "bold",
    fontSize: 25,
    color: "red",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  target: {
    fontWeight: "bold",
    fontSize: 25,
    color: "blue",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  winner: {
    fontWeight: "bold",
    fontSize: 25,
    color: "green",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  credits: {
    fontWeight: "bold",
    fontSize: 25,
    color: "gold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 4,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
export default BattleAction;
