import React from "react";
import { View } from "react-native";
import { useTheme, Text, Card } from "react-native-paper";
import { appDetails } from "@utils";
import { DefaultPageContainer, SizedBox } from "@components";

const Changelog: React.FC = () => {
  const theme = useTheme();
  return (
    <DefaultPageContainer>
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
              variant="bodyMedium"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {appDetails.currentChangelog}
            </Text>
          </Card.Content>
        </Card>

        <SizedBox height={16} />

        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.elevation.level3,
          }}
        >
          <Card.Title
            title="Versões Anteriores:"
            style={{ paddingTop: 16 }}
            titleStyle={{ fontWeight: "bold" }}
          />
          <Card.Content>
            <Text
              variant="bodyMedium"
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
