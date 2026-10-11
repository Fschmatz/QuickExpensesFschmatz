import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoanItem } from "../../entities/loan";

export interface LoanState {
  list: LoanItem[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  list: [],
  loading: false,
  error: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    fetchLoans: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLoansSuccess: (state, action: PayloadAction<LoanItem[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchLoansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLoan: (state, _action: PayloadAction<LoanItem>) => {
      state.loading = true;
      state.error = null;
    },
    addLoanSuccess: (state) => {
      state.loading = false;
    },
    addLoanFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLoan: (state, _action: PayloadAction<LoanItem>) => {
      state.loading = true;
      state.error = null;
    },
    updateLoanSuccess: (state) => {
      state.loading = false;
    },
    updateLoanFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLoan: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteLoanSuccess: (state) => {
      state.loading = false;
    },
    deleteLoanFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLoans,
  fetchLoansSuccess,
  fetchLoansFailure,
  addLoan,
  addLoanSuccess,
  addLoanFailure,
  updateLoan,
  updateLoanSuccess,
  updateLoanFailure,
  deleteLoan,
  deleteLoanSuccess,
  deleteLoanFailure,
} = loanSlice.actions;

export default loanSlice.reducer;

// Selectors
export const getLoans = (state: { loans: LoanState }): LoanItem[] => state?.loans?.list ?? [];
export const getLoansLoading = (state: { loans: LoanState }): boolean => state?.loans?.loading ?? false;
export const getLoansError = (state: { loans: LoanState }): string | null => state?.loans?.error ?? null;
