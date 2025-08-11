import styled from "styled-components/native";
import { appColors } from "@constants";
import IconButton from "./IconButton";
import { formatDate, formatMoney } from "@utils";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 8px;
  padding: 0px 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const LoanName = styled.Text`
  flex: 1;
  color: ${appColors.text};
  font-size: 16px;
  font-weight: bold;
`;

const LoanNote = styled.Text`
  flex: 1;
  color: ${appColors.text};
  font-size: 16px;
  font-weight: bold;
`;

const ValueText = styled.Text`
  font-size: 14px;
  color: ${appColors.text};
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${appColors.text};
`;

const LoanTile = ({ loan, onDelete, onEdit }) => {
  return (
    <Container>
      <LoanName>{loan.name}</LoanName>
     
      <LoanNote>{loan.note}</LoanNote>

      <DateText>{formatDate(loan.createdDate, "dd/mm/yyyy")}</DateText>
      <ValueText>R$ {formatMoney(loan.value)}</ValueText>

      <ButtonContainer>
        <IconButton
          icon="create-outline"
          onPress={() => onEdit(loan)}
          style={{ padding: 0, margin: 0 }}
        />
        {/*  <IconButton
          icon="trash-outline"
          onPress={() => onDelete(tag)}
          style={{ padding: 0, margin: 0 }}
        /> */}
      </ButtonContainer>
    </Container>
  );
};

export default LoanTile;
