import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Menu, IconButton } from "react-native-paper";
import { useState } from "react";

const { width: screenWidth } = Dimensions.get("window");

const HomeHeaderButtons = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigate = (route) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginRight: -12,
      }}
    >
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        contentStyle={{
          backgroundColor: theme.colors.elevation.level5,
          borderRadius: 20,
          marginTop: -49,
          marginLeft: screenWidth - 235,
          elevation: 2,
        }}
        anchor={
          <IconButton
            icon="dots-vertical"
            iconColor={theme.colors.onBackground}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          leadingIcon={({ size }) => (
            <Ionicons
              name="receipt-outline"
              size={size}
              color={theme.colors.onBackground}
            />
          )}
          onPress={() => navigate("pages/monthlyExpensesList")}
          title="Despesas Mensais"
          titleStyle={{ color: theme.colors.onBackground }}
        />
        <Menu.Item
          leadingIcon={({ size }) => (
            <Ionicons
              name="cash-outline"
              size={size}
              color={theme.colors.onBackground}
            />
          )}
          onPress={() => navigate("pages/loansList")}
          title="Empréstimos"
          titleStyle={{ color: theme.colors.onBackground }}
        />
        <Menu.Item
          leadingIcon={({ size }) => (
            <Ionicons
              name="pricetags-outline"
              size={size}
              color={theme.colors.onBackground}
            />
          )}
          onPress={() => navigate("pages/tagsList")}
          title="Tags"
          titleStyle={{ color: theme.colors.onBackground }}
        />
        <Menu.Item
          leadingIcon={({ size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={theme.colors.onBackground}
            />
          )}
          onPress={() => navigate("pages/settings")}
          title="Configurações"
          titleStyle={{ color: theme.colors.onBackground }}
        />
      </Menu>
    </View>
  );
};

export default HomeHeaderButtons;
