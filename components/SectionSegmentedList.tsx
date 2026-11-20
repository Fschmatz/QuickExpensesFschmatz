import React, { ReactNode } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { CARD, FONT_WEIGHT } from "@constants";
import SegmentedList, { SegmentedListProps } from "./SegmentedList";

export interface SectionSegmentedListProps extends Omit<
  SegmentedListProps,
  "style"
> {
  title: string;
  children?: ReactNode;
  padding?: StyleProp<ViewStyle>;
  titlePadding?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  cardColor?: string;
  style?: StyleProp<ViewStyle>;
}

const SectionSegmentedList: React.FC<SectionSegmentedListProps> = ({
  title,
  children,
  padding,
  titlePadding,
  titleStyle,
  titleColor,
  largeRadius = CARD.borderRadius,
  smallRadius = CARD.smallBorderRadius,
  gap = CARD.segmentedListGap,
  cardColor,
  elevation = 0,
  style,
}) => {
  const styles = useStyles(createStyles);
  const theme = useTheme();

  return (
    <View style={[styles.container, padding, style]}>
      <View style={[styles.titleContainer, titlePadding]}>
        <Text
          variant="labelLarge"
          style={[
            styles.title,
            { color: titleColor ?? theme.colors.primary },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </View>
      <SegmentedList
        largeRadius={largeRadius}
        smallRadius={smallRadius}
        gap={gap}
        color={cardColor}
        elevation={elevation}
      >
        {children}
      </SegmentedList>
    </View>
  );
};

const createStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
    },
    titleContainer: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    title: {
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default SectionSegmentedList;
