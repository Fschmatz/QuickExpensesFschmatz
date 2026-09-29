import { getAppParameters } from "../ducks/appParameterDuck";

const parseBool = (val: any): boolean => val === true || val === "true";

export const selectShowDebug = (state: any): boolean =>
  parseBool(getAppParameters(state)?.showDebug);

// Generic selector for any parameter by key
export const selectAppParameterByKey =
  <T = any>(key: string, defaultValue: T | null = null) =>
  (state: any): T | null => {
    const params = getAppParameters(state);
    if (!params) return defaultValue;
    return params[key] !== undefined ? params[key] : defaultValue;
  };

export const selectAppParameterByKeyAsBoolean =
  (key: string, defaultValue: boolean = true) =>
  (state: any): boolean => {
    return parseBool(selectAppParameterByKey(key, defaultValue)(state));
  };

export default {
  selectShowDebug,
  selectAppParameterByKey,
  selectAppParameterByKeyAsBoolean,
};
