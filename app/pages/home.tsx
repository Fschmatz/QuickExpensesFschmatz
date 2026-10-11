import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { View, useWindowDimensions, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeTopContainer, HomeBottomContainer } from "@components";
import { greaterThanZero, showToast, formatCurrencyInput } from "@utils";
import { fetchTags, getTags } from "@tagDuck";
import {
  addExpense,
  fetchTotalExpensesCurrentMonth,
  getTotalExpensesCurrentMonth,
} from "@expenseDuck";
import { TagItem } from "../../entities/tag";

const Home: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("0");
  const [nome, setNome] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagItem | null>(null);
  const { height } = useWindowDimensions();
  const responsiveFontSize = Math.min(height * 0.08, 70);
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);
  const totalExpensesCurrentMonth = useAppSelector(getTotalExpensesCurrentMonth);
  const maxLengthValue = 8;
  const maxLengthName = 30;
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
    setInputValue((prev) => formatCurrencyInput(prev + value, maxLengthValue));
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
      style={{ flex: 1 }}
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
          {
            padding: 0,
            flex: 1,
            width: "100%",
            backgroundColor: theme.colors.background,
            paddingBottom: insets.bottom,
          },
          containerSize.height !== "auto"
            ? { minHeight: containerSize.height }
            : {},
        ]}
      >
        <HomeTopContainer
          inputValue={inputValue}
          nome={nome}
          setNome={setNome}
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          totalExpensesCurrentMonth={totalExpensesCurrentMonth}
          responsiveFontSize={responsiveFontSize}
          maxLengthValue={maxLengthValue}
          maxLengthName={maxLengthName}
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

export default Home;
