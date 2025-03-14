import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../utils/constants/appColors";
import HomeTagsList from "../components/HomeTagsList";
import { greaterThanZero } from "../utils/functionUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, getTags } from "../redux/ducks/tagDuck";
import { addExpense } from "../redux/ducks/expenseDuck";
import styled from "styled-components/native";
import { showToast } from "../utils/functionUtils";

const Container = styled.View`
  padding: 0px;
  flex: 1;
  background-color: ${AppColors.background};
`;

const TopContainer = styled.View`
  background-color: ${AppColors.primaryContainer};
  flex: 1;
  padding: 16px;
  border-radius: 40px;
`;

const StyledInputText = styled.TextInput`
  color: ${AppColors.text};
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  align-self: flex-end;
  margin-right: 5px;
  height: 77%;
`;

const BottomContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Keypad = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const NumbersContainer = styled.View`
  flex: 3;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ConfirmDeleteContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const KeyButton = styled.Pressable`
  width: ${(props) => (props.big ? "170px" : "80px")};
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: ${AppColors.btnNumberBackground};
  border-radius: 40px;
`;

const KeyText = styled.Text`
  color: ${AppColors.text};
  font-size: 45px;
  font-weight: 600;
`;

const DeleteKey = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: ${AppColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 40px;
`;

const ConfirmKey = styled.TouchableOpacity`
  width: 80px;
  height: 260px;
  background-color: ${AppColors.btnConfirmBackground};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 40px;
`;

const Home = () => {
  const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];
  const maxLength = 8;
  const [inputValue, setInputValue] = useState("");
  const [selectedTag, setSelectedTag] = useState();
  const dispatch = useDispatch();
  const tags = useSelector(getTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handlePress = (value) => {
    const hasDot = inputValue.includes(",");
    const decimalPart = hasDot ? inputValue.split(",")[1] : null;
    const isAddingDot = value === ",";
    const isAddingDigitAfterDot = hasDot && decimalPart?.length >= 2;
    const canAddValue =
      (!isAddingDot || !hasDot) &&
      !isAddingDigitAfterDot &&
      inputValue.length < maxLength;

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
      insertExpense(inputValue);
      setInputValue("");
      setSelectedTag("");
      showToast("Despesa adicionada!");
    }
  };

  const insertExpense = async (inputValue) => {
    dispatch(
      addExpense({
        value: inputValue.replace(",", "."),
        tagId: selectedTag?.id || "",
      })
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
    <Container>
      <TopContainer>
        <StyledInputText
          value={inputValue}
          editable={false}
          maxLength={maxLength}
        />

        <HomeTagsList
          style={{ alignSelf: "flex-start" }}
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
                  ...AppColors.androidRippleEffect,
                  borderless: true,
                  radius: 40,
                }}
                style={({ pressed }) => [
                  pressed && AppColors.androidRippleColor,
                ]}
              >
                <KeyText>{num}</KeyText>
              </KeyButton>
            ))}
          </NumbersContainer>

          <ConfirmDeleteContainer>
            <DeleteKey onPress={handleDelete} onLongPress={handleDeleteAll}>
              <Ionicons
                name="backspace-outline"
                size={38}
                color={AppColors.btnDeleteText}
              />
            </DeleteKey>
            <ConfirmKey onPress={handleConfirm}>
              <Ionicons
                name="checkmark"
                size={38}
                color={AppColors.btnConfirmText}
              />
            </ConfirmKey>
          </ConfirmDeleteContainer>
        </Keypad>
      </BottomContainer>
    </Container>
  );
};

export default Home;
