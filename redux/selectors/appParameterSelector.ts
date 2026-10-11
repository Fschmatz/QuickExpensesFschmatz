import type { RootState } from "../store";
import { getAppParameters } from "../ducks/appParameterDuck";

const parseBool = (val: unknown): boolean => val === true || val === "true";

export const selectShowDebug = (state: RootState): boolean =>
  parseBool(getAppParameters(state)?.showDebug);

// Generic selector for any parameter by key
export const selectAppParameterByKey =
  <T = string>(key: string, defaultValue: T | null = null) =>
  (state: RootState): T | null => {
    const params = getAppParameters(state);
    if (!params) return defaultValue;
    return params[key] !== undefined ? (params[key] as T) : defaultValue;
  };

export const selectAppParameterByKeyAsBoolean =
  (key: string, defaultValue: boolean = true) =>
  (state: RootState): boolean => {
    return parseBool(selectAppParameterByKey(key, defaultValue)(state));
  };

export default {
  selectShowDebug,
  selectAppParameterByKey,
  selectAppParameterByKeyAsBoolean,
};
