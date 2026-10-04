export const ADD_EXPENSE_TAG = "expenseTag/addExpenseTag" as const;
export const ADD_EXPENSE_TAG_SUCCESS = "expenseTag/addExpenseTagSuccess" as const;
export const ADD_EXPENSE_TAG_FAILURE = "expenseTag/addExpenseTagFailure" as const;

export interface AddExpenseTagPayload {
  expenseId: number;
  tagId: number;
}

export const addExpenseTag = (payload: AddExpenseTagPayload) => ({
  type: ADD_EXPENSE_TAG,
  payload,
});
export const addExpenseTagSuccess = () => ({ type: ADD_EXPENSE_TAG_SUCCESS });
export const addExpenseTagFailure = (error: string) => ({
  type: ADD_EXPENSE_TAG_FAILURE,
  payload: error,
});

export interface ExpenseTagState {
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseTagState = {
  loading: false,
  error: null,
};

type Action =
  | ReturnType<typeof addExpenseTag>
  | ReturnType<typeof addExpenseTagSuccess>
  | ReturnType<typeof addExpenseTagFailure>;

export default function expenseTagReducer(
  state: ExpenseTagState = initialState,
  action: Action
): ExpenseTagState {
  switch (action.type) {
    case ADD_EXPENSE_TAG:
      return { ...state, loading: true, error: null };
    case ADD_EXPENSE_TAG_SUCCESS:
      return { ...state, loading: false };
    case ADD_EXPENSE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
