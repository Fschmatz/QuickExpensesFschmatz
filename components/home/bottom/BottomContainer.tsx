import React from "react";
import { View, StyleSheet } from "react-native";
import NumberButton from "./NumberButton";
import DeleteButton from "./DeleteButton";
import ConfirmButton from "./ConfirmButton";

const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

export interface BottomContainerProps {
  onPress: (digit: string) => void;
  onDelete: () => void;
  onDeleteAll: () => void;
  onConfirm: () => void;
}

const BottomContainer: React.FC<BottomContainerProps> = ({
  onPress,
  onDelete,
  onDeleteAll,
  onConfirm,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Numbers */}
        <View style={styles.numGrid}>
          {numPad.map((num) => (
            <NumberButton key={num} num={num} onPress={onPress} />
          ))}
        </View>

        {/* Delete + Confirm */}
        <View style={styles.actionsCol}>
          <DeleteButton onDelete={onDelete} onDeleteAll={onDeleteAll} />

          <ConfirmButton onConfirm={onConfirm} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.15,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  numGrid: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  actionsCol: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
});

export default BottomContainer;
