import React, { FC } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface ItemCardProps {
  onPress: () => void;
  type: string;
  itemName: string;
  attackStat: number;
  defenceStat: number;
  buff: string;
  cost: number;
}

const ItemCard: FC<ItemCardProps> = ({
    onPress,
    type,
    itemName,
    attackStat,
    defenceStat,
    buff,
    cost,
  }) => {
    return (
      <Pressable onPress={onPress} style={styles.itemCard}>
        <Text style={styles.itemText}>{itemName}</Text>
        <Text style={styles.itemText}>Attack: {attackStat}</Text>
        <Text style={styles.itemText}>Defense: {defenceStat}</Text>
        <Text style={styles.itemText}>Buff: {buff}</Text>
        <Text style={styles.itemText}>Cost: {cost}</Text>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    // ... (other styles)
    itemCard: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    itemText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
  });

export default ItemCard;
