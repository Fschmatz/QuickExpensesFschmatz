import { useState, useEffect } from "react";
import { useTheme, Button, Text, TextInput } from "react-native-paper";
import { TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { tagIcons, tagColors } from "@constants";
import { showToast } from "@utils";
import { addTag, updateTag } from "@tagDuck";
import { selectTagById } from "@tagSelector";
import { createTag } from "../../entities/tag";
import { DefaultPageContainer, SizedBox, ListTileWithIcon } from "@components";

const chunkArray = (arr, rows) => {
  const perRow = Math.ceil(arr.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    arr.slice(i * perRow, i * perRow + perRow),
  );
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
    isUpdate ? tagForUpdate.color : "#18c435",
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

  return (
    <DefaultPageContainer>
      <Animated.View entering={FadeIn.duration(400)}>
        <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
          <TextInput
            label="Nome"
            mode="outlined"
            value={name}
            onChangeText={setName}
            maxLength={20}
            autoFocus={Boolean(isInsert)}
          />

          <SizedBox height="12" />

          <ListTileWithIcon
            title="Cor:"
            titleColor={theme.colors.onPrimaryContainer}
            iconColor={theme.colors.onPrimaryContainer}
            boldText={true}
          />

          <View style={{ gap: 12 }}>
            {chunkArray(tagColors, 2).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {row.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: color,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={28} color="#000" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <SizedBox height="12" />

          <ListTileWithIcon
            title="Ícone:"
            titleColor={theme.colors.onPrimaryContainer}
            iconColor={theme.colors.onPrimaryContainer}
            boldText={true}
          />

          <View style={{ gap: 12 }}>
            {chunkArray(tagIcons, 3).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {row.map((icon, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedIcon(icon)}
                    style={{
                      borderRadius: 50,
                      padding: 10,
                      backgroundColor:
                        selectedIcon === icon
                          ? theme.colors.primary
                          : "transparent",
                    }}
                  >
                    <Ionicons
                      name={icon}
                      size={28}
                      color={
                        selectedIcon === icon
                          ? theme.colors.onPrimary
                          : theme.colors.onBackground
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
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
      </Animated.View>
    </DefaultPageContainer>
  );
};

export default StoreTag;
