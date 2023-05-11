import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  BackHandler,
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Report</Text>
      <Text>
        {battleResult.attackersInfo.characterName} Attacked{" "}
        {battleResult.defendersInfo.characterName} and the winner was{" "}
        {battleResult.battleReport.winner} and they received{" "}
        {battleResult.battleReport.spoils} credits.
      </Text>
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
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
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
  },
  buttonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 15,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
export default BattleAction;
