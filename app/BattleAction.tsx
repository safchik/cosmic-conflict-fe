import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as api from '../utils/api';
import useGlobalStorage from '../hooks/useGlobalStorage';
interface BattleProps {
  character: string;
  user: object;
}

const BattleAction: FC<BattleProps> = (params) => {
  const { value: selectedUser } = useGlobalStorage('selectedUser');
  const [battle, setBattle] = useState();

  useEffect(() => {
    if (selectedUser) {
      api.attackCharacter(selectedUser).then((result) => {
        console.log(result);
      });
    }
  }, [selectedUser]);
  console.log('in battle:', selectedUser);

  return (
    <View>
      <Text>Hello{}</Text>
    </View>
  );
};

export default BattleAction;
