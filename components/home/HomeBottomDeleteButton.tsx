import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "@utils";

export interface HomeBottomDeleteButtonProps {
  onDelete: () => void;
  onDeleteAll: () => void;
}

const HomeBottomDeleteButton: React.FC<HomeBottomDeleteButtonProps> = ({
  onDelete,
  onDeleteAll,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View style={styles.deleteKeyWrapper}>
      <TouchableRipple
        onPress={onDelete}
        onLongPress={onDeleteAll}
        style={styles.deleteRipple}
      >
        <Ionicons
          name="backspace-outline"
          size={38}
          color={theme.colors.onTertiaryContainer}
        />
      </TouchableRipple>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    deleteKeyWrapper: {
      width: "100%",
      height: "23.5%",
      minHeight: 50,
      marginBottom: 15,
      borderRadius: 50,
      overflow: "hidden",
    },
    deleteRipple: {
      flex: 1,
      backgroundColor: theme.colors.tertiaryContainer,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default HomeBottomDeleteButton;
