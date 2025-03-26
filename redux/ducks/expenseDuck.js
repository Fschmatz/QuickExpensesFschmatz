const FETCH_EXPENSES = "expense/fetchExpenses";
const FETCH_EXPENSES_SUCCESS = "expense/fetchExpensesSuccess";
const FETCH_EXPENSES_FAILURE = "expense/fetchExpensesFailure";
const FETCH_MONTHLY_EXPENSES = "expense/fetchMonthlyExpenses";
const FETCH_MONTHLY_EXPENSES_SUCCESS = "expense/fetchMonthlyExpensesSuccess";
const FETCH_MONTHLY_EXPENSES_FAILURE = "expense/fetchMonthlyExpensesFailure";
const ADD_EXPENSE = "expense/addExpense";
const ADD_EXPENSE_SUCCESS = "expense/addExpenseSuccess";
const ADD_EXPENSE_FAILURE = "expense/addExpenseFailure";
const DELETE_EXPENSE = "expense/deleteExpense";
const DELETE_EXPENSE_SUCCESS = "expense/deleteExpenseSuccess";
const DELETE_EXPENSE_FAILURE = "expense/deleteExpenseFailure";
const DELETE_ALL_EXPENSES = "expense/deleteAllExpenses";
const DELETE_ALL_EXPENSES_SUCCESS = "expense/deleteAllExpensesSuccess";
const DELETE_ALL_EXPENSES_FAILURE = "expense/deleteAllExpensesFailure";
const FETCH_BY_MONTH_YEAR = "expense/fetchByMonthYear";
const FETCH_BY_MONTH_YEAR_SUCCESS = "expense/fetchByMonthYearSuccess";
const FETCH_BY_MONTH_YEAR_FAILURE = "expense/fetchByMonthYearFailure";
const CLEAR_EXPENSES_BY_MONTH_YEAR = "expense/clearExpensesByMonthYear";
const CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS =
  "expense/clearExpensesByMonthYearSuccess";
const CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE =
  "expense/clearExpensesByMonthYearFailure";
const FETCH_TOTAL_EXPENSES_CURRENT_MONTH =
  "expense/fetchTotalExpensesCurrentMonth";
const FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS =
  "expense/fetchTotalExpensesCurrentMonthSuccess";
const FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE =
  "expense/fetchTotalExpensesCurrentMonthFailure";

export const fetchExpenses = () => ({ type: FETCH_EXPENSES });

export const fetchExpensesSuccess = (data) => ({
  type: FETCH_EXPENSES_SUCCESS,
  payload: data,
});

export const fetchExpensesFailure = (error) => ({
  type: FETCH_EXPENSES_FAILURE,
  payload: error,
});

export const fetchMonthlyExpenses = () => ({ type: FETCH_MONTHLY_EXPENSES });

export const fetchMonthlyExpensesSuccess = (data) => ({
  type: FETCH_MONTHLY_EXPENSES_SUCCESS,
  payload: data,
});

export const fetchMonthlyExpensesFailure = (error) => ({
  type: FETCH_MONTHLY_EXPENSES_FAILURE,
  payload: error,
});

export const addExpense = (data) => ({
  type: ADD_EXPENSE,
  payload: data,
});

export const addExpenseSuccess = () => ({ type: ADD_EXPENSE_SUCCESS });

export const addExpenseFailure = (error) => ({
  type: ADD_EXPENSE_FAILURE,
  payload: error,
});

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, payload: id });

export const deleteExpenseSuccess = () => ({ type: DELETE_EXPENSE_SUCCESS });

export const deleteExpenseFailure = (error) => ({
  type: DELETE_EXPENSE_FAILURE,
  payload: error,
});

export const deleteAllExpenses = () => ({ type: DELETE_ALL_EXPENSES });

export const deleteAllExpensesSuccess = () => ({
  type: DELETE_ALL_EXPENSES_SUCCESS,
});

export const deleteAllExpensesFailure = (error) => ({
  type: DELETE_ALL_EXPENSES_FAILURE,
  payload: error,
});

export const fetchByMonthYear = (params) => ({
  type: FETCH_BY_MONTH_YEAR,
  payload: params,
});

export const fetchByMonthYearSuccess = (data) => ({
  type: FETCH_BY_MONTH_YEAR_SUCCESS,
  payload: data,
});

export const fetchByMonthYearFailure = (error) => ({
  type: FETCH_BY_MONTH_YEAR_FAILURE,
  payload: error,
});

export const clearExpensesByMonthYear = () => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR,
});

export const clearExpensesByMonthYearSuccess = () => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS,
});

export const clearExpensesByMonthYearFailure = (error) => ({
  type: CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE,
  payload: error,
});

export const fetchTotalExpensesCurrentMonth = () => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH,
});

export const fetchTotalExpensesCurrentMonthSuccess = (data) => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS,
  payload: data,
});

export const fetchTotalExpensesCurrentMonthFailure = (error) => ({
  type: FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE,
  payload: error,
});

const initialState = {
  list: [],
  monthlyList: [],
  expensesByMonthYear: [],
  totalExpensesCurrentMonth: 0,
  loading: false,
  error: null,
};

const setLoading = (state) => ({ ...state, loading: true, error: null });
const setError = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

const actionHandlers = {
  // LOADING
  [FETCH_EXPENSES]: setLoading,
  [FETCH_MONTHLY_EXPENSES]: setLoading,
  [ADD_EXPENSE]: setLoading,
  [DELETE_EXPENSE]: setLoading,
  [DELETE_ALL_EXPENSES]: setLoading,
  [FETCH_BY_MONTH_YEAR]: setLoading,
  [CLEAR_EXPENSES_BY_MONTH_YEAR]: setLoading,
  [FETCH_TOTAL_EXPENSES_CURRENT_MONTH]: setLoading,

  // SUCCESS
  [FETCH_EXPENSES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    list: action.payload,
  }),
  [FETCH_MONTHLY_EXPENSES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    monthlyList: action.payload,
  }),
  [FETCH_BY_MONTH_YEAR_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    expensesByMonthYear: action.payload,
  }),
  [ADD_EXPENSE_SUCCESS]: (state) => ({ ...state, loading: false }),
  [DELETE_EXPENSE_SUCCESS]: (state) => ({ ...state, loading: false }),
  [DELETE_ALL_EXPENSES_SUCCESS]: (state) => ({ ...state, loading: false }),
  [CLEAR_EXPENSES_BY_MONTH_YEAR_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    expensesByMonthYear: [],
  }),
  [FETCH_TOTAL_EXPENSES_CURRENT_MONTH_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    totalExpensesCurrentMonth: action.payload,
  }),

  // FAILURE
  [FETCH_EXPENSES_FAILURE]: setError,
  [FETCH_MONTHLY_EXPENSES_FAILURE]: setError,
  [ADD_EXPENSE_FAILURE]: setError,
  [DELETE_EXPENSE_FAILURE]: setError,
  [DELETE_ALL_EXPENSES_FAILURE]: setError,
  [FETCH_BY_MONTH_YEAR_FAILURE]: setError,
  [CLEAR_EXPENSES_BY_MONTH_YEAR_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [FETCH_TOTAL_EXPENSES_CURRENT_MONTH_FAILURE]: setError,
};

export default function expenseReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const getExpenses = (state) => state.expenses.list;
export const getExpensesLoading = (state) => state.expenses.loading;
export const getExpensesError = (state) => state.expenses.error;
export const getMonthlyExpenses = (state) => state.expenses.monthlyList;
export const getExpensesByMonthYear = (state) =>
  state.expenses.expensesByMonthYear;
export const getTotalExpensesCurrentMonth = (state) =>
  state.expenses.totalExpensesCurrentMonth;
