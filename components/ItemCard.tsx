import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ItemCardProps {
  onPress: () => void;
  type: string;
  itemName: string;
  attack: number;
  defence: number;
  buff: string | null;
  cost: number;
}

const ItemCard = ({
  onPress,
  type,
  itemName,
  attack,
  defence,
  buff,
  cost,
}: ItemCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={["#3D3D3D", "#0B7A75"]} style={[styles.card]}>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{itemName}</Text>
          {attack !== 0 && (
            <Text style={styles.cardStats}>Attack: {attack}</Text>
          )}
          {defence !== 0 && (
            <Text style={styles.cardStats}>Defense: {defence}</Text>
          )}
          {buff && <Text style={styles.cardBuff}>{buff}</Text>}
          <Text style={styles.cardCost}>{cost} Credits</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  cardTitle: {
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    paddingTop: 10,
    textAlign: "center",
  },
  cardStats: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  cardBuff: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 12,
    marginTop: 6,
    flexShrink: 1,
  },
  cardCost: {
    fontWeight: "bold",
    color: "gold",
    marginBottom: 6,
  },
});

export default ItemCard;
