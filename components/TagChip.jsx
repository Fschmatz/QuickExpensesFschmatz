import { Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const TagChip = ({ tag }) => {
  const theme = useTheme();
  {/* Pequeno truque para deixar os Sem Tag por ultimo nos detalhes */}
  const name = tag.name === "zzz_" ? "Sem Tag" : tag.name;

  return (
    <Chip
      icon={({ size }) => (
        <Ionicons name={tag.icon} size={size} color={tag.color} />
      )}
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: 50,
      }}
      textStyle={{ color: theme.colors.onBackground, fontSize: 14, fontWeight: "500" }}
    >
      {name}
    </Chip>
  );
};

export default TagChip;
