import { Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const TagChip = ({ tag, bgColor }) => {
  const theme = useTheme();

  return (
    <Chip
      icon={({ size }) => (
        <Ionicons name={tag.icon} size={size} color={tag.color} />
      )}
      style={{
        backgroundColor: bgColor || theme.colors.background,
        borderRadius: 50,
      }}
      textStyle={{ color: theme.colors.onBackground, fontSize: 14, fontWeight: "500" }}
    >
      {tag.name}
    </Chip>
  );
};

export default TagChip;
