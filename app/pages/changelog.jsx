import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Card } from "react-native-paper";
import { appDetails } from "@utils";
import { DefaultPageContainer, SizedBox } from "@components";

const Changelog = () => {
  const theme = useTheme();
  return (
    <DefaultPageContainer style={{ paddingHorizontal: 16 }}>
      <View>
        <SizedBox height={8} />

        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.primaryContainer,
          }}
        >
          <Card.Title
            style={{ paddingTop: 16 }}
            title="Versão Atual:"
            titleStyle={{ fontWeight: "bold" }}
          />

          <Card.Content>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {appDetails.currentChangelog}
            </Text>
          </Card.Content>
        </Card>

        <SizedBox height={16} />

        <Card mode="contained">
          <Card.Title
            title="Versões Anteriores:"
            style={{ paddingTop: 16 }}
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onBackground }}
            >
              {appDetails.changelog}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </DefaultPageContainer>
  );
};

export default Changelog;
