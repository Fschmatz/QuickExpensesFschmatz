import { useNavigation } from "expo-router";
import styled from "styled-components/native";
import IconButton from "./IconButton";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LastIconButton = styled(IconButton)`
  margin-right: -15px;
`;

const HomeHeaderButtons = () => {
  const navigation = useNavigation();
  const navigateToDebug = () => navigation.navigate("pages/debug");
  const navigateToMonthlyExpenses = () =>
    navigation.navigate("pages/monthlyExpensesList");
  const navigateToTags = () => navigation.navigate("pages/tagsList");
  const navigateToSettings = () => navigation.navigate("pages/settings");

  return (
    <Container>
      <IconButton icon="bug-outline" onPress={navigateToDebug} />
      <IconButton icon="receipt-outline" onPress={navigateToMonthlyExpenses} />
      <IconButton icon="pricetag-outline" onPress={navigateToTags} />
      <LastIconButton icon="settings-outline" onPress={navigateToSettings} />
    </Container>
  );
};

export default HomeHeaderButtons;
