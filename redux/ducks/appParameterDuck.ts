import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const appParameterSlice = createSlice({
  name: "appParameter",
  initialState,
  reducers: {
    fetchAppParameters: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppParametersSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAppParametersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setAppParameter: (state, _action: PayloadAction<{ key: string; value: string }>) => {
      state.loading = true;
      state.error = null;
    },
    setAppParameterSuccess: (state) => {
      state.loading = false;
    },
    setAppParameterFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLastBackupDate: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  fetchAppParameters,
  fetchAppParametersSuccess,
  fetchAppParametersFailure,
  setAppParameter,
  setAppParameterSuccess,
  setAppParameterFailure,
  updateLastBackupDate,
} = appParameterSlice.actions;

export default appParameterSlice.reducer;

// Selectors
export const getAppParameters = (state: { appParameters: AppParameterState }): Record<string, unknown> =>
  state?.appParameters?.data ?? {};
export const getAppParametersLoading = (state: { appParameters: AppParameterState }): boolean =>
  state?.appParameters?.loading ?? false;
export const getAppParametersError = (state: { appParameters: AppParameterState }): string | null =>
  state?.appParameters?.error ?? null;
