import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { appColors } from "@constants";
import { HomeTagsList } from "@components";
import { greaterThanZero, showToast, formatMoney } from "@utils";
import { fetchTags, getTags } from "@tagDuck";
import {
  addExpense,
  fetchTotalExpensesCurrentMonth,
  getTotalExpensesCurrentMonth,
} from "@expenseDuck";
import { useRouter } from "expo-router";
import { View } from "react-native";

const Container = styled.View`
  padding: 0px;
  flex: 1;
  width: 100%;
  background-color: ${appColors.background};
`;

const TopContainer = styled.View`
  background-color: ${appColors.primaryContainer};
  flex: 1;
  padding: 16px;
  border-radius: 40px;
`;

const ValueInput = styled.TextInput`
  color: ${appColors.text};
  font-size: 60px;
  font-weight: 700;
  text-align: right;
  align-self: flex-end;
  margin-right: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex: 1;
`;

const NomeInput = styled.TextInput`
  color: ${appColors.text};
  font-size: 18px;
  background-color: ${appColors.background};
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const BottomContainer = styled.View`
  flex: 1.1;
  padding: 16px;
`;

const Keypad = styled.View`
  flex: 1;
  flex-direction: row;
`;

const NumbersContainer = styled.View`
  flex: 3;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

const ConfirmDeleteContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

const KeyButton = styled.Pressable`
  width: ${(props) => (props.big ? "65.75%" : "31.5%")};
  height: 23.5%;
  min-height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${appColors.btnNumberBackground};
  border-radius: 40px;
  overflow: hidden;
`;

const KeyText = styled.Text`
  color: ${appColors.text};
  font-size: 38px;
  font-weight: 600;
`;

const DeleteKey = styled.Pressable`
  width: 100%;
  height: 23.5%;
  min-height: 50px;
  background-color: ${appColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 40px;
  overflow: hidden;
`;

const ConfirmKey = styled.Pressable`
  width: 100%;
  flex: 1;
  background-color: ${appColors.btnConfirmBackground};
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  overflow: hidden;
`;

const TotalExpensesCurrentMonthContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  background-color: ${appColors.background};
  border-radius: 50px;
  padding: 12px 24px;
`;

const TotalExpensesCurrentMonthText = styled.Text`
  color: ${appColors.text};
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [nome, setNome] = useState("");
  const [selectedTag, setSelectedTag] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const tags = useSelector(getTags);
  const totalExpensesCurrentMonth = useSelector(getTotalExpensesCurrentMonth);
  const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];
  const maxLengthValue = 8;
  const maxLengthName = 20;

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchTotalExpensesCurrentMonth());
  }, [dispatch]);

  const handlePress = (value) => {
    const hasDot = inputValue.includes(",");
    const decimalPart = hasDot ? inputValue.split(",")[1] : null;
    const isAddingDot = value === ",";
    const isAddingDigitAfterDot = hasDot && decimalPart?.length >= 2;
    const canAddValue =
      (!isAddingDot || !hasDot) &&
      !isAddingDigitAfterDot &&
      inputValue.length < maxLengthValue;

    if (canAddValue) {
      setInputValue((prev) => prev + value);
    }
  };

  const handleDelete = () => {
    if (inputValue) {
      setInputValue((prev) => prev.slice(0, -1));
    }
  };

  const handleDeleteAll = () => {
    if (inputValue) {
      setInputValue("");
    }
  };

  const handleConfirm = () => {
    if (inputValue && greaterThanZero(inputValue)) {
      insertExpense(inputValue, nome);
      setInputValue("");
      setNome("");
      setSelectedTag("");
      showToast("Despesa adicionada!");
    }
  };

  const insertExpense = async (inputValue, nomeValue) => {
    dispatch(
      addExpense({
        value: inputValue.replace(",", "."),
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

  const navigateToCurrentMonthDetail = () => {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-01`;

    router.push({
      pathname: "/pages/monthYearExpensesDetail",
      params: { date: todayFormatted },
    });
  };

  const getCurrentMonthYear = () => {
    const today = new Date();
    return `${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}/${today.getFullYear()}`;
  };

  const [containerHeight, setContainerHeight] = useState("auto");

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => {
        const height = e.nativeEvent.layout.height;
        if (containerHeight === "auto" || height > containerHeight) {
          setContainerHeight(height);
        }
      }}
    >
      <Container
        style={containerHeight !== "auto" ? { minHeight: containerHeight } : {}}
      >
        <TopContainer>
          <TotalExpensesCurrentMonthContainer
            onPress={navigateToCurrentMonthDetail}
          >
            <TotalExpensesCurrentMonthText>
              {getCurrentMonthYear()}
            </TotalExpensesCurrentMonthText>
            <TotalExpensesCurrentMonthText>
              R$ {formatMoney(totalExpensesCurrentMonth)}
            </TotalExpensesCurrentMonthText>
          </TotalExpensesCurrentMonthContainer>

          <ValueInput
            value={inputValue}
            editable={false}
            maxLength={maxLengthValue}
            adjustsFontSizeToFit
            numberOfLines={1}
          />

          <NomeInput
            placeholder="Nome"
            placeholderTextColor={appColors.placeholderText}
            value={nome}
            maxLength={maxLengthName}
            onChangeText={setNome}
          />

          <HomeTagsList
            tags={tags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
          />
        </TopContainer>

        <BottomContainer>
          <Keypad>
            <NumbersContainer>
              {numPad.map((num) => (
                <KeyButton
                  key={num}
                  big={num === "0"}
                  onPress={() => handlePress(num.toString())}
                  android_ripple={{
                    ...appColors.androidRippleEffect,
                    borderless: false,
                    foreground: true,
                  }}
                  style={({ pressed }) => [
                    pressed && appColors.androidRippleColor,
                  ]}
                >
                  <KeyText>{num}</KeyText>
                </KeyButton>
              ))}
            </NumbersContainer>

            <ConfirmDeleteContainer>
              <DeleteKey
                onPress={handleDelete}
                onLongPress={handleDeleteAll}
                android_ripple={{
                  ...appColors.androidRippleEffect,
                  borderless: false,
                  foreground: true,
                }}
                style={({ pressed }) => [
                  pressed && appColors.androidRippleColor,
                ]}
              >
                <Ionicons
                  name="backspace-outline"
                  size={38}
                  color={appColors.btnDeleteText}
                />
              </DeleteKey>

              <ConfirmKey
                onPress={handleConfirm}
                android_ripple={{
                  ...appColors.androidRippleEffect,
                  borderless: false,
                  foreground: true,
                }}
                style={({ pressed }) => [
                  pressed && appColors.androidRippleColor,
                ]}
              >
                <Ionicons
                  name="checkmark"
                  size={38}
                  color={appColors.btnConfirmText}
                />
              </ConfirmKey>
            </ConfirmDeleteContainer>
          </Keypad>
        </BottomContainer>
      </Container>
    </View>
  );
};

export default Home;
