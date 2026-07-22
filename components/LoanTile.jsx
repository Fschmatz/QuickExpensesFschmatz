import { View, Pressable } from "react-native";
import { useTheme, Text, Card } from "react-native-paper";
import IconButton from "./IconButton";
import { formatDate, formatMoney } from "@utils";

const LoanTile = ({ loan, onDelete, onEdit }) => {
  const theme = useTheme();

  return (
    <Card
      mode="contained"
      style={{
        elevation: 0,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: theme.colors.elevation.level3,
        paddingVertical: 16,
      }}
    >
      <Pressable
        onPress={() => onEdit(loan)}
        android_ripple={{ color: "rgba(255, 255, 255, 0.15)" }}
        style={({ pressed }) => [
          pressed && { opacity: 0.7, backgroundColor: theme.colors.onSurface },
        ]}
        unstable_pressDelay={100}
      >
        <Card.Title
          title={loan.name}
          titleVariant="titleMedium"
          titleStyle={{
            color: theme.colors.onBackground,
            fontWeight: "bold",
            fontSize: 17,
          }}
          subtitle={
            loan.note
              ? `R$ ${formatMoney(loan.value)}\n${loan.note}\n${formatDate(loan.createdDate, "dd/mm/yyyy")}`
              : `R$ ${formatMoney(loan.value)}\n${formatDate(loan.createdDate, "dd/mm/yyyy")}`
          }
          subtitleVariant="bodyMedium"
          subtitleStyle={{
            color: theme.colors.onSurfaceVariant,
            fontSize: 14,
            marginTop: 4,
            lineHeight: 20,
          }}
          subtitleNumberOfLines={3}
          right={(props) => (
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 16,
              }}
            >
              <IconButton
                icon="checkmark-circle-outline"
                onPress={() => onDelete(loan)}
                size={28}
                style={{ margin: 0, padding: 0 }}
              />
            </View>
          )}
        />
      </Pressable>
    </Card>
  );
};

export default LoanTile;
