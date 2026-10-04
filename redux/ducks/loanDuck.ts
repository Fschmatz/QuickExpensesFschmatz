import { LoanItem } from "../../entities/loan";

export const FETCH_LOANS = "loan/fetchLoans" as const;
export const FETCH_LOANS_SUCCESS = "loan/fetchLoansSuccess" as const;
export const FETCH_LOANS_FAILURE = "loan/fetchLoansFailure" as const;
export const DELETE_LOAN = "loan/deleteLoan" as const;
export const DELETE_LOAN_SUCCESS = "loan/deleteLoanSuccess" as const;
export const DELETE_LOAN_FAILURE = "loan/deleteLoanFailure" as const;
export const ADD_LOAN = "loan/addLoan" as const;
export const ADD_LOAN_SUCCESS = "loan/addLoanSuccess" as const;
export const ADD_LOAN_FAILURE = "loan/addLoanFailure" as const;
export const UPDATE_LOAN = "loan/updateLoan" as const;
export const UPDATE_LOAN_SUCCESS = "loan/updateLoanSuccess" as const;
export const UPDATE_LOAN_FAILURE = "loan/updateLoanFailure" as const;

export const fetchLoans = () => ({ type: FETCH_LOANS });
export const fetchLoansSuccess = (data: LoanItem[]) => ({
  type: FETCH_LOANS_SUCCESS,
  payload: data,
});
export const fetchLoansFailure = (error: string) => ({
  type: FETCH_LOANS_FAILURE,
  payload: error,
});

export const deleteLoan = (id: number) => ({
  type: DELETE_LOAN,
  payload: id,
});
export const deleteLoanSuccess = () => ({ type: DELETE_LOAN_SUCCESS });
export const deleteLoanFailure = (error: string) => ({
  type: DELETE_LOAN_FAILURE,
  payload: error,
});

export const addLoan = (loan: LoanItem) => ({
  type: ADD_LOAN,
  payload: loan,
});
export const addLoanSuccess = () => ({ type: ADD_LOAN_SUCCESS });
export const addLoanFailure = (error: string) => ({
  type: ADD_LOAN_FAILURE,
  payload: error,
});

export const updateLoan = (loan: LoanItem) => ({
  type: UPDATE_LOAN,
  payload: loan,
});
export const updateLoanSuccess = () => ({ type: UPDATE_LOAN_SUCCESS });
export const updateLoanFailure = (error: string) => ({
  type: UPDATE_LOAN_FAILURE,
  payload: error,
});

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

type Action =
  | ReturnType<typeof fetchLoans>
  | ReturnType<typeof fetchLoansSuccess>
  | ReturnType<typeof fetchLoansFailure>
  | ReturnType<typeof deleteLoan>
  | ReturnType<typeof deleteLoanSuccess>
  | ReturnType<typeof deleteLoanFailure>
  | ReturnType<typeof addLoan>
  | ReturnType<typeof addLoanSuccess>
  | ReturnType<typeof addLoanFailure>
  | ReturnType<typeof updateLoan>
  | ReturnType<typeof updateLoanSuccess>
  | ReturnType<typeof updateLoanFailure>;

export default function loanReducer(
  state: LoanState = initialState,
  action: Action
): LoanState {
  switch (action.type) {
    case FETCH_LOANS:
    case DELETE_LOAN:
    case ADD_LOAN:
    case UPDATE_LOAN:
      return { ...state, loading: true, error: null };

    case FETCH_LOANS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case DELETE_LOAN_SUCCESS:
    case ADD_LOAN_SUCCESS:
    case UPDATE_LOAN_SUCCESS:
      return { ...state, loading: false };

    case FETCH_LOANS_FAILURE:
    case DELETE_LOAN_FAILURE:
    case ADD_LOAN_FAILURE:
    case UPDATE_LOAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getLoans = (state: { loans: LoanState }): LoanItem[] => state?.loans?.list ?? [];
export const getLoansLoading = (state: { loans: LoanState }): boolean => state?.loans?.loading ?? false;
export const getLoansError = (state: { loans: LoanState }): string | null => state?.loans?.error ?? null;
