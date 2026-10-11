import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";

export interface HomeBottomNumberButtonProps {
  num: string;
  onPress: (digit: string) => void;
}

const HomeBottomNumberButton: React.FC<HomeBottomNumberButtonProps> = ({
  num,
  onPress,
}) => {
  const styles = useStyles(createStyles);

  return (
    <View
      style={[
        styles.numKey,
        num === "0" ? styles.numKeyWide : styles.numKeyNormal,
      ]}
    >
      <TouchableRipple onPress={() => onPress(num)} style={styles.numRipple}>
        <Text style={styles.numText}>{num}</Text>
      </TouchableRipple>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    numKey: {
      height: "23.5%",
      minHeight: 50,
      borderRadius: 50,
      overflow: "hidden",
    },
    numKeyNormal: {
      width: "31.5%",
    },
    numKeyWide: {
      width: "65.75%",
    },
    numRipple: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondaryContainer,
    },
    numText: {
      color: theme.colors.onBackground,
      fontSize: 38,
      fontWeight: "600",
    },
  });

export default HomeBottomNumberButton;
