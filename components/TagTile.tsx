import React from "react";
import ListTile from "./ListTile";
import ListTileIcon from "./ListTileIcon";
import { TagItem } from "../entities/tag";

export interface TagTileProps {
  tag: TagItem;
  onPress: () => void;
}

const TagTile: React.FC<TagTileProps> = ({ tag, onPress }) => {
  return (
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
  );
};

export default TagTile;
