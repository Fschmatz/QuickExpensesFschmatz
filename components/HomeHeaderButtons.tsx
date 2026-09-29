import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { useTheme, Menu, IconButton } from "react-native-paper";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

export interface HomeHeaderButtonsProps {}

const HomeHeaderButtons: React.FC<HomeHeaderButtonsProps> = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigate = (route: string) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: -12,
      }}
    >
      <IconButton
        icon={({ size, color }) => (
          <Ionicons name="receipt-outline" size={size} color={color} />
        )}
        iconColor={theme.colors.onBackground}
        onPress={() => navigate("pages/monthlyExpensesList")}
      />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        contentStyle={{
          backgroundColor: theme.colors.elevation.level5,
          borderRadius: 20,
          marginTop: -35,
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
