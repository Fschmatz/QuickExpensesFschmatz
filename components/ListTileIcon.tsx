import React from "react";
import { useTheme, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export interface ListTileIconProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  color?: string;
  style?: any;
}

const ListTileIcon: React.FC<ListTileIconProps> = ({ icon, iconColor, ...props }) => {
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
