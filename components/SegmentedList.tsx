import React, { ReactNode } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { CARD } from "@constants";

export interface SegmentedListProps {
  children?: ReactNode;
  largeRadius?: number;
  smallRadius?: number;
  gap?: number;
  color?: string;
  elevation?: number;
  style?: StyleProp<ViewStyle>;
}

const SegmentedList: React.FC<SegmentedListProps> = ({
  children,
  largeRadius = CARD.borderRadius,
  smallRadius = CARD.smallBorderRadius,
  gap = CARD.segmentedListGap,
  color,
  elevation = 0,
  style,
}) => {
  const styles = useStyles(createStyles);
  const theme = useTheme();
  const childArray = React.Children.toArray(children).filter(Boolean);

  if (childArray.length === 0) {
    return null;
  }

  const defaultCardColor =
    theme?.colors?.elevation?.level3 ||
    theme?.colors?.surfaceVariant ||
    theme?.colors?.surface;
  const effectiveColor = color ?? defaultCardColor;

  const getBorderRadius = (index: number, total: number) => {
    if (total === 1) {
      return {
        borderRadius: largeRadius,
      };
    }

    if (index === 0) {
      return {
        borderTopLeftRadius: largeRadius,
        borderTopRightRadius: largeRadius,
        borderBottomLeftRadius: smallRadius,
        borderBottomRightRadius: smallRadius,
      };
    }

    if (index === total - 1) {
      return {
        borderTopLeftRadius: smallRadius,
        borderTopRightRadius: smallRadius,
        borderBottomLeftRadius: largeRadius,
        borderBottomRightRadius: largeRadius,
      };
    }

    return {
      borderRadius: smallRadius,
    };
  };

  return (
    <View style={[styles.container, style]}>
      {childArray.map((child, index) => {
        const isLast = index === childArray.length - 1;
        const radiusStyle = getBorderRadius(index, childArray.length);

        return (
          <View
            key={index}
            style={!isLast && gap > 0 ? { marginBottom: gap } : undefined}
          >
            <Surface
              elevation={elevation as any}
              style={[
                styles.itemSurface,
                radiusStyle,
                { backgroundColor: effectiveColor },
              ]}
            >
              {child}
            </Surface>
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    itemSurface: {
      overflow: "hidden",
    },
  });

export default SegmentedList;
