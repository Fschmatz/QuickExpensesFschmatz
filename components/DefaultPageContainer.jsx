import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

const DefaultPageContainer = ({ children, style }) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default DefaultPageContainer;
