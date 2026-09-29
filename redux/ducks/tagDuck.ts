import { TagItem } from "../../entities/tag";

export const FETCH_TAGS = "tag/fetchTags" as const;
export const FETCH_TAGS_SUCCESS = "tag/fetchTagsSuccess" as const;
export const FETCH_TAGS_FAILURE = "tag/fetchTagsFailure" as const;
export const DELETE_TAG = "tag/deleteTag" as const;
export const DELETE_TAG_SUCCESS = "tag/deleteTagSuccess" as const;
export const DELETE_TAG_FAILURE = "tag/deleteTagFailure" as const;
export const ADD_TAG = "tag/addTag" as const;
export const ADD_TAG_SUCCESS = "tag/addTagSuccess" as const;
export const ADD_TAG_FAILURE = "tag/addTagFailure" as const;
export const UPDATE_TAG = "tag/updateTag" as const;
export const UPDATE_TAG_SUCCESS = "tag/updateTagSuccess" as const;
export const UPDATE_TAG_FAILURE = "tag/updateTagFailure" as const;

export const fetchTags = () => ({ type: FETCH_TAGS });
export const fetchTagsSuccess = (data: TagItem[]) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: data,
});
export const fetchTagsFailure = (error: string) => ({
  type: FETCH_TAGS_FAILURE,
  payload: error,
});

export const deleteTag = (id: number) => ({
  type: DELETE_TAG,
  payload: id,
});
export const deleteTagSuccess = () => ({ type: DELETE_TAG_SUCCESS });
export const deleteTagFailure = (error: string) => ({
  type: DELETE_TAG_FAILURE,
  payload: error,
});

export const addTag = (tag: TagItem) => ({
  type: ADD_TAG,
  payload: tag,
});
export const addTagSuccess = () => ({ type: ADD_TAG_SUCCESS });
export const addTagFailure = (error: string) => ({
  type: ADD_TAG_FAILURE,
  payload: error,
});

export const updateTag = (tag: TagItem) => ({
  type: UPDATE_TAG,
  payload: tag,
});
export const updateTagSuccess = () => ({ type: UPDATE_TAG_SUCCESS });
export const updateTagFailure = (error: string) => ({
  type: UPDATE_TAG_FAILURE,
  payload: error,
});

export interface TagState {
  list: TagItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  list: [],
  loading: false,
  error: null,
};

type Action =
  | ReturnType<typeof fetchTags>
  | ReturnType<typeof fetchTagsSuccess>
  | ReturnType<typeof fetchTagsFailure>
  | ReturnType<typeof deleteTag>
  | ReturnType<typeof deleteTagSuccess>
  | ReturnType<typeof deleteTagFailure>
  | ReturnType<typeof addTag>
  | ReturnType<typeof addTagSuccess>
  | ReturnType<typeof addTagFailure>
  | ReturnType<typeof updateTag>
  | ReturnType<typeof updateTagSuccess>
  | ReturnType<typeof updateTagFailure>;

export default function tagReducer(
  state: TagState = initialState,
  action: any
): TagState {
  switch (action.type) {
    case FETCH_TAGS:
    case DELETE_TAG:
    case ADD_TAG:
    case UPDATE_TAG:
      return { ...state, loading: true, error: null };

    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case DELETE_TAG_SUCCESS:
    case ADD_TAG_SUCCESS:
    case UPDATE_TAG_SUCCESS:
      return { ...state, loading: false };

    case FETCH_TAGS_FAILURE:
    case DELETE_TAG_FAILURE:
    case ADD_TAG_FAILURE:
    case UPDATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getTags = (state: any): TagItem[] => state?.tags?.list ?? [];
export const getTagsLoading = (state: any): boolean => state?.tags?.loading ?? false;
export const getTagsError = (state: any): string | null => state?.tags?.error ?? null;
