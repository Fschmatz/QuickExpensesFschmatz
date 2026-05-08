import { getAppParameters } from "../ducks/appParameterDuck";

const parseBool = (val) => val === true || val === "true";

export const selectShowDebug = (state) => parseBool(getAppParameters(state).showDebug);

// Generic selector for any parameter by key
export const selectAppParameterByKey = (key, defaultValue = null) => (state) => {
  const params = getAppParameters(state);
  return params[key] !== undefined ? params[key] : defaultValue;
};
