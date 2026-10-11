import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseItem } from "../../entities/expense";
import { MonthlyExpenseItem } from "../../entities/monthlyExpense";

export interface AddExpensePayload {
  value: number;
  tagId?: number | null;
  name?: string | null;
}

export interface DeleteExpensePayload {
  expenseId: number;
  date: string;
}

export interface UpdateExpensePayload {
  id: number;
  value: number;
  tagId?: number | null;
  name?: string | null;
  date?: string;
}

export interface ExpenseState {
  list: ExpenseItem[];
  monthlyList: MonthlyExpenseItem[];
  expensesByMonthYear: ExpenseItem[];
  totalExpensesCurrentMonth: number;
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  list: [],
  monthlyList: [],
  expensesByMonthYear: [],
  totalExpensesCurrentMonth: 0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    fetchExpenses: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchExpensesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMonthlyExpenses: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMonthlyExpensesSuccess: (state, action: PayloadAction<MonthlyExpenseItem[]>) => {
      state.loading = false;
      state.monthlyList = action.payload;
    },
    fetchMonthlyExpensesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addExpense: (state, _action: PayloadAction<AddExpensePayload>) => {
      state.loading = true;
      state.error = null;
    },
    addExpenseSuccess: (state) => {
      state.loading = false;
    },
    addExpenseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateExpense: (state, _action: PayloadAction<UpdateExpensePayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateExpenseSuccess: (state) => {
      state.loading = false;
    },
    updateExpenseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteExpense: (state, _action: PayloadAction<DeleteExpensePayload | number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteExpenseSuccess: (state) => {
      state.loading = false;
    },
    deleteExpenseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAllExpenses: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAllExpensesSuccess: (state) => {
      state.loading = false;
    },
    deleteAllExpensesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchByMonthYear: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchByMonthYearSuccess: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.loading = false;
      state.expensesByMonthYear = action.payload;
    },
    fetchByMonthYearFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearExpensesByMonthYear: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearExpensesByMonthYearSuccess: (state) => {
      state.loading = false;
      state.expensesByMonthYear = [];
    },
    clearExpensesByMonthYearFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTotalExpensesCurrentMonth: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTotalExpensesCurrentMonthSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.totalExpensesCurrentMonth = action.payload;
    },
    fetchTotalExpensesCurrentMonthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpenses,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  fetchMonthlyExpenses,
  fetchMonthlyExpensesSuccess,
  fetchMonthlyExpensesFailure,
  addExpense,
  addExpenseSuccess,
  addExpenseFailure,
  updateExpense,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpense,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  deleteAllExpenses,
  deleteAllExpensesSuccess,
  deleteAllExpensesFailure,
  fetchByMonthYear,
  fetchByMonthYearSuccess,
  fetchByMonthYearFailure,
  clearExpensesByMonthYear,
  clearExpensesByMonthYearSuccess,
  clearExpensesByMonthYearFailure,
  fetchTotalExpensesCurrentMonth,
  fetchTotalExpensesCurrentMonthSuccess,
  fetchTotalExpensesCurrentMonthFailure,
} = expenseSlice.actions;

export default expenseSlice.reducer;

// Selectors
export const getExpenses = (state: { expenses: ExpenseState }): ExpenseItem[] =>
  state?.expenses?.list ?? [];
export const getExpensesLoading = (state: { expenses: ExpenseState }): boolean =>
  state?.expenses?.loading ?? false;
export const getExpensesError = (state: { expenses: ExpenseState }): string | null =>
  state?.expenses?.error ?? null;
export const getMonthlyExpenses = (state: { expenses: ExpenseState }): MonthlyExpenseItem[] =>
  state?.expenses?.monthlyList ?? [];
export const getExpensesByMonthYear = (state: { expenses: ExpenseState }): ExpenseItem[] =>
  state?.expenses?.expensesByMonthYear ?? [];
export const getTotalExpensesCurrentMonth = (state: { expenses: ExpenseState }): number =>
  state?.expenses?.totalExpensesCurrentMonth ?? 0;

export const selectExpenseById =
  (id: number | string) =>
  (state: { expenses: ExpenseState }): ExpenseItem | undefined =>
    state?.expenses?.expensesByMonthYear?.find((e: ExpenseItem) => Number(e.id) === Number(id));
