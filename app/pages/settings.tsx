import React, { useEffect, useState, useMemo } from "react";
import { useTheme, Portal, ActivityIndicator } from "react-native-paper";
import { Linking, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { appDetails, isLastBackupDateMoreThan30Days } from "@utils";
import {
  ListTile,
  ListTileIcon,
  SettingsSwitch,
  DefaultPageContainer,
  CardList,
  SettingsThemeSegmented,
} from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";
import { fetchAppParameters } from "@appParameterDuck";
import { fetchTotalExpensesCurrentMonth } from "@expenseDuck";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
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
    await importBackup();
    dispatch(fetchTags());
    dispatch(fetchTotalExpensesCurrentMonth());
    setIsLoading(false);
  };

  const isBackupOld = useMemo(() => {
    return isLastBackupDateMoreThan30Days(lastBackupDate);
  }, [lastBackupDate]);

  return (
    <>
      <DefaultPageContainer>
        <View
          style={{
            height: 75,
            backgroundColor: theme.colors.tertiaryContainer,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            marginBottom: 10,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: theme.colors.onTertiaryContainer,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {appDetails.appName}
          </Text>
          <Text
            style={{
              color: theme.colors.onTertiaryContainer,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            v{appDetails.appVersion}
          </Text>
        </View>

        <ListTile
          title="Tema"
          titleColor={theme.colors.onPrimaryContainer}
          boldText={true}
          disabled={true}
        />
        <CardList>
          <SettingsThemeSegmented
            title="Tema do Aplicativo"
            subtitle="Escolha a aparência do aplicativo"
          />
        </CardList>

        <ListTile
          title="Geral"
          titleColor={theme.colors.onPrimaryContainer}
          boldText={true}
          disabled={true}
        />

        <CardList>
          <SettingsSwitch
            title="Mostrar total anual"
            subtitle="Exibe o total anual na página das despesas mensais"
            parameterKey={appParameters.showTotalYearParameter}
            defaultValue={false}
          />
          <SettingsSwitch
            title="Mostrar gráfico de gastos mensais"
            subtitle="Exibe uma gráfico de linhas na página das despesas mensais"
            parameterKey={appParameters.showChartTotalMonthParameter}
            defaultValue={true}
          />
        </CardList>

        <ListTile
          title="Backup"
          titleColor={theme.colors.onPrimaryContainer}
          boldText={true}
          disabled={true}
        />

        <CardList>
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
        </CardList>

        <ListTile
          title="Sobre"
          titleColor={theme.colors.onPrimaryContainer}
          boldText={true}
          disabled={true}
        />

        <CardList>
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
        </CardList>
      </DefaultPageContainer>

      {isLoading && (
        <Portal>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              },
            ]}
          >
            <ActivityIndicator size={60} color={theme.colors.primary} />
          </View>
        </Portal>
      )}
    </>
  );
};

export default Settings;
