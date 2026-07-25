import { useTheme, Text, TouchableRipple } from "react-native-paper";
import { TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { HomeTagsList } from "@components";
import { formatMoney, getMonthName } from "@utils";

const HomeTopContainer = ({
  inputValue,
  nome,
  setNome,
  tags,
  selectedTag,
  onSelectTag,
  totalExpensesCurrentMonth,
  responsiveFontSize,
  maxLengthValue,
  maxLengthName,
  nomeInputRef,
}) => {
  const theme = useTheme();
  const router = useRouter();

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
      style={{
        backgroundColor: theme.colors.elevation.level3,
        flex: 1,
        padding: 16,
        borderRadius: 40,
      }}
    >
      {/* Total mensal */}
      <View
        style={{
          width: "100%",
          borderRadius: 25,
          overflow: "hidden",
        }}
      >
        <TouchableRipple
          onPress={navigateToCurrentMonthDetail}
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 24,
              paddingVertical: 12,
              width: "100%",
            }}
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
          </View>
        </TouchableRipple>
      </View>

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
          borderRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          width: "100%",
        }}
      />

      <HomeTagsList
        tags={tags}
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
      />
    </View>
  );
};

export default HomeTopContainer;
