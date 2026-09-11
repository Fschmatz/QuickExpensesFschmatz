import { useTheme, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ListTileIcon = ({ icon, iconColor, ...props }) => {
  const theme = useTheme();
  const resolvedIconColor = iconColor ?? theme.colors.onBackground;

  return (
    <List.Icon
      {...props}
      icon={({ size }) => (
        <Ionicons name={icon} size={size} color={resolvedIconColor} />
      )}
    />
  );
};

export default ListTileIcon;
