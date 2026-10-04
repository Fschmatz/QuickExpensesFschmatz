import { ExpenseItem } from "../../entities/expense";
import { MonthlyExpenseItem } from "../../entities/monthlyExpense";

export const FETCH_EXPENSES = "expense/fetchExpenses" as const;
export const FETCH_EXPENSES_SUCCESS = "expense/fetchExpensesSuccess" as const;
export const FETCH_EXPENSES_FAILURE = "expense/fetchExpensesFailure" as const;
export const FETCH_MONTHLY_EXPENSES = "expense/fetchMonthlyExpenses" as const;
export const FETCH_MONTHLY_EXPENSES_SUCCESS = "expense/fetchMonthlyExpensesSuccess" as const;
export const FETCH_MONTHLY_EXPENSES_FAILURE = "expense/fetchMonthlyExpensesFailure" as const;
export const ADD_EXPENSE = "expense/addExpense" as const;
export const ADD_EXPENSE_SUCCESS = "expense/addExpenseSuccess" as const;
export const ADD_EXPENSE_FAILURE = "expense/addExpenseFailure" as const;
export const DELETE_EXPENSE = "expense/deleteExpense" as const;
export const DELETE_EXPENSE_SUCCESS = "expense/deleteExpenseSuccess" as const;
export const DELETE_EXPENSE_FAILURE = "expense/deleteExpenseFailure" as const;
export const DELETE_ALL_EXPENSES = "expense/deleteAllExpenses" as const;
export const DELETE_ALL_EXPENSES_SUCCESS = "expense/deleteAllExpensesSuccess" as const;
export const DELETE_ALL_EXPENSES_FAILURE = "expense/deleteAllExpensesFailure" as const;
export const FETCH_BY_MONTH_YEAR = "expense/fetchByMonthYear" as const;
export const FETCH_BY_MONTH_YEAR_SUCCESS = "expense/fetchByMonthYearSuccess" as const;
export const FETCH_BY_MONTH_YEAR_FAILURE = "expense/fetchByMonthYearFailure" as const;
export const CLEAR_EXPENSES_BY_MONTH_YEAR = "expense/clearExpensesByMonthYear" as const;
export const CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS =
  "expense/clearExpensesByMonthYearSuccess" as const;
export const CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE =
  "expense/clearExpensesByMonthYearFailure" as const;
export const FETCH_TOTAL_EXPENSES_CURRENT_MONTH =
  "expense/fetchTotalExpensesCurrentMonth" as const;
export const FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS =
  "expense/fetchTotalExpensesCurrentMonthSuccess" as const;
export const FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE =
  "expense/fetchTotalExpensesCurrentMonthFailure" as const;
export const UPDATE_EXPENSE = "expense/updateExpense" as const;
export const UPDATE_EXPENSE_SUCCESS = "expense/updateExpenseSuccess" as const;
export const UPDATE_EXPENSE_FAILURE = "expense/updateExpenseFailure" as const;

export const fetchExpenses = () => ({ type: FETCH_EXPENSES });

export const fetchExpensesSuccess = (data: ExpenseItem[]) => ({
  type: FETCH_EXPENSES_SUCCESS,
  payload: data,
});

export const fetchExpensesFailure = (error: string) => ({
  type: FETCH_EXPENSES_FAILURE,
  payload: error,
});

export const fetchMonthlyExpenses = () => ({ type: FETCH_MONTHLY_EXPENSES });

export const fetchMonthlyExpensesSuccess = (data: MonthlyExpenseItem[]) => ({
  type: FETCH_MONTHLY_EXPENSES_SUCCESS,
  payload: data,
});

export const fetchMonthlyExpensesFailure = (error: string) => ({
  type: FETCH_MONTHLY_EXPENSES_FAILURE,
  payload: error,
});

export interface AddExpensePayload {
  value: number;
  tagId?: number | null;
  name?: string | null;
}

export const addExpense = (data: AddExpensePayload) => ({
  type: ADD_EXPENSE,
  payload: data,
});

export const addExpenseSuccess = () => ({ type: ADD_EXPENSE_SUCCESS });

export const addExpenseFailure = (error: string) => ({
  type: ADD_EXPENSE_FAILURE,
  payload: error,
});

export interface DeleteExpensePayload {
  expenseId: number;
  date: string;
}

export const deleteExpense = (payload: DeleteExpensePayload | number) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const deleteExpenseSuccess = () => ({ type: DELETE_EXPENSE_SUCCESS });

export const deleteExpenseFailure = (error: string) => ({
  type: DELETE_EXPENSE_FAILURE,
  payload: error,
});

export const deleteAllExpenses = () => ({ type: DELETE_ALL_EXPENSES });

export const deleteAllExpensesSuccess = () => ({
  type: DELETE_ALL_EXPENSES_SUCCESS,
});

export const deleteAllExpensesFailure = (error: string) => ({
  type: DELETE_ALL_EXPENSES_FAILURE,
  payload: error,
});

export const fetchByMonthYear = (params: string) => ({
  type: FETCH_BY_MONTH_YEAR,
  payload: params,
});

export const fetchByMonthYearSuccess = (data: ExpenseItem[]) => ({
  type: FETCH_BY_MONTH_YEAR_SUCCESS,
  payload: data,
});

export const fetchByMonthYearFailure = (error: string) => ({
  type: FETCH_BY_MONTH_YEAR_FAILURE,
  payload: error,
});

export const clearExpensesByMonthYear = () => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR,
});

export const clearExpensesByMonthYearSuccess = () => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS,
});

export const clearExpensesByMonthYearFailure = (error: string) => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE,
  payload: error,
});

export const fetchTotalExpensesCurrentMonth = () => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH,
});

export const fetchTotalExpensesCurrentMonthSuccess = (data: number) => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS,
  payload: data,
});

export const fetchTotalExpensesCurrentMonthFailure = (error: string) => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE,
  payload: error,
});

export interface UpdateExpensePayload {
  id: number;
  value: number;
  tagId?: number | null;
  name?: string | null;
  date?: string;
}

export const updateExpense = (data: UpdateExpensePayload) => ({
  type: UPDATE_EXPENSE,
  payload: data,
});

export const updateExpenseSuccess = () => ({ type: UPDATE_EXPENSE_SUCCESS });

export const updateExpenseFailure = (error: string) => ({
  type: UPDATE_EXPENSE_FAILURE,
  payload: error,
});

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

type Action =
  | ReturnType<typeof fetchExpenses>
  | ReturnType<typeof fetchExpensesSuccess>
  | ReturnType<typeof fetchExpensesFailure>
  | ReturnType<typeof fetchMonthlyExpenses>
  | ReturnType<typeof fetchMonthlyExpensesSuccess>
  | ReturnType<typeof fetchMonthlyExpensesFailure>
  | ReturnType<typeof addExpense>
  | ReturnType<typeof addExpenseSuccess>
  | ReturnType<typeof addExpenseFailure>
  | ReturnType<typeof deleteExpense>
  | ReturnType<typeof deleteExpenseSuccess>
  | ReturnType<typeof deleteExpenseFailure>
  | ReturnType<typeof deleteAllExpenses>
  | ReturnType<typeof deleteAllExpensesSuccess>
  | ReturnType<typeof deleteAllExpensesFailure>
  | ReturnType<typeof fetchByMonthYear>
  | ReturnType<typeof fetchByMonthYearSuccess>
  | ReturnType<typeof fetchByMonthYearFailure>
  | ReturnType<typeof clearExpensesByMonthYear>
  | ReturnType<typeof clearExpensesByMonthYearSuccess>
  | ReturnType<typeof clearExpensesByMonthYearFailure>
  | ReturnType<typeof fetchTotalExpensesCurrentMonth>
  | ReturnType<typeof fetchTotalExpensesCurrentMonthSuccess>
  | ReturnType<typeof fetchTotalExpensesCurrentMonthFailure>
  | ReturnType<typeof updateExpense>
  | ReturnType<typeof updateExpenseSuccess>
  | ReturnType<typeof updateExpenseFailure>;

export default function expenseReducer(
  state: ExpenseState = initialState,
  action: Action
): ExpenseState {
  switch (action.type) {
    case FETCH_EXPENSES:
    case FETCH_MONTHLY_EXPENSES:
    case ADD_EXPENSE:
    case DELETE_EXPENSE:
    case DELETE_ALL_EXPENSES:
    case FETCH_BY_MONTH_YEAR:
    case CLEAR_EXPENSES_BY_MONTH_YEAR:
    case FETCH_TOTAL_EXPENSES_CURRENT_MONTH:
    case UPDATE_EXPENSE:
      return { ...state, loading: true, error: null };

    case FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case FETCH_MONTHLY_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        monthlyList: action.payload,
      };

    case FETCH_BY_MONTH_YEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        expensesByMonthYear: action.payload,
      };

    case ADD_EXPENSE_SUCCESS:
    case DELETE_EXPENSE_SUCCESS:
    case DELETE_ALL_EXPENSES_SUCCESS:
    case UPDATE_EXPENSE_SUCCESS:
      return { ...state, loading: false };

    case CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        expensesByMonthYear: [],
      };

    case FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        totalExpensesCurrentMonth: action.payload,
      };

    case FETCH_EXPENSES_FAILURE:
    case FETCH_MONTHLY_EXPENSES_FAILURE:
    case ADD_EXPENSE_FAILURE:
    case DELETE_EXPENSE_FAILURE:
    case DELETE_ALL_EXPENSES_FAILURE:
    case FETCH_BY_MONTH_YEAR_FAILURE:
    case CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE:
    case FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE:
    case UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

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

export const selectExpenseById = (id: number | string) => (state: { expenses: ExpenseState }): ExpenseItem | undefined =>
  state?.expenses?.expensesByMonthYear?.find((e: ExpenseItem) => Number(e.id) === Number(id));
