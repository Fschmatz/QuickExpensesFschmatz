import { useEffect, useState, useRef } from "react";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, View, Pressable, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { HomeTagsList, SizedBox } from "@components";
import {
  greaterThanZero,
  showToast,
  formatMoney,
  formatCurrencyInput,
  getMonthName,
} from "@utils";
import { fetchTags, getTags } from "@tagDuck";
import {
  addExpense,
  fetchTotalExpensesCurrentMonth,
  getTotalExpensesCurrentMonth,
} from "@expenseDuck";
import { useRouter } from "expo-router";

const Home = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("0");
  const [nome, setNome] = useState("");
  const [selectedTag, setSelectedTag] = useState();
  const { height } = useWindowDimensions();
  const responsiveFontSize = Math.min(height * 0.08, 70);
  const router = useRouter();
  const dispatch = useDispatch();
  const tags = useSelector(getTags);
  const totalExpensesCurrentMonth = useSelector(getTotalExpensesCurrentMonth);
  const numPad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];
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

  const navigateToCurrentMonthDetail = () => {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    router.push({
      pathname: "/pages/monthYearExpensesDetail",
      params: { date: todayFormatted },
    });
  };

  const getCurrentMonthYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${getMonthName(`${year}-${month}`)}/${year}`;
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
          },
          containerSize.height !== "auto"
            ? { minHeight: containerSize.height }
            : {},
        ]}
      >
        {/* Top Container */}
        <View
          style={{
            backgroundColor: theme.colors.elevation.level3,
            flex: 1,
            padding: 16,
            borderRadius: 40,
          }}
        >
          {/* Total mensal */}
          <Pressable
            onPress={navigateToCurrentMonthDetail}
            style={({ pressed }) => [
              {
                width: "100%",
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-between",
                backgroundColor: theme.colors.background,
                borderRadius: 50,
                paddingHorizontal: 24,
                paddingVertical: 12,
              },
              pressed && {
                opacity: 0.6,
                backgroundColor: theme.colors.onSurface,
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.onBackground,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {getCurrentMonthYear()}
            </Text>
            <Text
              style={{
                color: theme.colors.onBackground,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              R$ {formatMoney(totalExpensesCurrentMonth)}
            </Text>
          </Pressable>

          {/* Value Input */}
          <TextInput
            value={inputValue}
            editable={false}
            maxLength={maxLengthValue}
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              color: theme.colors.onBackground,
              fontSize: responsiveFontSize,
              fontWeight: "700",
              textAlign: "right",
              alignSelf: "flex-end",
              marginRight: 5,
              marginTop: "1%",
              marginBottom: "1.7%",
              flex: 1,
            }}
          />

          {/* Nome Input */}
          <TextInput
            ref={nomeInputRef}
            placeholder="Nome"
            placeholderTextColor={theme.colors.outline}
            value={nome}
            maxLength={maxLengthName}
            onChangeText={setNome}
            style={{
              color: theme.colors.onBackground,
              fontSize: 16,
              fontWeight: "500",
              backgroundColor: theme.colors.background,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 10,
              width: "100%",
            }}
          />

          <HomeTagsList
            tags={tags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
          />
        </View>

        {/* Bottom Container - Keypad */}
        <View style={{ flex: 1.1, padding: 16 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* Numbers */}
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignContent: "space-between",
              }}
            >
              {numPad.map((num) => (
                <Pressable
                  key={num}
                  onPress={() => handlePress(num.toString())}
                  style={({ pressed }) => [
                    {
                      width: num === "0" ? "65.75%" : "31.5%",
                      height: "23.5%",
                      minHeight: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: theme.colors.secondaryContainer,
                      borderRadius: 50,
                      overflow: "hidden",
                    },
                    pressed && {
                      opacity: 0.6,
                      backgroundColor: theme.colors.onSecondaryContainer,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: theme.colors.onBackground,
                      fontSize: 38,
                      fontWeight: "600",
                    }}
                  >
                    {num}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Delete + Confirm */}
            <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
              <Pressable
                onPress={handleDelete}
                onLongPress={handleDeleteAll}
                style={({ pressed }) => [
                  {
                    width: "100%",
                    height: "23.5%",
                    minHeight: 50,
                    backgroundColor: theme.colors.tertiaryContainer,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 15,
                    borderRadius: 50,
                    overflow: "hidden",
                  },
                  pressed && {
                    opacity: 0.6,
                    backgroundColor: theme.colors.onSurface,
                  },
                ]}
              >
                <Ionicons
                  name="backspace-outline"
                  size={38}
                  color={theme.colors.onTertiaryContainer}
                />
              </Pressable>

              <Pressable
                onPress={handleConfirm}
                android_ripple={{
                  ...{ color: "rgba(255, 255, 255, 0.2)" },
                  borderless: false,
                  foreground: true,
                }}
                style={({ pressed }) => [
                  {
                    width: "100%",
                    flex: 1,
                    backgroundColor: theme.colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    overflow: "hidden",
                  },
                  pressed && {
                    opacity: 0.6,
                    backgroundColor: theme.colors.onSurface,
                  },
                ]}
              >
                <Ionicons
                  name="checkmark"
                  size={38}
                  color={theme.colors.onPrimary}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <SizedBox height={16} />
      </View>
    </View>
  );
};

export default Home;
