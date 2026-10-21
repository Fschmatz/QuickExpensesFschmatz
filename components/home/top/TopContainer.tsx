import React from "react";
import type { MD3Theme } from "react-native-paper";
import { View, StyleSheet, TextInput } from "react-native";
import TagSelectorList from "../../TagSelectorList";
import CurrentMonth from "./CurrentMonth";
import ValueDisplay from "./ValueDisplay";
import ExpenseNameInput from "./ExpenseNameInput";
import { TagItem } from "../../../entities/tag";
import { useStyles } from "@utils";
import { CARD } from "@constants";

export interface TopContainerProps {
  inputValue: string;
  nome: string;
  setNome: (nome: string) => void;
  tags?: TagItem[];
  selectedTag?: TagItem | null;
  onSelectTag: (tag: TagItem) => void;
  maxLengthValue?: number;
  maxLengthName?: number;
  nomeInputRef?: React.RefObject<TextInput | null> | React.Ref<TextInput>;
}

const TopContainer: React.FC<TopContainerProps> = ({
  inputValue,
  nome,
  setNome,
  tags,
  selectedTag,
  onSelectTag,
  maxLengthValue = 8,
  maxLengthName = 30,
  nomeInputRef,
}) => {
  const styles = useStyles(createStyles);

  return (
    <>
      <View style={styles.containerCurrentMonth}>
        <CurrentMonth />
      </View>

      <View style={styles.container}>
        <ValueDisplay value={inputValue} maxLength={maxLengthValue} />

        <ExpenseNameInput
          inputRef={nomeInputRef}
          value={nome}
          onChangeText={setNome}
          maxLength={maxLengthName}
        />

        <TagSelectorList
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={onSelectTag}
        />
      </View>
    </>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.elevation.level3,
      flex: 1,
      paddingTop: 6,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderRadius: CARD.borderRadius,
      marginHorizontal: 16,
    },
    containerCurrentMonth: {
      paddingHorizontal: 16,
      marginBottom: 12,
    },
  });

export default TopContainer;
