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

const initialState = {
  list: [],
  monthlyList: [],
  expensesByMonthYear: [],
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

  // SUCESS
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

  // FAILURE
  [FETCH_EXPENSES_FAILURE]: setError,
  [FETCH_MONTHLY_EXPENSES_FAILURE]: setError,
  [ADD_EXPENSE_FAILURE]: setError,
  [DELETE_EXPENSE_FAILURE]: setError,
  [DELETE_ALL_EXPENSES_FAILURE]: setError,
  [FETCH_BY_MONTH_YEAR_FAILURE]: setError,
};

export default function expenseReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const getExpenses = (state) => state.expenses.list;
export const getMonthlyExpenses = (state) => state.expenses.monthlyList;
export const getExpensesByMonthYear = (state) =>
  state.expenses.expensesByMonthYear;
export const getExpensesLoading = (state) => state.expenses.loading;
export const getExpensesError = (state) => state.expenses.error;
