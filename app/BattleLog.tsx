import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as api from "../utils/api";
import dayjs from "dayjs";
import useGlobalStorage from "../hooks/useGlobalStorage";

interface BattleProps {
  character: string;
  user: object;
}

const BattleLog: FC<BattleProps> = (params) => {
  const [battles, setBattles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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
  {
  }
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = battles.slice(startIndex, endIndex);

  return (
    <ImageBackground
      source={require("../assets/collection/fightscene/scene8.jpg")}
      style={styles.background}
    >
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Battle Log</Text>
          </View>
          <View>
            {currentItems.map((battle, index) => (
              <View key={index}>
                <Text style={styles.eachBattle}>
                  Attacker: {battle.attacker}, Defender: {battle.defender},
                  Winner: {battle.winner}, Spoils: {battle.spoils}, Time:{" "}
                  {dayjs(battle.timestamp).format("MMM DD - h:mm A")}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            {currentPage > 1 && (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={handleClickPrevious}>
                  <Text>Previous</Text>
                </TouchableOpacity>
              </View>
            )}
            {endIndex < battles.length && (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={handleClickNext}>
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.homeButton}>
          <TouchableOpacity>
            <Link href={"./CharacterPage"}>
              <Text>Home</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  eachBattle: {
    fontSize: 14,
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "solid",
    paddingVertical: 10,
    textAlign: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 44,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 25,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    // alignSelf: "center",
    // alignItems: "center",
    // flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 40,
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
  homeButton: {
    alignSelf: "center",
    marginHorizontal: 10,
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
  },
  buttonsContainer: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default BattleLog;
