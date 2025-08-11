const FETCH_LOANS = "loan/fetchLoans";
const FETCH_LOANS_SUCCESS = "loan/fetchLoansSuccess";
const FETCH_LOANS_FAILURE = "loan/fetchLoansFailure";
const DELETE_LOAN = "loan/deleteLoan";
const DELETE_LOAN_SUCCESS = "loan/deleteLoanSuccess";
const DELETE_LOAN_FAILURE = "loan/deleteLoanFailure";
const ADD_LOAN = "loan/addLoan";
const ADD_LOAN_SUCCESS = "loan/addLoanSuccess";
const ADD_LOAN_FAILURE = "loan/addLoanFailure";
const UPDATE_LOAN = "loan/updateLoan";
const UPDATE_LOAN_SUCCESS = "loan/updateLoanSuccess";
const UPDATE_LOAN_FAILURE = "loan/updateLoanFailure";

export const fetchLoans = () => ({ type: FETCH_LOANS });
export const fetchLoansSuccess = (data) => ({
  type: FETCH_LOANS_SUCCESS,
  payload: data,
});
export const fetchLoansFailure = (error) => ({
  type: FETCH_LOANS_FAILURE,
  payload: error,
});

export const deleteLoan = (id) => ({ type: DELETE_LOAN, payload: id });
export const deleteLoanSuccess = () => ({ type: DELETE_LOAN_SUCCESS });
export const deleteLoanFailure = (error) => ({
  type: DELETE_LOAN_FAILURE,
  payload: error,
});

export const addLoan = (loan) => ({ type: ADD_LOAN, payload: loan });
export const addLoanSuccess = () => ({ type: ADD_LOAN_SUCCESS });
export const addLoanFailure = (error) => ({
  type: ADD_LOAN_FAILURE,
  payload: error,
});

export const updateLoan = (loan) => ({ type: UPDATE_LOAN, payload: loan });
export const updateLoanSuccess = () => ({ type: UPDATE_LOAN_SUCCESS });
export const updateLoanFailure = (error) => ({
  type: UPDATE_LOAN_FAILURE,
  payload: error,
});

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const actionHandlers = {
  // LOADING
  [FETCH_LOANS]: (state) => ({ ...state, loading: true, error: null }),
  [DELETE_LOAN]: (state) => ({ ...state, loading: true, error: null }),
  [ADD_LOAN]: (state) => ({ ...state, loading: true, error: null }),
  [UPDATE_LOAN]: (state) => ({ ...state, loading: true, error: null }),

  // SUCCESS
  [FETCH_LOANS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    list: action.payload,
  }),
  [DELETE_LOAN_SUCCESS]: (state) => ({ ...state, loading: false }),
  [ADD_LOAN_SUCCESS]: (state) => ({ ...state, loading: false }),
  [UPDATE_LOAN_SUCCESS]: (state) => ({ ...state, loading: false }),

  // FAILURE
  [FETCH_LOANS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [DELETE_LOAN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [ADD_LOAN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [UPDATE_LOAN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
};

export default function loanReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const getLoans = (state) => state.loans.list;
export const getLoansLoading = (state) => state.loans.loading;
export const getLoansError = (state) => state.loans.error;
