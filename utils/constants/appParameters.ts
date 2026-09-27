export const lastBackupDateParameter = "lastBackupDate" as const;
export const showTotalYearParameter = "showTotalYear" as const;
export const themePreferenceParameter = "themePreference" as const; // system, dark, light
export const showChartTotalMonthParameter = "showChartTotalMonth" as const;

export type AppParameterKey =
  | typeof lastBackupDateParameter
  | typeof showTotalYearParameter
  | typeof themePreferenceParameter
  | typeof showChartTotalMonthParameter;

export const appParameters = {
  lastBackupDateParameter,
  showTotalYearParameter,
  themePreferenceParameter,
  showChartTotalMonthParameter,
};

export default appParameters;
