import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { appDetails, useStyles } from "@utils";
import { DefaultPageContainer, SizedBox } from "@components";

const Changelog: React.FC = () => {
  const styles = useStyles(createStyles);

  return (
    <DefaultPageContainer>
      <View>
        <SizedBox height={8} />

        <Card mode="contained" style={styles.currentVersionCard}>
          <Card.Title
            style={styles.cardTitle}
            title="Versão Atual:"
            titleStyle={styles.boldTitle}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.currentVersionText}>
              {appDetails.currentChangelog}
            </Text>
          </Card.Content>
        </Card>

        <SizedBox height={16} />

        <Card mode="contained" style={styles.previousVersionCard}>
          <Card.Title
            title="Versões Anteriores:"
            style={styles.cardTitle}
            titleStyle={styles.boldTitle}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.previousVersionText}>
              {appDetails.changelog}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </DefaultPageContainer>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    currentVersionCard: {
      backgroundColor: theme.colors.primaryContainer,
    },
    previousVersionCard: {
      backgroundColor: theme.colors.elevation.level3,
    },
    cardTitle: {
      paddingTop: 16,
    },
    boldTitle: {
      fontWeight: "bold",
    },
    currentVersionText: {
      color: theme.colors.onPrimaryContainer,
    },
    previousVersionText: {
      color: theme.colors.onBackground,
    },
  });

export default Changelog;
