import React, { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import ItemCard from "../components/ItemCard";
import { buyItem } from "../utils/api";
import useGlobalStorage from "../hooks/useGlobalStorage";
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

interface HealingCardCollectionProps {
  items: Item[];
  showModal: (item: Item) => void;
}

const HealingCardCollection: FC<HealingCardCollectionProps> = ({
  items,
  showModal,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setValue: setUser } = useGlobalStorage("user");

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    showModal(item);
  };

  const handlePurchase = (item: Item) => {
    const id = item._id;
    buyItem(id)
      .then((response) => {
        console.log(response);
        if (response.updatedCharacter) {
          setUser(response.updatedCharacter);
        } else {
          setError(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <View style={styles.itemCardContainer}>
      {items
        .filter((item) => item.type === "potion")
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
        <Modal animationType="slide" transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {error === null ? null : (
                <Text style={{ color: "red" }}>{error}</Text>
              )}
              <Text style={styles.modalTitle}>{selectedItem.itemName}</Text>
              <Text style={styles.modalText}>Type: {selectedItem.type}</Text>
              {selectedItem.buff && (
                <Text style={styles.modalText}>Buff: {selectedItem.buff}</Text>
              )}
              <Text style={[styles.modalText, { color: "#d1b92e" }]}>
                Cost: {selectedItem.cost} Credits
              </Text>
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => {
                  // possible logic to Subtract cost from user's gold
                  //    user.gold -= selectedItem.cost;
                  handlePurchase(selectedItem);
                }}
              >
                <Text style={styles.modalButtonText}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalClose}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#dedede",
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
    fontWeight: "bold",
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
  purchaseButton: {
    backgroundColor: "#d1b92e",
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

export default HealingCardCollection;
