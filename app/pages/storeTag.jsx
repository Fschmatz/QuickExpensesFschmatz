import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { appColors, tagIcons } from "@constants";
import { showToast } from "@utils";
import { ButtonWithIcon, Label, PageContainer, SizedBox } from "@components";
import { addTag, updateTag } from "@tagDuck";
import { selectTagById } from "@tagSelector";
import { createTag } from "../../entities/tag";

const NameInput = styled.TextInput`
  background-color: transparent;
  border-radius: 4px;
  font-size: 16px;
  height: 50px;
  border-width: 1px;
  border-color: #d1d1d1;
  color: ${appColors.text};
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
    background-color: ${appColors.btnConfirmBackground};
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

    if (isInsert) {
      const newTag = createTag(null, name, selectedColor, selectedIcon);
      showToast("Tag criada com sucesso!");
      dispatch(addTag(newTag));
    }

    if (isUpdate) {
      const updatedTag = {
        ...tagForUpdate,
        name: name,
        color: selectedColor,
        icon: selectedIcon,
      };
      showToast("Tag atualizada com sucesso!");
      dispatch(updateTag(updatedTag));
    }

    router.back();
  };

  const handleSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
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
          {tagIcons.map((icon, index) => (
            <IconButton
              key={index}
              selected={selectedIcon === icon}
              onPress={() => setSelectedIcon(icon)}
            >
              <Ionicons
                name={icon}
                size={32}
                color={appColors.btnConfirmText}
              />
            </IconButton>
          ))}
        </IconsContainer>

        <View style={{ marginTop: 25 }}>
          <ButtonWithIcon
            icon={"save-outline"}
            bgColor={appColors.btnConfirmBackground}
            textColor={appColors.btnConfirmText}
            text={"Salvar"}
            onPress={handleCreateTag}
          />
        </View>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default StoreTag;
