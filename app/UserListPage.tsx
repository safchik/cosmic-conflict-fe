import React, { FC, useState } from 'react';
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
} from 'react-native';
import usersData from './users';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const [basket, setBasket] = useState([]);

  return (
    <View style={styles.userListItem}>
      <View style={styles.userListItemText}>
        <TouchableOpacity onPress={showModal}>
          <Image source={user.image} style={styles.userListImage} />
          <Text style={[styles.userListText, { fontFamily: 'Roboto' }]}>
            {user.username}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType='slide' transparent>
        <LinearGradient colors={['#f62681', '#2e4cff']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { fontFamily: 'Roboto' }]}>
              {user.username}
            </Text>
            <Text style={styles.modalText}>Race: {user.race}</Text>
            <Text style={styles.modalText}>Health: {user.health}</Text>
            <Text style={styles.modalText}>Gold: {user.gold}</Text>
            <Text style={styles.modalText}>Attack: {user.attack}</Text>
            <Text style={styles.modalText}>Defence: {user.defence}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={[styles.modalButtonText, { fontFamily: 'sci-fi-font' }]}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={[styles.modalButtonText, { fontFamily: 'sci-fi-font' }]}>
                Attack
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const UserListPage: FC = () => {
  const [userList, setUserList] = useState<User[]>(usersData);

  return (
    <LinearGradient colors={['#f62681', '#2e4cff']} style={styles.container}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderWidth: 25,
    borderRadius: 150,
    backgroundColor: 'white',
    width: 300,
    height: 300,
  },
  userListText: {
    textAlign: 'center',
  },
  userListItemText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userListImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2e4cff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



export default UserListPage;
