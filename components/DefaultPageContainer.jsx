import { ScrollView } from "react-native";

const DefaultPageContainer = ({ children }) => {
  return;
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 50,
    }}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    {children}
  </ScrollView>;
};

export default DefaultPageContainer;
