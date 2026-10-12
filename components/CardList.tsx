import React, { ReactNode } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Divider, Card } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { CARD } from "@constants";

export interface CardListProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  mode?: "elevated" | "outlined" | "contained";
}

const CardList: React.FC<CardListProps> = ({
  children,
  style,
  mode = "contained",
}) => {
  const childArray = React.Children.toArray(children).filter(Boolean);
  const styles = useStyles(createStyles);

  return (
    <Card mode={mode} style={[styles.card, style]}>
      {childArray.map((child, index) => (
        <View key={index}>
          {child}
          {index < childArray.length - 1 && <Divider style={styles.divider} />}
        </View>
      ))}
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      elevation: 0,
      borderRadius: CARD.borderRadius,
      overflow: "hidden",
      backgroundColor:
        theme?.colors?.elevation?.level3 ||
        theme?.colors?.surfaceVariant ||
        theme?.colors?.surface,
    },
    divider: {
      backgroundColor: theme?.colors?.background || "#00000020",
      height: 1,
    },
  });

export default CardList;
