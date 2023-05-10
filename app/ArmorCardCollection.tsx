import React, { FC, useState } from "react";
import { StyleSheet, View, Modal, Pressable, Text, Image } from "react-native";
import ItemCard from "../components/ItemCard";
import { buyItem } from "../utils/api";
import { setAsyncStorage } from "../utils/asyncStorage";

interface AccountProps {
  logout: () => void;
}

interface Item {
  _id: string;
  type: string;
  itemName: string;
  attack: number;
  defence: number;
  buff: string | null;
  cost: number;
  __v: number;
}

interface ArmorCardCollectionProps {
  items: Item[];
  showModal: (item: Item) => void;
}

const ArmorCardCollection: FC<ArmorCardCollectionProps> = ({
  items,
  showModal,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    showModal(item);
  };

 
  const handlePurchase = (item: Item) => {
    const id = item._id;
    console.log({ id });
    buyItem(id)
      .then((response) => {
        console.log({ response });
        setAsyncStorage("user", response.character[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.itemCardContainer}>
      {items
        .filter((item) => item.type === "armour")
        .map((item) => (
          <ItemCard
            key={item._id}
            onPress={() => handleItemPress(item)}
            type={item.type}
            itemName={item.itemName}
            attack={item.attack}
            defence={item.defence}
            buff={item.buff}
            cost={item.cost}
          />
        ))}

      {selectedItem && (
        <Modal animationType="fade" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedItem.itemName}</Text>
              <Text style={styles.modalText}>Type: {selectedItem.type}</Text>
              <Text style={styles.modalText}>
                Defence: {selectedItem.defence}
              </Text>
              {selectedItem.buff && (
                <Text style={styles.modalText}>Buff: {selectedItem.buff}</Text>
              )}
              <Text style={styles.modalText}>
                Cost: {selectedItem.cost} Credits
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  handlePurchase(selectedItem);
                }}
              >
                <Text style={styles.modalButtonText}>Purchase</Text>
              </Pressable>
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
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

export default ArmorCardCollection;
