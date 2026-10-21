import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "@utils";
import { FONT_WEIGHT, CARD } from "@constants";

export interface ExpenseNameInputProps {
  value: string;
  onChangeText: (value: string) => void;
  maxLength?: number;
  inputRef?: React.RefObject<TextInput | null> | React.Ref<TextInput>;
  placeholder?: string;
}

const ExpenseNameInput: React.FC<ExpenseNameInputProps> = ({
  value,
  onChangeText,
  maxLength = 30,
  inputRef,
  placeholder = "Nome",
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Ionicons
        name="pencil-sharp"
        size={16}
        color={theme.colors.outline}
        style={styles.icon}
      />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.outline}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderRadius: CARD.borderRadius,
      paddingHorizontal: 12,
      marginBottom: 10,
      width: "100%",
    },
    icon: {
      marginRight: 6,
    },
    input: {
      color: theme.colors.onBackground,
      fontSize: 14,
      fontWeight: FONT_WEIGHT.default,
      paddingVertical: 10,
      flex: 1,
    },
  });

export default ExpenseNameInput;
