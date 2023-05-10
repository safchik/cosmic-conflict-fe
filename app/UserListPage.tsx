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
} from "react-native";
import { Link } from "expo-router";
import usersData from "./users";
import BattleAction from "./BattleAction";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";

import * as api from "../utils/api";
interface User {
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
    <View style={styles.userListItem}>
      <View style={styles.userListItemText}>
        <TouchableOpacity onPress={showModal}>
          <Image source={user.image} style={styles.userListImage} />
          <Text style={[styles.userListText, { fontFamily: "Roboto" }]}>
            {user.username}
          </Text>
          <Text style={[styles.userListText, { fontFamily: "Roboto" }]}>
            Credits: {user.gold}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <LinearGradient
          colors={["#3D3D3D", "#000000"]}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { fontFamily: "Roboto" }]}>
              {user.username}
            </Text>
            <Text style={styles.modalText}>Race: {user.race}</Text>
            <Text style={styles.modalText}>Health: {user.health}</Text>
            <Text style={styles.modalText}>Credits: {user.gold}</Text>
            <Text style={styles.modalText}>Attack: {user.attack}</Text>
            <Text style={styles.modalText}>Defence: {user.defence}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={[styles.modalButtonText, { fontFamily: "Roboto" }]}>
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
                style={styles.modalButton}
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
        </LinearGradient>
      </Modal>
    </View>
  );
};

const UserListPage: FC = () => {
  const [userList, setUserList] = useState<User[]>(usersData);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .getAllCharacters()
      .then((data) => {
        const usersData = data.characters as User[];
        setUsers(usersData);
        //console.log(usersData);
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
      <SafeAreaView>
        <Text style={styles.title}>Enemies</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserListItem user={item} />}
          keyExtractor={(item) => item.username}
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
    width: 250,
    height: 250,
  },
  userListText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#f1b14d",
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
    marginTop: 10,
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
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2e4cff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserListPage;
