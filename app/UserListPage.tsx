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
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
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
  const router = useRouter();
  const { setValue: setSelectedUser } = useGlobalStorage("selectedUser");
  const [alienImageIndex, setAlienImageIndex] = useState(0);
  const [humanImageIndex, setHumanImageIndex] = useState(0);

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
  const alienImages = [
    require("../assets/collection/Aliens/1.png"),
    require("../assets/collection/Aliens/2.png"),
    require("../assets/collection/Aliens/3.png"),
    require("../assets/collection/Aliens/4.png"),
  ];
  const humanImages = [
    require("../assets/collection/Humans/1.png"),
    require("../assets/collection/Humans/2.png"),
    require("../assets/collection/Humans/3.png"),
    require("../assets/collection/Humans/4.png"),
  ];

  useEffect(() => {
    const randomAlienIndex = Math.floor(Math.random() * alienImages.length);
    setAlienImageIndex(randomAlienIndex);

    const randomHumanIndex = Math.floor(Math.random() * humanImages.length);
    setHumanImageIndex(randomHumanIndex);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.userListItem}>
        <View style={styles.userListItemText}>
          <TouchableOpacity onPress={showModal}>
            {user.race === "human" ? (
              <Image
                source={humanImages[humanImageIndex]}
                style={styles.userListImage}
              />
            ) : (
              <Image
                source={alienImages[alienImageIndex]}
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
    <ImageBackground
      source={require("../assets/collection/fightscene/scene5.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Enemies</Text>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
            keyExtractor={(item) => item.username}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
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
