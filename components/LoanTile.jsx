import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Surface, Text } from "react-native-paper";
import IconButton from "./IconButton";
import { formatDate, formatMoney } from "@utils";

const LoanTile = ({ loan, onDelete, onEdit }) => {
  const theme = useTheme();
  return (
    <Surface
      style={{
        borderRadius: 12,
        marginHorizontal: 16,
        backgroundColor: theme.colors.surfaceContainerLow,
      }}
      elevation={0}
    >
      <Pressable
        onPress={() => onEdit(loan)}
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        style={({ pressed }) => [
          { padding: 16, borderRadius: 12 },
          pressed && { opacity: 0.6, backgroundColor: theme.colors.onSurface },
        ]}
        unstable_pressDelay={100}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
          >
            {loan.name}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
          >
            R$ {formatMoney(loan.value)}
          </Text>
        </View>

        {loan.note ? (
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}
          >
            {loan.note}
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, fontWeight: "bold" }}
          >
            {formatDate(loan.createdDate, "dd/mm/yyyy")}
          </Text>
          <IconButton
            icon="checkmark-circle-outline"
            onPress={() => onDelete(loan)}
            style={{ padding: 0, margin: 0 }}
          />
        </View>
      </Pressable>
    </Surface>
  );
};

export default LoanTile;
