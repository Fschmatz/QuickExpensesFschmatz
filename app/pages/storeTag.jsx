import { useState, useEffect } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { runOnJS } from "react-native-reanimated";
import { tagIcons } from "@constants";
import { showToast } from "@utils";
import { addTag, updateTag } from "@tagDuck";
import { selectTagById } from "@tagSelector";
import { createTag } from "../../entities/tag";
import { DefaultPageContainer, SizedBox } from "@components";

const inputStyle = {
  backgroundColor: "transparent",
  borderRadius: 4,
  fontSize: 16,
  height: 50,
  borderWidth: 1,
  borderColor: "#d1d1d1",
  padding: 8,
};

const StoreTag = () => {
  const theme = useTheme();
  const { isInsert = false, isUpdate = false, tagId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const tagForUpdate = useSelector(selectTagById(tagId));
  const [name, setName] = useState(isUpdate ? tagForUpdate.name : "");
  const [selectedColor, setSelectedColor] = useState(
    isUpdate ? tagForUpdate.color : "#6dda78",
  );
  const [selectedIcon, setSelectedIcon] = useState(
    isUpdate ? tagForUpdate.icon : "bag-outline",
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
    "worklet";
    runOnJS(setSelectedColor)(hex);
  };

  return (
    <DefaultPageContainer>
      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Nome:
        </Text>
        <TextInput
          style={[inputStyle, { color: theme.colors.onBackground }]}
          placeholder=""
          value={name}
          onChangeText={setName}
          maxLength={20}
          autoFocus={Boolean(isInsert)}
        />

        <SizedBox height="24" />

        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Cor:
        </Text>

        <ColorPicker value={selectedColor} onComplete={handleSelectColor}>
          <Panel1 />
          <HueSlider style={{ marginTop: 15 }} />
        </ColorPicker>

        <SizedBox height="24" />

        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Ícone:
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tagIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedIcon(icon)}
              style={{
                borderRadius: 50,
                padding: 10,
                backgroundColor:
                  selectedIcon === icon ? theme.colors.primary : "transparent",
              }}
            >
              <Ionicons
                name={icon}
                size={32}
                color={
                  selectedIcon === icon
                    ? theme.colors.onPrimary
                    : theme.colors.onBackground
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 25 }}>
          <Button
            mode="contained"
            icon="content-save-outline"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={handleCreateTag}
            style={{ borderRadius: 25 }}
            labelStyle={{ fontSize: 16, fontWeight: "500" }}
          >
            Salvar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </DefaultPageContainer>
  );
};

export default StoreTag;
