import { useTheme, Text, TouchableRipple } from "react-native-paper";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

const HomeBottomContainer = ({ onPress, onDelete, onDeleteAll, onConfirm }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1.1, padding: 16 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Numbers */}
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "space-between",
          }}
        >
          {numPad.map((num) => (
            <View
              key={num}
              style={{
                width: num === "0" ? "65.75%" : "31.5%",
                height: "23.5%",
                minHeight: 50,
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              <TouchableRipple
                onPress={() => onPress(num.toString())}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.colors.secondaryContainer,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onBackground,
                    fontSize: 38,
                    fontWeight: "600",
                  }}
                >
                  {num}
                </Text>
              </TouchableRipple>
            </View>
          ))}
        </View>

        {/* Delete + Confirm */}
        <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
          <View
            style={{
              width: "100%",
              height: "23.5%",
              minHeight: 50,
              marginBottom: 15,
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <TouchableRipple
              onPress={onDelete}
              onLongPress={onDeleteAll}
              style={{
                flex: 1,
                backgroundColor: theme.colors.tertiaryContainer,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="backspace-outline"
                size={38}
                color={theme.colors.onTertiaryContainer}
              />
            </TouchableRipple>
          </View>

          <View
            style={{
              width: "100%",
              flex: 1,
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <TouchableRipple
              onPress={onConfirm}
              style={{
                flex: 1,
                backgroundColor: theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="checkmark"
                size={38}
                color={theme.colors.onPrimary}
              />
            </TouchableRipple>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeBottomContainer;
