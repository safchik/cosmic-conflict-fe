import React, { FC, useState } from "react";
import { Text, SafeAreaView, View, FlatList, StyleSheet, Image } from "react-native";
import usersData from "./users";
import { LinearGradient } from "expo-linear-gradient";


interface User {
  username: string;
  race: string;
  gold: number;
  attack: number;
  defence: number;
  health: number;
  image: any;
}

const UserListItem: FC<{ user: User }> = ({ user }) => {
  return (
    <View style={styles.userListItem}>
      <View style={styles.userListItemText}>
        <Image source={user.image} style={styles.userListImage} />
        <Text style={styles.userListText}>{user.username}</Text>
        <Text style={styles.userListText}>{user.race}</Text>
        <Text style={styles.userListText}>Health: {user.health}</Text>
        <Text style={styles.userListText}>Gold: {user.gold}</Text>
        <Text style={styles.userListText}>Attack: {user.attack}</Text>
        <Text style={styles.userListText}>Defence: {user.defence}</Text>
      </View>
    </View>
  );
};

const UserListPage: FC = () => {
  const [userList, setUserList] = useState<User[]>(usersData);

  return (
    <LinearGradient
      colors={["#f62681", "#2e4cff"]}
      style={styles.container}
    >
      <SafeAreaView>
        <FlatList
          data={userList}
          renderItem={({ item }) => <UserListItem user={item} />}
          keyExtractor={(item) => item.username}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 25,
    borderRadius: 150,
    backgroundColor: "white",
    width: 300,
    height: 300,
  },
  userListText: {
    textAlign: "center",
  },
  userListItemText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userListImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
});

export default UserListPage;
