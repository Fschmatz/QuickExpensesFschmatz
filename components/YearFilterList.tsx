import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { FONT_WEIGHT } from "@constants";

export interface YearFilterListProps {
  availableYears: (string | number)[];
  selectedYear: string | number;
  setSelectedYear: (year: any) => void;
}

const YearFilterList: React.FC<YearFilterListProps> = ({
  availableYears,
  selectedYear,
  setSelectedYear,
}) => {
  const styles = useStyles(createStyles);

  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {availableYears.map((year) => {
        const isSelected = year === selectedYear;
        return (
          <View
            key={year.toString()}
            style={[
              styles.chipContainer,
              isSelected ? styles.chipSelected : styles.chipUnselected,
            ]}
          >
            <TouchableRipple
              onPress={() => setSelectedYear(year)}
              style={styles.touchable}
            >
              <Text
                style={[
                  styles.yearText,
                  isSelected
                    ? styles.yearTextSelected
                    : styles.yearTextUnselected,
                ]}
              >
                {year}
              </Text>
            </TouchableRipple>
          </View>
        );
      })}
    </ScrollView>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 0,
      flexShrink: 0,
    },
    contentContainer: {
      gap: 12,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    chipContainer: {
      borderRadius: 50,
      overflow: "hidden",
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
    },
    chipUnselected: {
      backgroundColor: theme.colors.elevation.level3,
    },
    touchable: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    yearText: {
      fontWeight: FONT_WEIGHT.bold,
      fontSize: 16,
    },
    yearTextSelected: {
      color: theme.colors.onPrimary,
    },
    yearTextUnselected: {
      color: theme.colors.onBackground,
    },
  });

export default YearFilterList;
