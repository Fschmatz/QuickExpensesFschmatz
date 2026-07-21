import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./IconButton";

const TagTile = ({ tag, onDelete, onEdit }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: theme.colors.elevation.level3,
        borderRadius: 12,
      }}
    >
      <Ionicons
        name={tag.icon}
        size={24}
        color={tag.color}
        style={{ marginRight: 16 }}
      />

      <Text
        variant="titleMedium"
        style={{
          flex: 1,
          color: theme.colors.onBackground,
        }}
      >
        {tag.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <IconButton
          icon="create-outline"
          onPress={() => onEdit(tag)}
          style={{ padding: 0, margin: 0 }}
        />
        <IconButton
          icon="trash-outline"
          onPress={() => onDelete(tag)}
          style={{ padding: 0, margin: 0 }}
        />
      </View>
    </View>
  );
};

export default TagTile;
