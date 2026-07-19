import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { appDetails } from "@utils";
import { DefaultPageContainer } from "@components";

const Changelog = () => {
  const theme = useTheme();
  return (
    <DefaultPageContainer style={{ paddingHorizontal: 16 }}>
      <View>
        <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
          {appDetails.changelog}
        </Text>
      </View>
    </DefaultPageContainer>
  );
};

export default Changelog;
