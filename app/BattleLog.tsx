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

const BattleLog: FC<BattleProps> = (params) => {
  //   const { value: selectedUser } = useGlobalStorage("selectedUser");
  const [battles, setBattles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getBattleLog().then((result) => {
      setBattles(result.battleLog);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {battles.map((battle, index) => (
        <View key={index}>
          <Text>
            Attacker: {battle.attacker}, Defender: {battle.defender}, Winner:{" "}
            {battle.winner}, Spoils: {battle.spoils}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BattleLog;
