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
import { getAsyncStorage } from "../utils/asyncStorage";
import * as api from "../utils/api";
import useGlobalStorage from "../hooks/useGlobalStorage";
interface BattleProps {
  character: string;
  user: object;
}

const BattleAction: FC<BattleProps> = (params) => {
  const { value } = useGlobalStorage("selectedUser");
  const [battle, setBattle] = useState();

  useEffect(() => {
    if (value) {
      api.attackCharacter(value).then((result) => {
        console.log(result);
      });
    }
  }, [value]);
  console.log("in battle:", value);

  return (
    <View>
      <Text>Hello{}</Text>
    </View>
  );
};

export default BattleAction;
