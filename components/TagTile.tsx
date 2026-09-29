import React from "react";
import { ListTile, ListTileIcon, CardList } from "@components";
import { TagItem } from "../entities/tag";

export interface TagTileProps {
  tag: TagItem;
  onPress: () => void;
}

const TagTile: React.FC<TagTileProps> = ({ tag, onPress }) => {
  return (
    <CardList>
      <ListTile
        onPress={onPress}
        title={tag.name}
        boldText={true}
        left={(props) => (
          <ListTileIcon {...props} icon={tag.icon as any} iconColor={tag.color} />
        )}
      />
    </CardList>
  );
};

export default TagTile;
