import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useStyles, useAnimatedPressRadius } from "@utils";

export interface HomeBottomConfirmButtonProps {
  onConfirm: () => void;
}

const HomeBottomConfirmButton: React.FC<HomeBottomConfirmButtonProps> = ({
  onConfirm,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPressRadius();

  return (
    <Animated.View style={[styles.confirmKeyWrapper, animatedStyle]}>
      <TouchableRipple
        onPress={onConfirm}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.confirmRipple}
      >
        <Ionicons name="checkmark" size={38} color={theme.colors.onPrimary} />
      </TouchableRipple>
    </Animated.View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    confirmKeyWrapper: {
      width: "100%",
      flex: 1,
      overflow: "hidden",
    },
    confirmRipple: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default HomeBottomConfirmButton;
