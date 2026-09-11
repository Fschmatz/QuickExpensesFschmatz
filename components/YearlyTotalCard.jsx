import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { formatMoney } from "@utils";

const YearlyTotalCard = ({ selectedYear, yearlyTotal }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: theme.colors.tertiaryContainer,
        // padding: 16,
        borderRadius: 20,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/*     <Text
        style={{
          fontSize: 12,
          color: theme.colors.onTertiaryContainer,
          fontWeight: "600",
          marginBottom: 6,
          letterSpacing: 0.5,
        }}
      >
        Total de {selectedYear}
      </Text> */}
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
