import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useStyles, useAnimatedPressRadius } from "@utils";

export interface DeleteButtonProps {
  onDelete: () => void;
  onDeleteAll: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  onDeleteAll,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPressRadius();

  return (
    <Animated.View style={[styles.deleteKeyWrapper, animatedStyle]}>
      <TouchableRipple
        onPress={onDelete}
        onLongPress={onDeleteAll}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.deleteRipple}
      >
        <Ionicons
          name="backspace-outline"
          size={38}
          color={theme.colors.onTertiaryContainer}
        />
      </TouchableRipple>
    </Animated.View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    deleteKeyWrapper: {
      width: "100%",
      height: "23.5%",
      minHeight: 50,
      marginBottom: 15,
      overflow: "hidden",
    },
    deleteRipple: {
      flex: 1,
      backgroundColor: theme.colors.tertiaryContainer,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default DeleteButton;
