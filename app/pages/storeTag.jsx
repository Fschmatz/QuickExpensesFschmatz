import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { PageContainer, SizedBox } from "../components/utils";
import AppColors from "../utils/constants/appColors";
import { TagIcons } from "../utils/constants/tagIcons";
import { addTag } from "../redux/ducks/tagDuck";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { createTag } from "../entities/tag";
import Label from "../components/Label";
import { showToast } from "../utils/functionUtils";
import { selectTagById } from "../redux/selectors/tagSelector";
import ButtonWithIcon from "../components/ButtonWithIcon";

const NameInput = styled.TextInput`
  background-color: transparent;
  border-radius: 4px;
  font-size: 16px;
  height: 50px;
  border-width: 1px;
  border-color: #d1d1d1;
  color: ${AppColors.text};
  padding: 8px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled(TouchableOpacity)`
  border-radius: 50px;
  padding: 10px;
  ${({ selected }) =>
    selected &&
    `
    background-color: ${AppColors.btnConfirmBackground};
  `}
`;

const StoreTag = () => {
  const { isInsert = false, isUpdate = false, tagId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const tagForUpdate = isUpdate ? useSelector(selectTagById(tagId)) : "";
  const [name, setName] = useState(isUpdate ? tagForUpdate.name : "");
  const [selectedColor, setSelectedColor] = useState(
    isUpdate ? tagForUpdate.color : "#6dda78"
  );
  const [selectedIcon, setSelectedIcon] = useState(
    isUpdate ? tagForUpdate.icon : "bag-outline"
  );

  useEffect(() => {
    navigation.setOptions({
      title: isInsert ? "Nova Tag" : "Editar Tag",
    });
  }, [navigation]);

  const handleCreateTag = () => {
    if (!name.trim()) {
      showToast("Informe um nome!");
      return;
    }
    if (!selectedColor) {
      showToast("Selecione uma cor!");
      return;
    }
    if (!selectedIcon) {
      showToast("Selecione um ícone!");
      return;
    }

    // insert

    const newTag = createTag(null, name, selectedColor, selectedIcon);
    showToast("Tag criada com sucesso!");
    dispatch(addTag(newTag));

    // fazer o update

    router.back();
  };

  const handleSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Label>Nome:</Label>
          <NameInput
            placeholder=""
            value={name}
            onChangeText={setName}
            maxLength={30}
            autoFocus={Boolean(isInsert)}
          />

          <SizedBox height={10} />

          <Label>Cor:</Label>

          <ColorPicker value={selectedColor} onComplete={handleSelectColor}>
            <Panel1 />
            <HueSlider style={{ marginTop: 15 }} />
          </ColorPicker>

          <SizedBox height={10} />

          <Label>Ícone:</Label>

          <IconsContainer>
            {TagIcons.map((icon, index) => (
              <IconButton
                key={index}
                selected={selectedIcon === icon}
                onPress={() => setSelectedIcon(icon)}
              >
                <Ionicons
                  name={icon}
                  size={32}
                  color={AppColors.btnConfirmText}
                />
              </IconButton>
            ))}
          </IconsContainer>

          <ButtonWithIcon
            icon={"save-outline"}
            bgColor={AppColors.btnConfirmBackground}
            textColor={AppColors.btnConfirmText}
            text={"Salvar"}
            onPress={handleCreateTag}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default StoreTag;
