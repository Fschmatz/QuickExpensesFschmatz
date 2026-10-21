import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
} from "react-native";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { FONT_WEIGHT } from "@constants";

export interface ValueDisplayProps {
  value: string;
  maxLength?: number;
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  maxLength = 8,
}) => {
  const styles = useStyles(createStyles);
  const { height } = useWindowDimensions();
  const baseFontSize = Math.min(height * 0.08, 70);

  // Reduz a fonte progressivamente quando o valor cresce
  const autoFontSize = React.useMemo(() => {
    const len = value.length;
    if (len <= 5) return baseFontSize;
    if (len === 6) return baseFontSize * 0.9;
    if (len === 7) return baseFontSize * 0.8;
    return baseFontSize * 0.65;
  }, [value, baseFontSize]);

  return (
    <View style={styles.valueRowContainer}>
      <Text
        numberOfLines={1}
        {...({ adjustsFontSizeToFit: true } as any)}
        style={[styles.currencyPrefix, { fontSize: autoFontSize }]}
      >
        R$
      </Text>
      <TextInput
        value={value}
        editable={false}
        maxLength={maxLength}
        numberOfLines={1}
        {...({ adjustsFontSizeToFit: true } as any)}
        style={[styles.valueInput, { fontSize: autoFontSize }]}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    valueRowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      flex: 0.85,
      marginTop: "0.2%",
      marginBottom: "0.2%",
    },
    currencyPrefix: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
      opacity: 0.3,
      includeFontPadding: false,
      textAlignVertical: "bottom",
    },
    valueInput: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
      textAlign: "right",
      flex: 1,
      paddingVertical: 0,
      margin: 0,
      includeFontPadding: false,
      textAlignVertical: "bottom",
    },
  });

export default ValueDisplay;
