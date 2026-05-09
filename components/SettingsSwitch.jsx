import React from "react";
import { Switch, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { appColors } from "@constants";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";

const Container = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-between; 
`;

const TextContainer = styled.View`
  flex: 1;
  margin-right: 16px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${appColors.text};
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${appColors.placeholderText};
  margin-top: 2px;
`;

const SettingsSwitch = ({
  title,
  subtitle,
  parameterKey,
  defaultValue = true,
}) => {
  const dispatch = useDispatch();
  const value = useSelector(
    selectAppParameterByKeyAsBoolean(parameterKey, defaultValue),
  );

  const onToggle = (newValue) => {
    dispatch(setAppParameter(parameterKey, newValue.toString()));
  };

  return (
    <Container
      onPress={() => onToggle(!value)}
      android_ripple={appColors.androidRippleEffect}
      activeOpacity={0.7}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
      unstable_pressDelay={100}
    >
      <TextContainer>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextContainer>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: appColors.primaryContainer,
          true: appColors.btnConfirmBackground,
        }}
        thumbColor={value ? appColors.text : "#f4f3f4"}
      />
    </Container>
  );
};

export default SettingsSwitch;
