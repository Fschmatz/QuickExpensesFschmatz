import React, { useEffect, useState, useMemo } from "react";
import { useTheme, Portal, ActivityIndicator } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Linking, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { appDetails, isLastBackupDateMoreThanDays, useStyles } from "@utils";
import {
  ListTile,
  ListTileIcon,
  SettingsSwitch,
  DefaultPageContainer,
  SectionSegmentedList,
  SettingsThemeSegmented,
} from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";
import { fetchAppParameters } from "@appParameterDuck";
import {
  fetchTotalExpensesCurrentMonth,
  fetchMonthlyExpenses,
} from "@expenseDuck";
import { fetchLoans } from "@loanDuck";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters, FONT_WEIGHT } from "@constants";

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const lastBackupDate = useAppSelector(
    selectAppParameterByKey(appParameters.lastBackupDateParameter),
  );

  useEffect(() => {
    dispatch(fetchAppParameters());
  }, [dispatch]);

  const navigateToChangelog = () => navigation.navigate("pages/changelog");

  const handleOpenGitHubRepo = () => {
    Linking.openURL(appDetails.repositoryLink);
  };

  const handleExportBackup = async () => {
    setIsLoading(true);
    await exportBackup();
    setIsLoading(false);
  };

  const handleImportBackup = async () => {
    setIsLoading(true);
    try {
      const success = await importBackup();
      if (success) {
        dispatch(fetchTags());
        dispatch(fetchTotalExpensesCurrentMonth());
        dispatch(fetchMonthlyExpenses());
        dispatch(fetchLoans());
        dispatch(fetchAppParameters());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isBackupOld = useMemo(() => {
    return isLastBackupDateMoreThanDays(lastBackupDate, 15);
  }, [lastBackupDate]);

  return (
    <>
      <DefaultPageContainer>
        <View style={styles.bannerContainer}>
          <Text variant="titleMedium" style={styles.appNameText}>
            {appDetails.appName}
          </Text>
          <Text variant="titleSmall" style={styles.appVersionText}>
            v{appDetails.appVersion}
          </Text>
        </View>

        <SectionSegmentedList
          title="Aparência"
          titleColor={theme.colors.onPrimaryContainer}
        >
          <SettingsThemeSegmented
            title="Tema"
            subtitle="Escolha a aparência do aplicativo"
          />
        </SectionSegmentedList>

        <SectionSegmentedList
          title="Geral"
          titleColor={theme.colors.onPrimaryContainer}
        >
          <SettingsSwitch
            title="Mostrar resumo anual"
            subtitle="Exibe o resumo anual na página das despesas mensais"
            parameterKey={appParameters.showTotalYearParameter}
            defaultValue={false}
          />
          <SettingsSwitch
            title="Mostrar gráfico de gastos mensais"
            subtitle="Exibe uma gráfico de linhas na página das despesas mensais"
            parameterKey={appParameters.showChartTotalMonthParameter}
            defaultValue={true}
          />
          <SettingsSwitch
            title="Expandir resumo do mês atual"
            subtitle="Exibe informações extras no card do mês atual da tela inicial"
            parameterKey={appParameters.expandCurrentMonthSummaryParameter}
            defaultValue={true}
          />
        </SectionSegmentedList>

        <SectionSegmentedList
          title="Backup"
          titleColor={theme.colors.onPrimaryContainer}
        >
          <ListTile
            title="Exportar"
            subtitle={
              lastBackupDate ? `Último backup: ${lastBackupDate}` : undefined
            }
            left={(props) => <ListTileIcon {...props} icon="push-outline" />}
            right={
              isBackupOld
                ? (props) => (
                    <ListTileIcon
                      {...props}
                      icon="alert-circle-outline"
                      iconColor={theme.colors.error}
                    />
                  )
                : undefined
            }
            disabled={isLoading}
            onPress={handleExportBackup}
          />

          <ListTile
            title="Importar"
            left={(props) => (
              <ListTileIcon {...props} icon="download-outline" />
            )}
            disabled={isLoading}
            onPress={handleImportBackup}
          />
        </SectionSegmentedList>

        <SectionSegmentedList
          title="Sobre"
          titleColor={theme.colors.onPrimaryContainer}
        >
          <ListTile
            title="Ver código-fonte no GitHub"
            left={(props) => <ListTileIcon {...props} icon="link-outline" />}
            disabled={isLoading}
            onPress={handleOpenGitHubRepo}
          />

          <ListTile
            title="Changelog"
            left={(props) => (
              <ListTileIcon {...props} icon="document-text-outline" />
            )}
            disabled={isLoading}
            onPress={navigateToChangelog}
          />
        </SectionSegmentedList>
      </DefaultPageContainer>

      {isLoading && (
        <Portal>
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size={60} color={theme.colors.primary} />
          </View>
        </Portal>
      )}
    </>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bannerContainer: {
      height: 75,
      backgroundColor: theme.colors.tertiaryContainer,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      marginBottom: 10,
      marginTop: 8,
    },
    appNameText: {
      color: theme.colors.onTertiaryContainer,
      fontWeight: FONT_WEIGHT.default,
    },
    appVersionText: {
      color: theme.colors.onTertiaryContainer,
      fontWeight: "800",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
  });

export default Settings;
