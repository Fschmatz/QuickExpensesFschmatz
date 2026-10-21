import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { useStyles, useAnimatedPressRadius } from "@utils";
import { FONT_WEIGHT } from "@constants";

export interface NumberButtonProps {
  num: string;
  onPress: (digit: string) => void;
}

const NumberButton: React.FC<NumberButtonProps> = ({ num, onPress }) => {
  const styles = useStyles(createStyles);
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPressRadius();

  return (
    <Animated.View
      style={[
        styles.numKey,
        num === "0" ? styles.numKeyWide : styles.numKeyNormal,
        animatedStyle,
      ]}
    >
      <TouchableRipple
        onPress={() => onPress(num)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.numRipple}
      >
        <Text style={styles.numText}>{num}</Text>
      </TouchableRipple>
    </Animated.View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    numKey: {
      height: "23.5%",
      minHeight: 50,
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
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default NumberButton;
