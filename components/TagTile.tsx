import React from "react";
import ListTile from "./ListTile";
import ListTileIcon from "./ListTileIcon";
import { TagItem } from "../entities/tag";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";
import { CARD } from "@constants";
import { useStyles } from "@utils";

export interface TagTileProps {
  tag: TagItem;
  onPress: () => void;
}

const TagTile: React.FC<TagTileProps> = ({ tag, onPress }) => {
  const styles = useStyles(createStyles);

  return (
    <Card mode="contained" style={[styles.card]}>
      <ListTile
        onPress={onPress}
        title={tag.name}
        boldText={true}
        left={(props) => (
          <ListTileIcon
            {...props}
            icon={tag.icon as any}
            iconColor={tag.color}
          />
        )}
      />
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      elevation: 0,
      borderRadius: CARD.borderRadius,
      overflow: "hidden",
      backgroundColor: theme?.colors?.elevation?.level3,
    },
    divider: {
      backgroundColor: theme?.colors?.background || "#00000020",
      height: 2,
    },
  });

export default TagTile;
