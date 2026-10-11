import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { View, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeTopContainer, HomeBottomContainer } from "@components";
import { greaterThanZero, showToast, formatCurrencyInput } from "@utils";
import { fetchTags } from "@tagDuck";
import {
  addExpense,
  fetchTotalExpensesCurrentMonth,
} from "@expenseDuck";
import { TagItem } from "../../entities/tag";

const MAX_LENGTH_VALUE = 8;

const Home: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.bottom), [theme, insets.bottom]);
  const [inputValue, setInputValue] = useState("0");
  const [nome, setNome] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagItem | null>(null);
  const dispatch = useAppDispatch();
  const [containerSize, setContainerSize] = useState<{
    height: number | "auto";
    width: number | "auto";
  }>({
    height: "auto",
    width: "auto",
  });
  const nomeInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchTotalExpensesCurrentMonth());
  }, [dispatch]);

  const handlePress = (value: string) => {
    setInputValue((prev) => formatCurrencyInput(prev + value, MAX_LENGTH_VALUE));
  };

  const handleDelete = () => {
    if (inputValue.length > 1) {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue("0");
    }
  };

  const handleDeleteAll = () => {
    if (inputValue !== "0") {
      setInputValue("0");
    }
  };

  const handleConfirm = () => {
    const normalizedValue = inputValue.replace(",", ".");
    if (inputValue && greaterThanZero(normalizedValue)) {
      insertExpense(inputValue, nome);
      setInputValue("0");
      setNome("");
      setSelectedTag(null);
      nomeInputRef.current?.blur();
      showToast("Despesa adicionada!");
    }
  };

  const insertExpense = async (inputValueStr: string, nomeValue: string) => {
    const cleanNumber = parseFloat(
      inputValueStr.replace(",", "."),
    );
    dispatch(
      addExpense({
        value: cleanNumber,
        tagId: selectedTag?.id || null,
        name: nomeValue || null,
      }),
    );
  };

  const handleSelectTag = (tag: TagItem) => {
    if (selectedTag && selectedTag.id === tag.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <View
      style={styles.root}
      onLayout={(e) => {
        const { height: layoutHeight, width: layoutWidth } = e.nativeEvent.layout;

        if (containerSize.height === "auto") {
          setContainerSize({ height: layoutHeight, width: layoutWidth });
        } else {
          const heightDiff = (containerSize.height as number) - layoutHeight;
          const widthChanged = Math.abs((containerSize.width as number) - layoutWidth) > 10;

          if (widthChanged || heightDiff < 150) {
            setContainerSize({ height: layoutHeight, width: layoutWidth });
          }
        }
      }}
    >
      <View
        style={[
          styles.content,
          containerSize.height !== "auto" && { minHeight: containerSize.height },
        ]}
      >
        <HomeTopContainer
          inputValue={inputValue}
          nome={nome}
          setNome={setNome}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          nomeInputRef={nomeInputRef}
        />

        <HomeBottomContainer
          onPress={handlePress}
          onDelete={handleDelete}
          onDeleteAll={handleDeleteAll}
          onConfirm={handleConfirm}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: MD3Theme, bottomInset: number) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    content: {
      padding: 0,
      flex: 1,
      width: "100%",
      backgroundColor: theme.colors.background,
      paddingBottom: bottomInset,
    },
  });

export default Home;
