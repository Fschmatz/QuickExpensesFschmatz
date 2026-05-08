const FETCH_APP_PARAMETERS = "appParameter/fetchAppParameters";
const FETCH_APP_PARAMETERS_SUCCESS = "appParameter/fetchAppParametersSuccess";
const FETCH_APP_PARAMETERS_FAILURE = "appParameter/fetchAppParametersFailure";
const SET_APP_PARAMETER = "appParameter/setAppParameter";
const SET_APP_PARAMETER_SUCCESS = "appParameter/setAppParameterSuccess";
const SET_APP_PARAMETER_FAILURE = "appParameter/setAppParameterFailure";
const UPDATE_LAST_BACKUP_DATE = "appParameter/updateLastBackupDate";

export const fetchAppParameters = () => ({ type: FETCH_APP_PARAMETERS });
export const fetchAppParametersSuccess = (data) => ({
  type: FETCH_APP_PARAMETERS_SUCCESS,
  payload: data,
});
export const fetchAppParametersFailure = (error) => ({
  type: FETCH_APP_PARAMETERS_FAILURE,
  payload: error,
});

export const setAppParameter = (key, value) => ({ type: SET_APP_PARAMETER, payload: { key, value } });
export const setAppParameterSuccess = () => ({ type: SET_APP_PARAMETER_SUCCESS });
export const setAppParameterFailure = (error) => ({
  type: SET_APP_PARAMETER_FAILURE,
  payload: error,
});

export const updateLastBackupDate = () => ({ type: UPDATE_LAST_BACKUP_DATE });

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const actionHandlers = {
  // LOADING
  [FETCH_APP_PARAMETERS]: (state) => ({ ...state, loading: true, error: null }),
  [SET_APP_PARAMETER]: (state) => ({ ...state, loading: true, error: null }),
  [UPDATE_LAST_BACKUP_DATE]: (state) => ({ ...state, loading: true, error: null }),

  // SUCCESS
  [FETCH_APP_PARAMETERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }),
  [SET_APP_PARAMETER_SUCCESS]: (state) => ({
    ...state,
    loading: false,
  }),

  // FAILURE
  [FETCH_APP_PARAMETERS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [SET_APP_PARAMETER_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
};

export default function appParameterReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const getAppParameters = (state) => state.appParameters.data;
export const getAppParametersLoading = (state) => state.appParameters.loading;
export const getAppParametersError = (state) => state.appParameters.error;
