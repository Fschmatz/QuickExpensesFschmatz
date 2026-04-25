import { useNavigation } from "expo-router";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { appColors } from "@constants";
import IconButton from "./IconButton";

const { width: screenWidth } = Dimensions.get("window");

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  gap: 12px;
`;

const MenuOptionText = styled.Text`
  font-size: 16px;
  color: ${appColors.text};
`;

const HomeHeaderButtons = () => {
  const navigation = useNavigation();
  const navigateToMonthlyExpenses = () =>
    navigation.navigate("pages/monthlyExpensesList");
  const navigateToTags = () => navigation.navigate("pages/tagsList");
  const navigateToSettings = () => navigation.navigate("pages/settings");
  const navigateToLoans = () => navigation.navigate("pages/loansList");

  return (
    <Container>
      <IconButton
        icon="receipt-outline"
        onPress={navigateToMonthlyExpenses}
        style={{ marginRight: 8 }}
      />

      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              padding: 8,
            },
          }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={appColors.text} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: appColors.dialogBackground,
              borderRadius: 12,
              paddingVertical: 4,
              width: 220,
              marginTop: 30,
              marginLeft: screenWidth - 295,
              elevation: 2,
            },
          }}
        >
          <MenuOption onSelect={navigateToLoans}>
            <OptionRow>
              <Ionicons name="cash-outline" size={22} color={appColors.text} />
              <MenuOptionText>Empréstimos</MenuOptionText>
            </OptionRow>
          </MenuOption>
          <MenuOption onSelect={navigateToTags}>
            <OptionRow>
              <Ionicons
                name="pricetags-outline"
                size={22}
                color={appColors.text}
              />
              <MenuOptionText>Tags</MenuOptionText>
            </OptionRow>
          </MenuOption>
          <MenuOption onSelect={navigateToSettings}>
            <OptionRow>
              <Ionicons
                name="settings-outline"
                size={22}
                color={appColors.text}
              />
              <MenuOptionText>Configurações</MenuOptionText>
            </OptionRow>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </Container>
  );
};

export default HomeHeaderButtons;
