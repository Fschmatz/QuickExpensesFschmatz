import { View, useWindowDimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const EmptyState = ({ icon, title, subtitle }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  return (
    <View
      style={{
        minHeight: height * 0.7,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 16,
      }}
    >
      {icon && (
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surfaceVariant,
          }}
        >
          <Ionicons
            name={icon}
            size={48}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}

      {subtitle && (
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "600",
            textAlign: "center",
            color: theme.colors.onBackground,
          }}
        >
          {title}
        </Text>
      )}

      {subtitle && (
        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
            lineHeight: 22,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default EmptyState;
