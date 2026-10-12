import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, List } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { FONT_WEIGHT } from "@constants";

type ListItemProps = React.ComponentProps<typeof List.Item>;

export interface ListTileProps {
  title: string;
  subtitle?: string | null;
  titleColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  boldText?: boolean;
  left?: ListItemProps["left"];
  right?: ListItemProps["right"];
}

const ListTile: React.FC<ListTileProps> = ({
  title,
  subtitle,
  titleColor,
  onPress,
  disabled = false,
  boldText = false,
  left,
  right,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const resolvedTitleColor = titleColor ?? theme.colors.onBackground;

  return (
    <List.Item
      title={title}
      description={subtitle || null}
      titleStyle={[
        styles.title,
        {
          color: resolvedTitleColor,
          fontWeight: boldText ? FONT_WEIGHT.bold : FONT_WEIGHT.default,
        },
      ]}
      descriptionStyle={styles.description}
      left={left}
      onPress={onPress}
      disabled={disabled}
      style={styles.listItem}
      right={right}
    />
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listItem: {
      paddingHorizontal: 0,
    },
    title: {
      color: theme.colors.onBackground,
    },
    description: {
      color: theme.colors.outline,
    },
  });

export default ListTile;
