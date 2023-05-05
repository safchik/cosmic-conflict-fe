import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import ItemCard from "../components/ItemCard";

interface AccountProps {
  logout: () => void;
  showModal: () => void;
}
interface ItemCardProps {
  onPress: () => void;
  type: string;
  itemName: string;
  attackStat: number;
  defenceStat: number;
  buff: string;
  cost: number;
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
// const gold = require("../assets/images/gold.jpeg");

const ItemCardCollection: FC<AccountProps> = ({ showModal }) => {
  return (
    <View style={styles.itemCardContainer}>
      {shopArr.map((item) => (
        <ItemCard
          key={item._id}
          onPress={showModal}
          type={item.type}
          itemName={item.itemName}
          attackStat={item.attackStat}
          defenceStat={item.defenceStat}
          buff={item.buff}
          cost={item.cost}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  itemCardContainer: {
    flexDirection: "row",
  },
});

export default ItemCardCollection;
