import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { SizedBox } from "@components";

const DefaultPageContainer = ({ children, style }) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingHorizontal: 16,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
      <SizedBox height={50} />
    </ScrollView>
  );
};

export default DefaultPageContainer;
