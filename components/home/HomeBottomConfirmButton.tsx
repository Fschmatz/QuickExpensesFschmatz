import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "@utils";

export interface HomeBottomConfirmButtonProps {
  onConfirm: () => void;
}

const HomeBottomConfirmButton: React.FC<HomeBottomConfirmButtonProps> = ({
  onConfirm,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View style={styles.confirmKeyWrapper}>
      <TouchableRipple onPress={onConfirm} style={styles.confirmRipple}>
        <Ionicons name="checkmark" size={38} color={theme.colors.onPrimary} />
      </TouchableRipple>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    confirmKeyWrapper: {
      width: "100%",
      flex: 1,
      borderRadius: 50,
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
