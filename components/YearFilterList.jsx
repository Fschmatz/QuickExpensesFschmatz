import { View, ScrollView } from "react-native";
import { useTheme, TouchableRipple, Text } from "react-native-paper";

const YearFilterList = ({ availableYears, selectedYear, setSelectedYear }) => {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      style={{ flexGrow: 0, flexShrink: 0 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
      }}
    >
      {availableYears.map((year) => (
        <View
          key={year}
          style={{
            borderRadius: 50,
            overflow: "hidden",
            backgroundColor:
              year === selectedYear
                ? theme.colors.primary
                : theme.colors.elevation.level3,
          }}
        >
          <TouchableRipple
            onPress={() => setSelectedYear(year)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                color:
                  year === selectedYear
                    ? theme.colors.onPrimary
                    : theme.colors.onBackground,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {year}
            </Text>
          </TouchableRipple>
        </View>
      ))}
    </ScrollView>
  );
};

export default YearFilterList;
