import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagItem } from "../../entities/tag";

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

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    fetchTags: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTagsSuccess: (state, action: PayloadAction<TagItem[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchTagsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTag: (state, _action: PayloadAction<TagItem>) => {
      state.loading = true;
      state.error = null;
    },
    addTagSuccess: (state) => {
      state.loading = false;
    },
    addTagFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTag: (state, _action: PayloadAction<TagItem>) => {
      state.loading = true;
      state.error = null;
    },
    updateTagSuccess: (state) => {
      state.loading = false;
    },
    updateTagFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTag: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteTagSuccess: (state) => {
      state.loading = false;
    },
    deleteTagFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTags,
  fetchTagsSuccess,
  fetchTagsFailure,
  addTag,
  addTagSuccess,
  addTagFailure,
  updateTag,
  updateTagSuccess,
  updateTagFailure,
  deleteTag,
  deleteTagSuccess,
  deleteTagFailure,
} = tagSlice.actions;

export default tagSlice.reducer;

// Selectors
export const getTags = (state: { tags: TagState }): TagItem[] => state?.tags?.list ?? [];
export const getTagsLoading = (state: { tags: TagState }): boolean => state?.tags?.loading ?? false;
export const getTagsError = (state: { tags: TagState }): string | null => state?.tags?.error ?? null;
