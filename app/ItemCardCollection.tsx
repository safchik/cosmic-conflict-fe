import React, { FC, useState } from "react";
import { StyleSheet, View, Modal, Pressable, Text, Image } from "react-native";
import ItemCard from "../components/ItemCard";

interface AccountProps {
  logout: () => void;
}

interface Item {
  _id: string;
  type: string;
  itemName: string;
  attackStat: number;
  defenceStat: number;
  buff: string | null;
  cost: number;
  __v: number;
}

const shopArr = [
  {
    _id: "64526d60826955c5df407d40",
    type: "weapon",
    itemName: "Laser Baton",
    attackStat: 10,
    defenceStat: 0,
    buff: null,
    cost: 100,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d42",
    type: "weapon",
    itemName: "Beam Rifle",
    attackStat: 100,
    defenceStat: 0,
    buff: null,
    cost: 1000,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d41",
    type: "weapon",
    itemName: "Plasma Sword",
    attackStat: 50,
    defenceStat: 0,
    buff: null,
    cost: 500,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d45",
    type: "armor",
    itemName: "Electrum Defender",
    attackStat: 0,
    defenceStat: 100,
    buff: null,
    cost: 1000,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d46",
    type: "potion",
    itemName: "Health Potion",
    attackStat: 0,
    defenceStat: 0,
    buff: "healing",
    cost: 50,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d47",
    type: "potion",
    itemName: "Mana Potion",
    attackStat: 0,
    defenceStat: 0,
    buff: "mana",
    cost: 50,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d48",
    type: "potion",
    itemName: "Strength Potion",
    attackStat: 10,
    defenceStat: 0,
    buff: "strength",
    cost: 100,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d44",
    type: "armor",
    itemName: "Durasteel Protector",
    attackStat: 0,
    defenceStat: 50,
    buff: null,
    cost: 500,
    __v: 0,
  },
  {
    _id: "64526d60826955c5df407d43",
    type: "armor",
    itemName: "Wooden Shield",
    attackStat: 0,
    defenceStat: 10,
    buff: null,
    cost: 100,
    __v: 0,
  },
];

interface ItemCardCollectionProps {
  items: Item[];
  showModal: (item: Item) => void;
}

const ItemCardCollection: FC<ItemCardCollectionProps> = ({
  items,
  showModal,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const human = require("../assets/images/human.png");

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    showModal(item);
  };

  return (
    <View style={styles.itemCardContainer}>
      {shopArr.map((item) => (
        <ItemCard
          key={item._id}
          onPress={() => handleItemPress(item)}
          type={item.type}
          itemName={item.itemName}
          attackStat={item.attackStat}
          defenceStat={item.defenceStat}
          buff={item.buff}
          cost={item.cost}
        />
      ))}

      {selectedItem && (
        <Modal animationType="fade" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedItem.itemName}</Text>
              <Image style={styles.eachImage} source={human} />
              <Text style={styles.modalText}>Type: {selectedItem.type}</Text>
              <Text style={styles.modalText}>
                Attack: {selectedItem.attackStat}
              </Text>
              <Text style={styles.modalText}>
                Defence: {selectedItem.defenceStat}
              </Text>
              {selectedItem.buff && (
                <Text style={styles.modalText}>Buff: {selectedItem.buff}</Text>
              )}
              <Text style={styles.modalText}>
                Cost: {selectedItem.cost} Credits
              </Text>
              <Pressable style={styles.modalButton} onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemCardContainer: {
    flexDirection: "row",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  eachImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
});

export default ItemCardCollection;
