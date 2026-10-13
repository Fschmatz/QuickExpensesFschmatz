import React from "react";
import { View, StyleSheet } from "react-native";
import HomeBottomNumberButton from "./HomeBottomNumberButton";
import HomeBottomDeleteButton from "./HomeBottomDeleteButton";
import HomeBottomConfirmButton from "./HomeBottomConfirmButton";

const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

export interface HomeBottomContainerProps {
  onPress: (digit: string) => void;
  onDelete: () => void;
  onDeleteAll: () => void;
  onConfirm: () => void;
}

const HomeBottomContainer: React.FC<HomeBottomContainerProps> = ({
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
            <HomeBottomNumberButton key={num} num={num} onPress={onPress} />
          ))}
        </View>

        {/* Delete + Confirm */}
        <View style={styles.actionsCol}>
          <HomeBottomDeleteButton
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          <HomeBottomConfirmButton onConfirm={onConfirm} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.25,
    padding: 16,
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

export default HomeBottomContainer;
