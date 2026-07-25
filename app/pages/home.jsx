import { useEffect, useState, useRef } from "react";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizedBox, HomeTopContainer, HomeBottomContainer } from "@components";
import { greaterThanZero, showToast, formatCurrencyInput } from "@utils";
import { fetchTags, getTags } from "@tagDuck";
import {
  addExpense,
  fetchTotalExpensesCurrentMonth,
  getTotalExpensesCurrentMonth,
} from "@expenseDuck";

const Home = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("0");
  const [nome, setNome] = useState("");
  const [selectedTag, setSelectedTag] = useState();
  const { height } = useWindowDimensions();
  const responsiveFontSize = Math.min(height * 0.08, 70);
  const dispatch = useDispatch();
  const tags = useSelector(getTags);
  const totalExpensesCurrentMonth = useSelector(getTotalExpensesCurrentMonth);
  const maxLengthValue = 8;
  const maxLengthName = 30;
  const [containerSize, setContainerSize] = useState({
    height: "auto",
    width: "auto",
  });
  const nomeInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchTotalExpensesCurrentMonth());
  }, [dispatch]);

  const handlePress = (value) => {
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
      setSelectedTag("");
      nomeInputRef.current?.blur();
      showToast("Despesa adicionada!");
    }
  };

  const insertExpense = async (inputValue, nomeValue) => {
    const cleanNumberString = parseFloat(
      inputValue.replace(",", "."),
    ).toString();
    dispatch(
      addExpense({
        value: cleanNumberString,
        tagId: selectedTag?.id || "",
        name: nomeValue || null,
      }),
    );
  };

  const handleSelectTag = (tag) => {
    if (selectedTag && selectedTag.id === tag.id) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => {
        const { height, width } = e.nativeEvent.layout;

        if (containerSize.height === "auto") {
          setContainerSize({ height, width });
        } else {
          const heightDiff = containerSize.height - height;
          const widthChanged = Math.abs(containerSize.width - width) > 10;

          if (widthChanged || heightDiff < 150) {
            setContainerSize({ height, width });
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
