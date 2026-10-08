import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddExpenseTagPayload {
  expenseId: number;
  tagId: number;
}

export interface ExpenseTagState {
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseTagState = {
  loading: false,
  error: null,
};

const expenseTagSlice = createSlice({
  name: "expenseTag",
  initialState,
  reducers: {
    addExpenseTag: (state, _action: PayloadAction<AddExpenseTagPayload>) => {
      state.loading = true;
      state.error = null;
    },
    addExpenseTagSuccess: (state) => {
      state.loading = false;
    },
    addExpenseTagFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addExpenseTag, addExpenseTagSuccess, addExpenseTagFailure } =
  expenseTagSlice.actions;

export default expenseTagSlice.reducer;
