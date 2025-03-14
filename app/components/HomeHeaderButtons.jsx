import { useNavigation } from "expo-router";
import styled from "styled-components/native";
import IconButton from "./IconButton";

const Container = styled.View`
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-right: -2px;
`;

const HomeHeaderButtons = () => {
  const navigation = useNavigation();  
  const navigateToMonthlyExpenses = () =>
    navigation.navigate("pages/monthlyExpensesList");
  const navigateToTags = () => navigation.navigate("pages/tagsList");
  const navigateToSettings = () => navigation.navigate("pages/settings");

  return (
    <Container>     
      <IconButton icon="pricetags-outline" onPress={navigateToTags} />
      <IconButton icon="receipt-outline" onPress={navigateToMonthlyExpenses} />
      <IconButton icon="settings-outline" onPress={navigateToSettings} />
    </Container>
  );
};

export default HomeHeaderButtons;
