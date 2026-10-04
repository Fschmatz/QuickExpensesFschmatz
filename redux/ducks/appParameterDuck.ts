export const FETCH_APP_PARAMETERS = "appParameter/fetchAppParameters" as const;
export const FETCH_APP_PARAMETERS_SUCCESS = "appParameter/fetchAppParametersSuccess" as const;
export const FETCH_APP_PARAMETERS_FAILURE = "appParameter/fetchAppParametersFailure" as const;
export const SET_APP_PARAMETER = "appParameter/setAppParameter" as const;
export const SET_APP_PARAMETER_SUCCESS = "appParameter/setAppParameterSuccess" as const;
export const SET_APP_PARAMETER_FAILURE = "appParameter/setAppParameterFailure" as const;
export const UPDATE_LAST_BACKUP_DATE = "appParameter/updateLastBackupDate" as const;

export const fetchAppParameters = () => ({ type: FETCH_APP_PARAMETERS });
export const fetchAppParametersSuccess = (data: Record<string, any>) => ({
  type: FETCH_APP_PARAMETERS_SUCCESS,
  payload: data,
});
export const fetchAppParametersFailure = (error: string) => ({
  type: FETCH_APP_PARAMETERS_FAILURE,
  payload: error,
});

export const setAppParameter = (key: string, value: string) => ({
  type: SET_APP_PARAMETER,
  payload: { key, value },
});
export const setAppParameterSuccess = () => ({
  type: SET_APP_PARAMETER_SUCCESS,
});
export const setAppParameterFailure = (error: string) => ({
  type: SET_APP_PARAMETER_FAILURE,
  payload: error,
});

export const updateLastBackupDate = () => ({
  type: UPDATE_LAST_BACKUP_DATE,
});

export interface AppParameterState {
  data: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: AppParameterState = {
  data: {},
  loading: false,
  error: null,
};

type Action =
  | ReturnType<typeof fetchAppParameters>
  | ReturnType<typeof fetchAppParametersSuccess>
  | ReturnType<typeof fetchAppParametersFailure>
  | ReturnType<typeof setAppParameter>
  | ReturnType<typeof setAppParameterSuccess>
  | ReturnType<typeof setAppParameterFailure>
  | ReturnType<typeof updateLastBackupDate>;

export default function appParameterReducer(
  state: AppParameterState = initialState,
  action: Action
): AppParameterState {
  switch (action.type) {
    case FETCH_APP_PARAMETERS:
    case SET_APP_PARAMETER:
    case UPDATE_LAST_BACKUP_DATE:
      return { ...state, loading: true, error: null };

    case FETCH_APP_PARAMETERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case SET_APP_PARAMETER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FETCH_APP_PARAMETERS_FAILURE:
    case SET_APP_PARAMETER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getAppParameters = (state: { appParameters: AppParameterState }): Record<string, unknown> =>
  state?.appParameters?.data ?? {};
export const getAppParametersLoading = (state: { appParameters: AppParameterState }): boolean =>
  state?.appParameters?.loading ?? false;
export const getAppParametersError = (state: { appParameters: AppParameterState }): string | null =>
  state?.appParameters?.error ?? null;
