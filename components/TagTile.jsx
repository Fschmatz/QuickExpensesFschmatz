import { ListTile, ListTileIcon, CardList } from "@components";

const TagTile = ({ tag, onPress }) => {
  return (
    <CardList>
      <ListTile
        onPress={onPress}
        title={tag.name}
        boldText={true}
        left={(props) => (
          <ListTileIcon {...props} icon={tag.icon} iconColor={tag.color} />
        )}
      />
    </CardList>
  );
};

export default TagTile;
