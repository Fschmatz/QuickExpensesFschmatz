const FETCH_TAGS = "tag/fetchTags";
const FETCH_TAGS_SUCCESS = "tag/fetchTagsSuccess";
const FETCH_TAGS_FAILURE = "tag/fetchTagsFailure";
const DELETE_TAG = "tag/deleteTag";
const DELETE_TAG_SUCCESS = "tag/deleteTagSuccess";
const DELETE_TAG_FAILURE = "tag/deleteTagFailure";
const ADD_TAG = "tag/addTag";
const ADD_TAG_SUCCESS = "tag/addTagSuccess";
const ADD_TAG_FAILURE = "tag/addTagFailure";

export const fetchTags = () => ({ type: FETCH_TAGS });
export const fetchTagsSuccess = (data) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: data,
});
export const fetchTagsFailure = (error) => ({
  type: FETCH_TAGS_FAILURE,
  payload: error,
});

export const deleteTag = (id) => ({ type: DELETE_TAG, payload: id });
export const deleteTagSuccess = () => ({ type: DELETE_TAG_SUCCESS });
export const deleteTagFailure = (error) => ({
  type: DELETE_TAG_FAILURE,
  payload: error,
});

export const addTag = (tag) => ({ type: ADD_TAG, payload: tag });
export const addTagSuccess = () => ({ type: ADD_TAG_SUCCESS });
export const addTagFailure = (error) => ({
  type: ADD_TAG_FAILURE,
  payload: error,
});

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const actionHandlers = {
  //LOADING
  [FETCH_TAGS]: (state) => ({ ...state, loading: true, error: null }),
  [DELETE_TAG]: (state) => ({ ...state, loading: true, error: null }),
  [ADD_TAG]: (state) => ({ ...state, loading: true, error: null }),

  //SUCESS
  [FETCH_TAGS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    list: action.payload,
  }),
  [DELETE_TAG_SUCCESS]: (state) => ({ ...state, loading: false }),
  [ADD_TAG_SUCCESS]: (state) => ({ ...state, loading: false }),

  //FAILURE
  [FETCH_TAGS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [DELETE_TAG_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [ADD_TAG_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
};

export default function tagReducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const getTags = (state) => state.tags.list;
export const getTagsLoading = (state) => state.tags.loading;
export const getTagsError = (state) => state.tags.error;
