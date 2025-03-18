import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { appColors } from "@constants";
import IconButton from "./IconButton";

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

const TagIcon = styled(Ionicons)`
  margin-right: 16px;
`;

const TagName = styled.Text`
  flex: 1;
  color: ${appColors.text};
  font-size: 16px;
  font-weight: bold;
`;

const TagTile = ({ tag, onDelete, onEdit }) => {
  return (
    <Container>
      <TagIcon name={tag.icon} size={24} color={tag.color} />

      <TagName>{tag.name}</TagName>

      <ButtonContainer>
        <IconButton
          icon="create-outline"
          onPress={() => onEdit(tag)}
          style={{ padding: 0, margin: 0 }}
        />
        <IconButton
          icon="trash-outline"
          onPress={() => onDelete(tag)}
          style={{ padding: 0, margin: 0 }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default TagTile;
