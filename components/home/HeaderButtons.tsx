import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { useTheme, Menu, IconButton } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "@utils";

const { width: screenWidth } = Dimensions.get("window");

export interface HeaderButtonsProps {}

const HeaderButtons: React.FC<HeaderButtonsProps> = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const styles = useStyles(createStyles);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigate = (route: string) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
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
        contentStyle={styles.menuContent}
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
          titleStyle={styles.menuItemTitle}
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
          titleStyle={styles.menuItemTitle}
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
          titleStyle={styles.menuItemTitle}
        />
      </Menu>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginRight: -12,
    },
    menuContent: {
      backgroundColor: theme.colors.elevation.level5,
      borderRadius: 20,
      marginTop: -35,
      marginLeft: screenWidth - 235,
      elevation: 3,
    },
    menuItemTitle: {
      color: theme.colors.onBackground,
    },
  });

export default HeaderButtons;
