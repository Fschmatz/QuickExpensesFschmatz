import React from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { formatMoney } from "@utils";

export interface YearlyTotalCardProps {
  selectedYear?: string | number;
  yearlyTotal: number;
}

const YearlyTotalCard: React.FC<YearlyTotalCardProps> = ({ yearlyTotal }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        borderRadius: 20,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.colors.onTertiaryContainer,
        }}
      >
        R$ {formatMoney(yearlyTotal)}
      </Text>
    </View>
  );
};

export default YearlyTotalCard;
