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
        marginBottom: 16,
        marginTop: 8,
        paddingHorizontal: 16,
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
        style={{ flex: 1, color: theme.colors.onBackground, fontWeight: "bold" }}
      >
        {tag.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
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
