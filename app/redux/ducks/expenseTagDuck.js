const ADD_EXPENSE_TAG = "expenseTag/addExpenseTag";
const ADD_EXPENSE_TAG_SUCCESS = "expenseTag/addExpenseTagSuccess";
const ADD_EXPENSE_TAG_FAILURE = "expenseTag/addExpenseTagFailure";

export const addExpenseTag = (tag) => ({ type: ADD_EXPENSE_TAG, payload: tag });
export const addExpenseTagSuccess = () => ({ type: ADD_EXPENSE_TAG_SUCCESS });
export const addExpenseTagFailure = (error) => ({
  type: ADD_EXPENSE_TAG_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  error: null,
};

const actionHandlers = {
  [ADD_EXPENSE_TAG]: (state) => ({ ...state, loading: true, error: null }),
  [ADD_EXPENSE_TAG_SUCCESS]: (state) => ({ ...state, loading: false }),
  [ADD_EXPENSE_TAG_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
};

export default function expenseTagReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
