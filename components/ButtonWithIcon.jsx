import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonContainer = styled(Pressable)`
  background-color: ${(props) => props.bgColor};
  padding: 12px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;  
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.textColor};
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

const ButtonWithIcon = ({ icon, onPress, bgColor, text, textColor }) => {
  return (
    <ButtonContainer
      onPress={onPress}
      bgColor={bgColor}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={textColor} />
      <ButtonText textColor={textColor}>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default ButtonWithIcon;
