import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as api from "../utils/api";
import useGlobalStorage from "../hooks/useGlobalStorage";
interface BattleProps {
  character: string;
  user: object;
}

const BattleAction: FC<BattleProps> = (params) => {
  const { value: selectedUser } = useGlobalStorage("selectedUser");
  const [battleReport, setBattleReport] = useState();
  const [attacker, setAttacker] = useState();
  const [defender, setDefender] = useState();
  const [battleResult, setBattleResult] = useState();

  useEffect(() => {
    if (selectedUser.characterName) {
      api.attackCharacter(selectedUser).then((result) => {
        setBattleResult(result);
      });
    }
  }, [selectedUser]);

  console.log(
    ">>>>>: ",
    { battleReport },

    { attacker },

    { defender }
  );
  if (!battleResult) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log(battleResult.battleReport);
  return (
    <View>
      <Text style={styles.container}>
        {battleResult.attackersInfo.characterName} Attacked{" "}
        {battleResult.defendersInfo.characterName} and the winner was{" "}
        {battleResult.battleReport.winner} and they received{" "}
        {battleResult.battleReport.spoils} credits.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 400,
  },
});

export default BattleAction;
