import styled from "styled-components/native";
import { appColors } from "@constants";
import IconButton from "./IconButton";
import { formatDate, formatMoney } from "@utils";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LoanName = styled.Text`
  color: ${appColors.text};
  font-size: 16px;
  font-weight: bold;
`;

const LoanNote = styled.Text`
  color: ${appColors.secondaryText};
  font-size: 14px;
  margin-top: 10px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${appColors.text};
`;

const DateText = styled.Text`
  font-size: 12px;
  color: ${appColors.secondaryText};
  font-weight: bold;
`;

const CardContainer = styled.Pressable`
  background-color: ${appColors.primaryContainer};
  padding: 16px;
  border-radius: 12px;
  margin: 0px 16px;
`;

const LoanTile = ({ loan, onDelete, onEdit }) => {
  return (
    <CardContainer
      onPress={() => onEdit(loan)}
      android_ripple={appColors.androidRippleEffect}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
    >
     
      <Row>
        <LoanName>{loan.name}</LoanName>
        <ValueText>R$ {formatMoney(loan.value)}</ValueText>
      </Row>
    
      {loan.note ? <LoanNote>{loan.note}</LoanNote> : null}
     
      <Row style={{ marginTop: 8 }}>
        <DateText>{formatDate(loan.createdDate, "dd/mm/yyyy")}</DateText>
        <IconButton
          icon="checkmark-circle-outline"
          onPress={() => onDelete(loan)}
          style={{ padding: 0, margin: 0 }}
        />
      </Row>
    </CardContainer>
  );
};

export default LoanTile;
