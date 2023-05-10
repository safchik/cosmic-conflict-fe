import React, { FC, useEffect, useState } from "react";

import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
import usersData from "./users";
import BattleAction from "./BattleAction";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";

import * as api from "../utils/api";
interface User {
  characterName: string;
  username: string;
  race: string;
  gold: number;
  attack: number;
  defence: number;
  health: number;
  image: any;
}
import useGlobalStorage from "../hooks/useGlobalStorage";

const UserListItem: FC<{ user: User }> = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { setValue: setSelectedUser } = useGlobalStorage("selectedUser");

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleAttack = () => {
    setSelectedUser(user);
    router.push({ pathname: "./BattleAction" });
  };

  return (
    <SafeAreaView>
      <View style={styles.userListItem}>
        <View style={styles.userListItemText}>
          <TouchableOpacity onPress={showModal}>
            {user.race === "human" ? (
              <Image
                source={require("../assets/images/human.png")}
                style={styles.userListImage}
              />
            ) : (
              <Image
                source={require("../assets/images/alien.png")}
                style={styles.userListImage}
              />
            )}
            <Text style={[styles.userListName, { fontFamily: "Roboto" }]}>
              {user.characterName}
            </Text>
            <Text style={[styles.userListText, { fontFamily: "Roboto" }]}>
              Credits: {user.gold}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent>
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { fontFamily: "Roboto" }]}>
                {user.characterName}
              </Text>
              <Text style={styles.modalText}>Race: {user.race}</Text>
              {/* <Text style={styles.modalText}>Health: {user.health}</Text> */}
              <Text style={[styles.modalText, { color: "#d1b92e" }]}>
                Credits: {user.gold}
              </Text>
              <Text style={[styles.modalText, { color: "red" }]}>
                Attack: {user.attack}
              </Text>
              <Text style={[styles.modalText, { color: "#939596" }]}>
                Defence: {user.defence}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
                <Text
                  style={[styles.modalButtonText, { fontFamily: "Roboto" }]}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <Link
                href={{
                  pathname: "./BattleAction",
                  // , params: { user: user }
                }}
              >
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "red" }]}
                  onPress={handleAttack}
                >
                  <Text
                    style={[styles.modalButtonText, { fontFamily: "Roboto" }]}
                  >
                    Attack
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const UserListPage: FC = () => {
  // const [userList, setUserList] = useState<User[]>(usersData);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .getAllCharacters()
      .then((data) => {
        const usersData = data.characters as User[];
        setUsers(usersData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LinearGradient
      colors={["#3D3D3D", "#7DF9FF", "#ee8055"]}
      style={styles.container}
    >
      <View style={styles.headerBackground}></View>
      <SafeAreaView>
        <Text style={styles.title}>Enemies</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserListItem user={item} />}
          keyExtractor={(item) => item.username}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    display: "flex",
    fontSize: 50,
    fontWeight: "bold",
    color: "#ff3366",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "Roboto",
    marginTop: 50,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    height: 117,
    width: "100%",
    backgroundColor: "#dedede",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderColor: "transparent",
    borderRadius: 50,
    width: 240,
    height: 240,
    marginBottom: 30,
  },
  userListText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f1b14d",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "Roboto",
  },
  userListName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "Roboto",
  },
  userListItemText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userListImage: {
    alignSelf: "center",
    marginTop: 80,
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 50,
    justifyContent: "center",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#fcf5e5",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    borderWidth: 2,
    borderColor: "black",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  modalTextValues: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2e4cff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserListPage;
