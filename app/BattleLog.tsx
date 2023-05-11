import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import * as api from "../utils/api";
import useGlobalStorage from "../hooks/useGlobalStorage";

interface BattleProps {
  character: string;
  user: object;
}

const BattleLog: FC<BattleProps> = (params) => {
  const [battles, setBattles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    api.getBattleLog().then((result) => {
      setBattles(result.battleLog);
      setIsLoading(false);
    });
  }, []);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Calculate the indexes of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = battles.slice(startIndex, endIndex);

  return (
    <ScrollView>
      <View>
        <Text>Battle Log</Text>
      </View>
      <View>
        {currentItems.map((battle, index) => (
          <View key={index}>
            <Text>
              Attacker: {battle.attacker}, Defender: {battle.defender}, Winner:{" "}
              {battle.winner}, Spoils: {battle.spoils}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={handleClickPrevious}>
            <Text>Previous</Text>
          </TouchableOpacity>
        )}
        {endIndex < battles.length && (
          <TouchableOpacity onPress={handleClickNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default BattleLog;
