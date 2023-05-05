import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

type ItemProps = {
  type: string;
  itemName: string;
  attackStat: number;
  defenceStat: number;
  buff: string | null;
  cost: number;
};

const ItemCard = (props: ItemProps) => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={["#3D3D3D", "#0B7A75"]}
        style={[styles.card, styles.cardElevated]}
      >
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{props.itemName}</Text>
          {props.attackStat === 0 ? null : (
            <Text style={styles.cardStats}>Attack: {props.attackStat}</Text>
          )}
          {props.defenceStat === 0 ? null : (
            <Text style={styles.cardStats}>Defence: {props.defenceStat}</Text>
          )}
          {props.buff ? (
            <Text style={styles.cardBuff}>Buff: {props.buff}</Text>
          ) : null}
          <Text style={styles.cardCost}>{props.cost} Credits</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 130,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  cardElevated: {
    backgroundColor: "black",
    elevation: 3,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  cardImage: {
    height: 180,
    marginBottom: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cardBody: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  cardStats: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  cardBuff: {
    color: "white",
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

// const testItem = {
//   type: "weapon",
//   itemName: "Laser Baton",
//   attackStat: 10,
//   defenceStat: 0,
//   buff: "healing",
//   cost: 100,
// };
