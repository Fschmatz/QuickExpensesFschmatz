import React from "react";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { TextInput, View, StyleSheet, useWindowDimensions } from "react-native";
import TagSelectorList from "../TagSelectorList";
import HomeTopCurrentMonth from "./HomeTopCurrentMonth";
import { TagItem } from "../../entities/tag";
import { useStyles } from "@utils";

export interface HomeTopContainerProps {
  inputValue: string;
  nome: string;
  setNome: (nome: string) => void;
  tags?: TagItem[];
  selectedTag?: TagItem | null;
  onSelectTag: (tag: TagItem) => void;
  responsiveFontSize?: number;
  maxLengthValue?: number;
  maxLengthName?: number;
  nomeInputRef?: React.RefObject<TextInput | null> | React.Ref<TextInput>;
}

const HomeTopContainer: React.FC<HomeTopContainerProps> = ({
  inputValue,
  nome,
  setNome,
  tags,
  selectedTag,
  onSelectTag,
  responsiveFontSize: customFontSize,
  maxLengthValue = 8,
  maxLengthName = 30,
  nomeInputRef,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const { height } = useWindowDimensions();
  const responsiveFontSize = customFontSize ?? Math.min(height * 0.08, 70);

  return (
    <View style={styles.container}>
      {/* Total mensal */}
      <HomeTopCurrentMonth />

      {/* Value Input */}
      <TextInput
        value={inputValue}
        editable={false}
        maxLength={maxLengthValue}
        numberOfLines={1}
        {...({ adjustsFontSizeToFit: true } as any)}
        style={[styles.valueInput, { fontSize: responsiveFontSize }]}
      />

      {/* Nome Input */}
      <TextInput
        ref={nomeInputRef}
        placeholder="Nome"
        placeholderTextColor={theme.colors.outline}
        value={nome}
        maxLength={maxLengthName}
        onChangeText={setNome}
        style={styles.nameInput}
      />

      <TagSelectorList
        tags={tags}
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.elevation.level3,
      flex: 1,
      padding: 16,
      borderRadius: 40,
    },
    valueInput: {
      color: theme.colors.onBackground,
      fontWeight: "700",
      textAlign: "right",
      alignSelf: "flex-end",
      marginRight: 5,
      marginTop: "1%",
      marginBottom: "1.7%",
      flex: 1,
    },
    nameInput: {
      color: theme.colors.onBackground,
      fontSize: 16,
      fontWeight: "500",
      backgroundColor: theme.colors.background,
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
      width: "100%",
    },
  });

export default HomeTopContainer;
